const Course = require('../models/Course');
const errorHandler = require('../config/errorHandler');

module.exports = {
    courseCreateGet: (req, res) => {
        res.render('course/course-create');
    },

    courseCreatePost: (req, res) => {
        const { title, description, imageUrl, isPublic } = req.body;

        if (!title.length || !description.length || !imageUrl.length) {
            res.locals.globalError = 'Please fill all fields!';
            res.render('course/course-create', req.body);
            return;
        }

        const newCourse = {
            title,
            description,
            imageUrl,
            isPublic: isPublic === 'on' ? true : false,
            lectures: [],
            usersEnrolled: []
        };

        Course.create(newCourse).then(() => {
            res.redirect('/');
        }).catch(err => errorHandler(req, res, err, 'course/course-create'));
    },


    courseEditGet: (req, res) => {
        const courseId = req.params.id;
        Course.findById(courseId).then((course) => {
            res.render('course/course-edit', course);
        }).catch(err => errorHandler(req, res, err, `course/course-edit/${courseId}`));
    },

    courseEditPost: (req, res) => {
        const courseId = req.params.id;
        const { title, description, imageUrl, isPublic } = req.body;

        Course.findById(courseId).then((course) => {
            course.title = title || course.title;
            course.description = description || course.description;
            course.imageUrl = imageUrl || course.imageUrl;
            course.isPublic = isPublic === 'on' ? true : false || course.isPublic;
            return course.save();
        }).then(() => {
            res.redirect('/');
        }).catch(err => errorHandler(req, res, err, `course/course-edit/${courseId}`));
    },

    courseDetails: (req, res) => {
        const courseId = req.params.id;
        const userId = req.user.id;

        Course.findById(courseId).then((course) => {
            // check user is enrolled!
            course.isEnrolled = course
                .usersEnrolled.some(id => id.toString() === userId.toString()) ?
                true : false;

            res.render('course/course-details', course);
        }).catch(err => errorHandler(req, res, err, `course/course-details/${courseId}`));
    },

    courseEnroll: (req, res) => {
        const courseId = req.params.id;
        const userId = req.user.id;
        Course.findById(courseId).then((course) => {
            course.usersEnrolled.push(userId);
            req.user.enrolledCourses.push(courseId);
            return Promise.all([course.save(), req.user.save()]);
        }).then(() => {
            res.redirect(`/course/course-details/${courseId}`);
        }).catch(err => errorHandler(req, res, err, '/'));
    },


    courseAddLecture: (req, res) => {
        const courseId = req.params.id;
        Course.findById(courseId).then((course) => {
            res.render('course/lecture-panel', course);
        }).catch(err => errorHandler(req, res, err, 'course/lecture-panel'));;
    }
};