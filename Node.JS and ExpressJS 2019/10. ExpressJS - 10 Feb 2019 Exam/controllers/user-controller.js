const bcrypt = require('bcryptjs');
const saltRounds = 10;

const User = require('mongoose').model('User');
const Team = require('../models/Team');
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
            const { username, password, firstName, lastName, profilePicture } = req.body;

            if (validateUser(req, res)) {
                // saving default profile image to registration
                bcrypt.genSalt(saltRounds)
                    .then((salt) => {
                        return Promise.all([salt, bcrypt.hash(password, salt)]);
                    }).then(([salt, hashPassword]) => {
                        // register user!
                        return Promise.resolve(User.create({
                            username, hashedPass: hashPassword, salt, firstName, 
                            lastName, teams: [], roles: ['User'],
                            profilePicture
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

    //todo
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
            res.status(301);
            res.redirect('/');
        } catch (next) { }
    },

    myProfile: (req, res, next) => {
        const userId = res.locals.currentUser._id;
        User.findById(userId)
        .select('teams profilePicture')
        .populate('teams', 'name projects')
        .populate({ path: 'teams', populate: { path: 'projects', select: 'name' }})
        .then((user) => {
            user.projects = [];
            user.teams.forEach(t => {
                //merge two arrays
                user.projects = user.projects.concat(t.projects);
            });

            res.render('user/profile', user);
        }).catch(err => next(err));
    },

    leaveTeam: (req, res, next) => {
        const teamId = req.params.id;
        const userId = res.locals.currentUser._id;
        Promise.all([
            User.findById(userId),
            Team.findById(teamId)
        ]).then(([user, team]) => {
            user.teams.pull(teamId);
            team.members.pull(userId);
            return Promise.all([user.save(), team.save()]);
        }).then(([user, team]) => {
            res.flash('warning', `${user.username} left successfully the Team!`);
            res.status(204);
            res.redirect('/user/myProfile');
        }).catch(err => next(err));
    }
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