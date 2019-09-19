const User = require('../models/User');
const encryption = require('../utilities/encryption');

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },

    registerPost: async(req, res) => {
        const { username, password, confirmedPassword, firstName, lastName, age, gender } = req.body;

        if (!username.length) {
            res.locals.globalError = 'Username cannot be empty!';
            res.render('user/register', req.body);
            return;
        }

        if (!password.length || !confirmedPassword.length) {
            res.locals.globalError = 'The passwords cannot be empty!';
            res.render('user/register', req.body);
            return;
        }

        if (password !== confirmedPassword) {
            res.locals.globalError = 'The passwords must be matches!';
            res.render('user/register', req.body);
            return;
        }

        if (!firstName.length || !lastName.length) {
            res.locals.globalError = 'First and last Name cannot be empty!';
            res.render('user/register', req.body);
            return;
        }

        if (Number(age) === NaN || Number(age) < 0) {
            res.locals.globalError = 'Invalid age!';
            res.render('user/register', req.body);
            return;
        }

        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, password);
        try {
            const user = await User.create({
                username,
                password: hashedPass,
                salt,
                firstName,
                lastName,
                age: Number(age),
                gender,
                roles: ['User'],
            });
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('users/register', user);
                } else {
                    res.flash('success', 'You registered succesfully!');
                    res.redirect('/');
                }
            });
        } catch (e) {
            console.log(e);
            res.locals.globalError = e.message;
            res.render('users/register');
        }
    },

    logout: (req, res) => {
        req.logout();
        res.flash('info', 'Logout succesfully!');
        res.redirect('/');
    },

    loginGet: (req, res) => {
        res.render('user/login');
    },

    loginPost: async(req, res) => {
        const userBody = req.body;

        if (!userBody.username.length || !userBody.password.length) {
            res.locals.globalError = 'Fields is empty!';
            res.render('user/login', userBody);
            return;
        }

        try {
            const user = await User.findOne({ username: userBody.username });
            if (!user) {
                res.locals.globalError = 'Invalid user!';
                res.render('user/login', userBody);
                return;
            }

            if (!user.authenticate(userBody.password)) {
                res.locals.globalError = 'Invalid password';
                res.render('user/login', userBody);
                return;
            }

            req.logIn(user, (err, user) => {
                if (err) console.log(err);
                else {
                    res.flash('info', 'Logged succesfully!');
                    res.redirect('/');
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
}