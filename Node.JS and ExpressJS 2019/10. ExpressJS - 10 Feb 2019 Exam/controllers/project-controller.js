const Project = require('../models/Project');
const Team = require('../models/Team');
const { validationResult } = require('express-validator');

function validateProject(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.locals.globalError = errors.errors[0]['msg'];
        const project = req.body;
        res.render('project/project-create', project);
        return false;
    }

    return true;
}

module.exports = {
    projectCreateGet: (req, res) => {
        const project = req.body;
        res.render('project/project-create', project);
    },

    projectCreatePost: (req, res, next) => {
        const { projectName, description } = req.body;
        if(validateProject(req, res)) {
            Project.create({ name: projectName, description }).then(() => {
                res.flash('success', 'Project created successfully!');
                res.status(201).redirect('/');
            }).catch(err => next(err));
        }
    },

    projectsAdminGet: (req, res, next) => {
        Promise.all([
            Team.find({}),
            Project.find({ team: null})
        ]).then(([teams, projects]) => {
            res.render('project/projects-admin', { teams, projects });
        }).catch(err => next(err));
    },

    projectsAdminPost: (req, res, next) => {
        const { teamId, projectId } = req.body;
        Promise.all([
            Team.findById(teamId),
            Project.findById(projectId)
        ]).then(([team, project]) => {
            team.projects.push(projectId);
            project.team = teamId;
            return Promise.all([ team.save(), project.save() ]);
        }).then(([team, project]) => {
            res.flash('success', `${project.name} added to ${team.name}!`);
            res.status(204).redirect('/');
        }).catch(err => next(err));
    },

    projectsGet: (req, res, next) => {
        Project.find({}).populate('team', 'name').then((projects) => {
            res.render('project/projects', { projects });
        }).catch(err => next(err));
    },

    projectSearch: (req, res, next) => {
        const { projectName } = req.body;
        Project.find({}).populate('team', 'name').then((projects) => {
            projects = projects
            .filter(p => p.name.toLowerCase().includes(projectName.toLowerCase()));
            res.render('project/projects', { projects })
        }).catch(err => next(err));
    }
}