const controllers = require('../controllers');
const auth = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/user/register', auth.isAnonymous, controllers.user.registerGet);
    app.post('/user/register', auth.isAnonymous, controllers.user.registerPost);
    app.post('/user/logout', auth.isAuthed, controllers.user.logout);
    app.get('/user/login', auth.isAnonymous, controllers.user.loginGet);
    app.post('/user/login', auth.isAnonymous, controllers.user.loginPost);

    app.get('/user/profile', auth.isAuthed, controllers.user.profile);
    app.get('/project/projects-user', auth.isAuthed, controllers.project.projectsUser);
    app.post('/project/searchProject', auth.isAuthed, controllers.project.searchProject);
    app.get('/team/teams-user', auth.isAuthed, controllers.team.teamsUser);
    app.post('/team/searchTeam', auth.isAuthed, controllers.team.teamSearch);
    app.post('/team/leaveTeam/:id', auth.isAuthed, controllers.user.leaveTeam);

    // admin
    app.get('/project/create', auth.hasRole('Admin'), controllers.project.createGet);
    app.post('/project/create', auth.hasRole('Admin'), controllers.project.createPost);
    app.get('/team/create', auth.hasRole('Admin'), controllers.team.createGet);
    app.post('/team/create', auth.hasRole('Admin'), controllers.team.createPost);
    app.get('/project/projects-admin', auth.hasRole('Admin'), controllers.project.projectsAdmin);
    app.post('/project/projects-admin', auth.hasRole('Admin'), controllers.project.projectsAdminPost);
    app.get('/team/teams-admin', auth.hasRole('Admin'), controllers.team.teamsAdmin);
    app.post('/team/teams-admin', auth.hasRole('Admin'), controllers.team.teamsAdminPost);

    app.all('*', controllers.home.pageNotFound);
};