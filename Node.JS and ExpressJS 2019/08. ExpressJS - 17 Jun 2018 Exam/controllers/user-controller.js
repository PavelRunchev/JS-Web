const encryption = require('../util/encryption');
const User = require('mongoose').model('User');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: async(req, res) => {
        const reqUser = req.body;

        if (!reqUser.email.length || !reqUser.password.length ||
            !reqUser.repeatPassword.length) {
            res.locals.globalError = 'Fields cannot must be empty!';
            res.render('users/register', req.body);
            return;
        }

        if (reqUser.password !== reqUser.repeatPassword) {
            res.locals.globalError = 'Passwords is mathes!';
            res.render('users/register', req.body);
            return;
        }

        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, reqUser.password);
        try {
            const user = await User.create({
                email: reqUser.email,
                hashedPass,
                salt,
                roles: []
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

        if (!reqUser.email.length || !reqUser.password.length) {
            res.locals.globalError = 'Fields cannot must be empty!';
            res.render('users/login', req.body);
            return;
        }


        try {
            const user = await User.findOne({ email: reqUser.email });
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