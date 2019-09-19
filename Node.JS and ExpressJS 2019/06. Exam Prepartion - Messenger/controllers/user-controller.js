const encryption = require('../util/encryption');
const User = require('mongoose').model('User');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: async(req, res) => {
        const reqUser = req.body;

        if (reqUser.username.length < 2) {
            res.locals.globalError = 'Username must least 2 characters!';
            res.render('users/register', req.body);
            return;
        }

        if (reqUser.password <= 3) {
            res.locals.globalError = 'Password must least 3 characters!';
            res.render('users/register', req.body);
            return;
        }

        if (reqUser.password !== reqUser.confirmPassword) {
            res.locals.globalError = 'Passwords must matches!';
            res.render('users/register', req.body);
            return;
        }

        if (reqUser.firstName.length < 3 || reqUser.lastName.length < 3) {
            res.locals.globalError = 'First or Last name must least 3 characters!';
            res.render('users/register', req.body);
            return;
        }


        const salt = encryption.generateSalt();
        const hashedPass =
            encryption.generateHashedPassword(salt, reqUser.password);
        try {
            const user = await User.create({
                username: reqUser.username,
                hashedPass,
                salt,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                roles: ['user']
            });
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('users/register', user);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/register');
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('users/login');
    },
    loginPost: async(req, res) => {
        const reqUser = req.body;
        if (!reqUser.username.length || !reqUser.password.length) {
            res.locals.globalError = 'Fields cannot must empty!';
            res.render('users/login', req.body);
            return;
        }

        try {
            const user = await User.findOne({ username: reqUser.username });
            if (!user) {
                errorHandler('Invalid user data');
                return;
            }
            if (!user.authenticate(reqUser.password)) {
                errorHandler('Invalid user data');
                return;
            }
            req.logIn(user, (err, user) => {
                if (err) {
                    errorHandler(err);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            errorHandler(e);
        }

        function errorHandler(e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/login');
        }
    }
};