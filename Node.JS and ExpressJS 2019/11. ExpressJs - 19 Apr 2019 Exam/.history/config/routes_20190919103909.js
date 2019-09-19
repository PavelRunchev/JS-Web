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

    app.get('/course/course-edit/:id', controllers.course.courseEditGet);
    app.post('/course/course-edit/:id', controllers.course.courseEditPost);

    app.get('/course/course-addLecture/:id', controllers.course.courseAddLecture);

    // user
    app.get('/course/course-details/:id', controllers.course.courseDetails);
    app.post('/course/course-enroll/:id', controllers.course.courseEnroll);



    app.all('*', controllers.home.pageNotFound);
};