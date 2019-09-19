const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/user/register', restrictedPages.isAnonymous, controllers.user.registerGet);
    app.post('/user/register', restrictedPages.isAnonymous, controllers.user.registerPost);
    app.post('/user/logout', restrictedPages.isAuthed, controllers.user.logout);
    app.get('/user/login', restrictedPages.isAnonymous, controllers.user.loginGet);
    app.post('/user/login', restrictedPages.isAnonymous, controllers.user.loginPost);

    // Thread
    app.post('/threads/find', restrictedPages.isAuthed, controllers.thread.findThread);
    app.get('/thread/:username', restrictedPages.isAuthed, controllers.thread.openThread);
    app.post('/thread/:username', restrictedPages.isAuthed, controllers.thread.sendMessage);

    app.post('/block/:username', restrictedPages.isAuthed, controllers.thread.blockUser);
    app.post('/unblock/:username', restrictedPages.isAuthed, controllers.thread.unblockUser);

    app.post('/threads/remove/:id', restrictedPages.hasRole, controllers.thread.removeThread);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};