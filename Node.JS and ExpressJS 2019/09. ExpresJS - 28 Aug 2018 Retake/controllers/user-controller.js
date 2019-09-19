const encryption = require('../util/encryption');
const User = require('mongoose').model('User');
const fs = require('fs');
const log4js = require('log4js');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: async(req, res) => {
        const reqUser = req.body;
        if (!reqUser.username.length || !reqUser.password.length || !reqUser.email.length) {
            res.locals.globalError = 'Fields cannot be empty!';
            res.render('users/register', req.body);
            return;
        }

        if (reqUser.password !== reqUser.confirmPassword) {
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
                email: reqUser.email,
                followedChannels: [],
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

async function errorHandler(req, res, e, partial) {
    let errors = [];
    for (let key in e.errors) {
        if (!e.errors[key].message.endsWith('required.')) {
            errors.push(e.errors[key].message);
            log4js.configure({
                appenders: { usersError: { type: 'file', filename: './logs/usersError.log' } },
                categories: { default: { appenders: ['usersError'], level: 'error' } }
            });

            const logger = log4js.getLogger('usersError');
            logger.error(`${e.errors[key].message}`);
        } else {
            log4js.configure({
                appenders: { serverError: { type: 'file', filename: './logs/serverError.log' } },
                categories: { default: { appenders: ['serverError'], level: 'error' } }
            });

            const logger = log4js.getLogger('serverError');
            logger.debug('Got cheese.');
            logger.info('Cheese is Comté.');
            logger.warn('Cheese is quite smelly.');
            logger.error(`${e.errors[key].message}`);
            logger.fatal(`${e.errors[key]}`);
        }
    }

    console.log(e);
    res.locals.globalError = errors;
    res.render(`${partial}`, req.body);
}