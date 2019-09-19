const Course = require('../models/Course');
const errorHandler = require('../config/errorHandler');

module.exports = {
    courseCreateGet: (req, res) => {
        res.render('course/course-create');
    },

    courseCreatePost: (req, res) => {
        const { title, description, imageUrl, isPublic } = req.body;

        if (!title.length || !description.length || !imageUrl.length) {
            res.locals.globalError = 'Fields cannot be empty!';
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

    courseDetails: (req, res) => {
        const courseId = req.params.id;
        const userId = req.user.id;
        console.log(userId);
        Course.findById(courseId).then((course) => {
            if (course.usersEnrolled.includes(userId)) {
                course.isEnrolled = true;
            } else {
                course.isEnrolled = false;
            }

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
    }
};