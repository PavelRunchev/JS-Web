const restrictdPages = require('../config/auth');
const controllers = require('../controllers/index');

module.exports = (app) => {
    app.get('/', controllers.homeController.home);

    //Users routes
    app.get('/user/register', restrictdPages.isAnonymous, controllers.userController.registerGet);
    app.post('/user/register', restrictdPages.isAnonymous, controllers.userController.registerPost);

    app.get('/user/login', restrictdPages.isAnonymous, controllers.userController.loginGet);
    app.post('/user/login', restrictdPages.isAnonymous, controllers.userController.loginPost);
    app.get('/user/details', restrictdPages.isAuthed, controllers.userController.userDetails);
    app.get('/user/logout', restrictdPages.isAuthed, controllers.userController.logout);

    //Article routes
    app.get('/article/create', restrictdPages.isAuthed, controllers.articleController.createGet);
    app.post('/article/create', restrictdPages.isAuthed, controllers.articleController.createPost);

    app.get('/article/details/:id', controllers.articleController.details);

    app.get('/article/edit/:id', restrictdPages.isAuthed, controllers.articleController.editGet);
    app.post('/article/edit/:id', restrictdPages.isAuthed, controllers.articleController.editPost);

    app.get('/article/delete/:id', restrictdPages.isAuthed, controllers.articleController.deleteGet);
    app.post('/article/delete/:id', restrictdPages.isAuthed, controllers.articleController.deletePost);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found!');
        res.end();
    });
};

