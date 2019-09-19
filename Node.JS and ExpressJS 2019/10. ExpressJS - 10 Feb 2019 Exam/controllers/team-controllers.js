const Team = require('../models/Team');
const Project = require('../models/Project');
const User = require('../models/User');
const errorHandler = require('../config/errorHandler');

module.exports = {
    createGet: (req, res) => {
        res.render('team/createTeam');
    },

    createPost: (req, res) => {
        const teamName = req.body.name;

        if (!teamName.length) {
            res.locals.globalError = 'Field cannot be empty!';
            res.render('team/createTeam', req.body);
            return;
        }

        Team.findOne({ name: teamName }).then((team) => {
            if (!team) {
                Team.create({ name: teamName }).then(() => {
                    res.redirect('/');
                }).catch(err => {
                    errorHandler(req, res, err, 'team/createTeam');
                });
            } else {
                res.locals.globalError = 'The team is already created!';
                res.render('team/createTeam', req.body);
                return;
            }
        }).catch(err => {
            errorHandler(req, res, err, 'team/createTeam');
        });
    },

    teamsUser: async(req, res) => {
        try {
            const teams = await Team.find({}).populate('projects members');
            res.render('team/teams-user', { teams });
        } catch (err) {
            errorHandler(req, res, err, 'team/teams-user');
        }
    },

    teamsAdmin: async(req, res) => {
        try {
            const users = await User.find({});
            const teams = await Team.find({});
            res.render('team/teams-admin', { users, teams });
        } catch (err) {
            errorHandler(req, res, err, 'team/teams-admin');
        }
    },

    teamsAdminPost: async(req, res) => {
        const memebrId = req.body.member;
        const teamId = req.body.team;

        try {
            const user = await User.findById(memebrId);
            const userId = user.teams.find(t => t.toString() === teamId.toString());
            if (userId) {
                res.locals.globalError = 'You are already a memebr of this team!';
                res.render('team/teams-admin', req.body);
                return;
            }

            user.teams.push(teamId);
            user.save();
            const team = await Team.findById(teamId);
            team.members.push(memebrId);
            await team.save();
            res.redirect('/');
        } catch (err) {
            errorHandler(req, res, err, 'team/teams-admin');
        }
    },

    teamSearch: (req, res) => {
        const teamName = req.body.team;
        Team.find({}).then((teams) => {
            teams = teams.filter(t => t.name.includes(teamName));
            res.render('team/teams-user', { teams });
        }).catch(err =>
            errorHandler(req, res, err, 'team/teams-user')
        );
    }
};