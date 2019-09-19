const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/register', restrictedPages.isAnonymous, controllers.user.registerGet);
    app.post('/register', restrictedPages.isAnonymous, controllers.user.registerPost);
    app.get('/login', restrictedPages.isAnonymous, controllers.user.loginGet);
    app.post('/login', restrictedPages.isAnonymous, controllers.user.loginPost);
    app.post('/logout', restrictedPages.isAuthed, controllers.user.logout);

    // Article
    app.get('/article/all', controllers.article.all);
    app.get('/article/create', restrictedPages.isAuthed, controllers.article.createGet);
    app.post('/article/create', restrictedPages.isAuthed, controllers.article.createPost);
    app.get('/article/details/:id', controllers.article.displayArticle);

    app.get('/article/edit/:id', restrictedPages.isAuthed, controllers.article.editGet);
    app.post('/article/edit/:id', restrictedPages.isAuthed, controllers.article.editPost);

    app.get('/article/latestArticle', restrictedPages.isAuthed, controllers.article.latestArticle);
    app.post('/article/search', controllers.article.searchArticles);
    // Admin Function
    app.get('/article/lock/:id', restrictedPages.hasRole('Admin'), controllers.article.lockArticle);
    app.get('/article/unlock/:id', restrictedPages.hasRole('Admin'), controllers.article.unlockArticle);

    app.get('/article/delete/:id', restrictedPages.hasRole('Admin'), controllers.article.deleteArticle);

    // Edit 
    app.get('/edit/history/:id', restrictedPages.isAuthed, controllers.edit.history);
    app.get('/edit/editDetails/:id', restrictedPages.isAuthed, controllers.edit.editDetails);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};