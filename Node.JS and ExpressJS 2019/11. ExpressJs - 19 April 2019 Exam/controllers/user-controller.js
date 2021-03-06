const bcrypt = require('bcryptjs');
const saltRounds = 10;

const User = require('mongoose').model('User');
const { validationResult } = require('express-validator');
const { createToken } = require('../util/jwt');
const { authCookieName } = require('../util/app-config');
const { encryptCookie } = require('../util/encryptCookie');

function validateUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.locals.globalError = errors.errors[0]['msg'];
        const user = req.body;
        res.render('user/register', { user });
        return false;
    }

    return true;
}

module.exports = {
    registerGet: (req, res) => {
        const user = req.body;
        res.status(200).render('user/register', { user });
    },

    registerPost: (req, res, next) => {
        try {
            const { username, password, repeatPassword } = req.body;

            if (validateUser(req, res)) {
                if(password !== repeatPassword) {
                    res.locals.globalError = "Passwords is matches!";
                    const user = req.body;
                    res.render('user/register', {user });
                    return;
                }

                // saving default profile image to registration
                bcrypt.genSalt(saltRounds)
                    .then((salt) => {
                        return Promise.all([salt, bcrypt.hash(password, salt)]);
                    }).then(([salt, hashedPass]) => {
                        // register user!
                        return Promise.resolve(User.create({
                            username, passwordHash: hashedPass, 
                            salt, enrolledCourse: [], roles: ['User']
                        }));
                    }).then((user) => {
                        // Saving user data to session and cookie
                        saveingToSessionAndCookie(req, res, user);
                        res.flash('success', 'You registered successfully!');
                        res.status(301).redirect('/');
                    }).catch(next);
            }
        } catch (next) { }
    },

    logout: (req, res) => {
            res.flash('info', 'Logout successfully!');
            // clear cookie and redirect to home page and watch message!
            res.clearCookie(authCookieName);
            res.clearCookie('_ro_le_');
            res.clearCookie('_u_i%d%_');
            req.cookies = null;

            // destroy session!
            if (req.session !== undefined) {
                sessionDestroy(req);
            }

            res.status(301).redirect('/');
    },

    loginGet: (req, res) => {
            res.status(200).render('user/login');
    },

    loginPost: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username: username });

            if (!user) {
                res.locals.globalError = 'Invalid user';
                res.status(400).render('user/login', req.body);
                return;
            }

            const match = await user.matchPassword(password);
            if (!match) {
                res.locals.globalError = 'Invalid password';
                res.status(400).render('user/login', req.body);
                return;
            }

            // Saving user data to session and cookie
            saveingToSessionAndCookie(req, res, user);

            res.flash('info', 'You logged successfully!');
            res.status(200);
            res.redirect('/');
        } catch (next) { }
    },
}

// executing to login and register
function saveingToSessionAndCookie(req, res, userObject) {
    // create new token
    const token = createToken({ id: userObject.id });
    //adding to cookie
    res.cookie(authCookieName, token);
    res.cookie('_u_i%d%_', encryptCookie(userObject.id));

    if (userObject.roles.includes('Admin')) {
        res.cookie('_ro_le_', encryptCookie('Admin'));
    }

    //added to Session cookie!
    req.session.auth_cookie = token;
    req.session.user = userObject;
    req.session.isAdmin = userObject.roles.includes('Admin');
    req.session.save();
}

// function for destroy session AFTER watch flash message "Logout successfuly"!!!
// flash is to the session!
function sessionDestroy(req) {
    setTimeout(function () {
        const sessionId = req.session.id;
        req.sessionStore.destroy(sessionId);
        req.session.destroy();
    }, 5000);
}