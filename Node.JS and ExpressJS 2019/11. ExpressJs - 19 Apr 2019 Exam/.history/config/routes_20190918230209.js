const controllers = require('../controllers');
const auth = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/user/register', controllers.user.registerGet);
    app.post('/user/register', controllers.user.registerPost);
    app.post('/user/logout', controllers.user.logout);
    app.get('/user/login', controllers.user.loginGet);
    app.post('/user/login', controllers.user.loginPost);

    // Admin
    app.get('/course/course-create', controllers.course.courseCreateGet);
    app.post('/course/course-create', controllers.course.courseCreatePost);

    // user
    app.get('/course/course-details/:id', controllers.course.courseDetails);



    app.all('*', controllers.home.pageNotFound);
};