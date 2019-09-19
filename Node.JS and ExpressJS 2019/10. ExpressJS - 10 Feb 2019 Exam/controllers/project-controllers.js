const Project = require('../models/Project');
const Team = require('../models/Team');
const errorHandler = require('../config/errorHandler');

module.exports = {
    createGet: (req, res) => {
        res.render('project/createProject');
    },

    createPost: (req, res) => {
        const { name, description } = req.body;

        if (!name.length || !description.length) {
            res.locals.globalError = 'Fields cannot be empty!';
            res.render('project/createProject', req.body);
            return;
        }

        Project.findOne({ name: name }).then((project) => {
            if (!project) {
                Project.create({ name, description, team: null }).then(() => {
                    res.redirect('/');
                }).catch(err => {
                    errorHandler(req, res, err, '/');
                });
            } else {
                res.locals.globalError = 'The project is already created!';
                res.render('project/createProject', req.body);
                return;
            }
        }).catch(err => {
            errorHandler(req, res, err, 'project/createProject');
        });
    },

    projectsUser: (req, res) => {
        Project.find({}).populate('team').then((projects) => {
            res.render('project/projects-user', { projects });
        }).catch(err => {
            errorHandler(req, res, err, 'project/projects-user');
        });
    },

    projectsAdmin: async(req, res) => {
        try {
            const projects = await Project.find({});
            const teams = await Team.find({});
            res.render('project/projects-admin', { projects, teams });
        } catch (err) {
            errorHandler(req, res, err, 'project/projects-user');
        }
    },

    projectsAdminPost: async(req, res) => {
        const teamId = req.body.team;
        const projectId = req.body.project;

        try {
            const project = await Project.findById(projectId);
            const team = await Team.findById(teamId);
            project.team = teamId;
            team.projects.push(projectId);
            await project.save();
            await team.save();
            res.redirect('/');
        } catch (err) {
            errorHandler(req, res, err, 'user/login');
        }
    },

    searchProject: (req, res) => {
        const projectName = req.body.name;
        Project.find({}).then((projects) => {
            projects = projects.filter(p => p.name.includes(projectName));
            res.render('project/projects-user', { projects });
        }).catch(err => errorHandler(res, req, err, 'project/projects-user'));
    }
};