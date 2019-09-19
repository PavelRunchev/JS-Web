const controllers = require('../controllers');
const auth = require('./auth');

module.exports = app => {
    // Guest, User, Admin
    app.get('/', controllers.home.index);

    // Guest
    app.get('/user/register', auth.isAnonymous, controllers.user.registerGet);
    app.post('/user/register', auth.isAnonymous, controllers.user.registerPost);
    app.get('/user/login', auth.isAnonymous, controllers.user.loginGet);
    app.post('/user/login', auth.isAnonymous, controllers.user.loginPost);

    // Admin
    app.get('/course/course-create', auth.hasRole('Admin'), controllers.course.courseCreateGet);
    app.post('/course/course-create', auth.hasRole('Admin'), controllers.course.courseCreatePost);

    app.get('/course/course-edit/:id', auth.hasRole('Admin'), controllers.course.courseEditGet);
    app.post('/course/course-edit/:id', auth.hasRole('Admin'), controllers.course.courseEditPost);

    app.get('/course/course-addLecture/:id', auth.hasRole('Admin'), controllers.course.courseAddLecture);
    app.post('/course/course-addLecture/:id', auth.hasRole('Admin'), controllers.course.courseAddLecturePost);

    app.get('/lecture/lecture-delete/:id', auth.hasRole('Admin'), controllers.course.courseDeleteLecture);

    // User
    app.get('/course/course-details/:id', auth.isAuthed, controllers.course.courseDetails);
    app.post('/course/course-enroll/:id', auth.isAuthed, controllers.course.courseEnroll);
    app.get('/lecture/lecture-video/:id', auth.isAuthed, controllers.lecture.lectureVideo);
    app.post('/user/logout', auth.isAuthed, controllers.user.logout);

    app.all('*', controllers.home.pageNotFound);
};