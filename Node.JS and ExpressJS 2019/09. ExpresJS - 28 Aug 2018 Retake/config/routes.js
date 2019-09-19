const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/register', restrictedPages.isAnonymous, controllers.user.registerGet);
    app.post('/register', restrictedPages.isAnonymous, controllers.user.registerPost);
    app.post('/logout', restrictedPages.isAuthed, controllers.user.logout);
    app.get('/login', restrictedPages.isAnonymous, controllers.user.loginGet);
    app.post('/login', restrictedPages.isAnonymous, controllers.user.loginPost);

    app.get('/channel/create', restrictedPages.hasRole('Admin'), controllers.channel.channelGet);
    app.post('/channel/create', restrictedPages.hasRole('Admin'), controllers.channel.channelPost);

    app.get('/channel/myChannels', restrictedPages.isAuthed, controllers.channel.myChannels);
    app.get('/channel/channel-details/:id', restrictedPages.isAuthed, controllers.channel.channelDetails);

    app.get('/channel/follow/:id', restrictedPages.isAuthed, controllers.channel.channelFollow);
    app.get('/channel/unfollow/:id', restrictedPages.isAuthed, controllers.channel.channelUnfollow);

    app.all('*', controllers.home.pageNotFound);
};