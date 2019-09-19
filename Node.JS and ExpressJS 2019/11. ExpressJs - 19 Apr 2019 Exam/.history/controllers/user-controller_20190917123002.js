const encryption = require('../util/encryption');
const User = require('mongoose').model('User');
const errorHandler = require('../config/errorHandler');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: async(req, res) => {
        const reqUser = req.body;
        if (!reqUser.username.length || !reqUser.password.length) {
            res.locals.globalError = 'Fields cannot be empty!';
            res.render('users/register', req.body);
            return;
        }

        if (reqUser.password !== reqUser.repeatPassword) {
            res.locals.globalError = 'Passwords is mathes!';
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
                roles: ['User']
            });
            req.logIn(user, (err, user) => {
                if (err) {
                    errorHandler(req, res, err, 'users/register');
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            errorHandler(req, res, e, 'users/register');
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
        try {
            const user = await User.findOne({ username: reqUser.username });
            if (!user) {
                res.locals.globalError = 'Invalid user';
                res.render('users/login', reqUser);
                return;
            }
            if (!user.authenticate(reqUser.password)) {
                res.locals.globalError = 'Invalid user password';
                res.render('users/login', reqUser);
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
            errorHandler(req, res, e, 'users/login');
        }
    }
};