const encryption = require('../util/encryption');
const User = require('mongoose').model('User');
const Team = require('../models/Team');
const errorHandler = require('../config/errorHandler');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: async(req, res) => {
        const reqUser = req.body;

        if (!reqUser.username.length || !reqUser.password.length ||
            !reqUser.firstName.length || !reqUser.lastName.length ||
            !reqUser.profilePicture.length) {
            res.locals.globalError = 'Fields cannot be empty!';
            res.render('users/register', req.body);
            return;
        }

        // if (reqUser.password !== reqUser.repeatPassword) {
        //     res.locals.globalError = 'Passwords is mathes!';
        //     res.render('users/register', req.body);
        //     return;
        // }

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
                teams: [],
                profilePicture: reqUser.profilePicture,
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
        } catch (err) {
            errorHandler(req, res, err, 'users/login');
        }
    },

    profile: async(req, res) => {
        try {
            if (res.locals.currentUser.id) {
                const teams = await Team.find({ members: { $all: [res.locals.currentUser.id] } })
                    .populate('projects');

                let myProjects = [];
                for (let t of teams) {
                    for (let p of t.projects) {
                        myProjects.push({ name: p.name });
                    }
                }
                res.render('users/profile', { teams, myProjects });
            }
        } catch (err) {
            errorHandler(req, res, err, 'users/login');
        }
    },

    // todo tested!!!!!
    leaveTeam: (req, res) => {
        const teamId = req.params.id;
        const userId = req.user.id;
        console.log(userId);
        Team.findById(teamId).then((team) => {
            team.members = team.members.filter(m => m.toString() !== userId.toString());
            req.user.teams = req.user.teams.filter(t => t.toString() !== teamId.toString());
            return Promise.all([req.user.save(), team.save()]);
        }).then(() => {
            res.redirect('/');
        }).catch(err => errorHandler(req, res, err, '/'));
    }
};