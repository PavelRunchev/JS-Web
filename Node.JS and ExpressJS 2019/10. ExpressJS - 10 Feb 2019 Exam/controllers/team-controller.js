const Team = require('../models/Team');
const User = require('../models/User');
const { validationResult } = require('express-validator');

function validateTeam(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.locals.globalError = errors.errors[0]['msg'];
        const team = req.body;
        res.render('team/team-create', { team });
        return false;
    }

    return true;
}

module.exports = {
    teamCreateGet: (req, res) => {
        const team = req.body;
        res.render('team/team-create', team);
    },

    teamCreatePost: (req, res, next) => {
        const { teamName } = req.body;

        if(validateTeam(req, res)) {
            Team.create({ name: teamName, projects: [], members: [] }).then(() => {
                res.flash('success', 'Team created successfully!');
                res.status(201).redirect('/');
            }).catch(err => next(err));
        }
    },

    teamsAdminGet: (req, res, next) => {
        Promise.all([
            User.find({}),
            Team.find({})
        ]).then(([users, teams]) => {
            res.render('team/teams-admin', { users, teams });
        }).catch(err => next(err));
    },

    teamsAdminPost: (req, res, next) => {
        const { userId, teamId } = req.body;
        Promise.all([
            User.findById(userId),
            Team.findById(teamId)
        ]).then(([user, team]) => {
            if(team.members.includes(user._id)) {
                Promise.all([
                    User.find({}),
                    Team.find({})
                ]).then(([users, teams]) => {
                    res.locals.globalError = `The ${user.username} is already added to ${team.name}!`;
                    res.render('team/teams-admin', { users, teams });
                }).catch(err => next(err));
                return;
            } else {
                team.members.push(userId);
                user.teams.push(teamId);
                Promise.all([ team.save(), user.save() ])
                .then(([team, user]) => {
                    res.flash('success', `${user.username} added to ${team.name}`);
                    res.redirect('/');
                }).catch(err => next(err));
            }
        }).catch(err => next(err));
    },

    teamsGet: (req, res,  next) => {
        Team.find({})
            .populate('members', 'firstName lastName')
            .populate('projects', 'name')
            .then((teams) => {
                res.render('team/teams', { teams });
            }).catch(err => next(err));
    },

    teamsSearch: (req,  res, next) => {
        const { teamName } = req.body;
        Team.find({})
        .populate('members', 'firstName lastName')
        .populate('projects', 'name')
        .then((teams) => {
            teams = teams
            .filter(t => t.name.toLowerCase().includes(teamName.toLowerCase()));
            res.render('team/teams', { teams });
        }).catch(err => next(err));
    },
}