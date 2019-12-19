const { validationResult } = require('express-validator');
const Course = require('../models/Course');
const Lecture = require('../models/Lecture');
const User = require('../models/User');

function validateCourse(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.locals.globalError = errors.errors[0]['msg'];
        const course = req.body;
        res.render('course/course-create', { course });
        return false;
    }

    return true;
}

module.exports = {
    courseCreateGet: (req, res, next) => {
        const course = req.body;
        res.render('course/course-create', { course });
    },

    courseCreatePost: (req, res, next) => {
        let { title, description, imageUrl, isPublic } = req.body;
        
        if(validateCourse(req, res)) {
            if(isPublic === "on") { isPublic = true }

            Course.create({ title, description, 
                imageUrl, isPublic, lectures: [], 
                usersEnrolled: []
            }).then((course) => {
                res.flash('success', 'Course created successfully!');
                res.status(201).redirect('/');
            }).catch(err => next(err));
        }
    },

    courseEditGet: (req, res, next) => {
        const courseId = req.params.id;
        Course.findById(courseId).then((course) => {
            res.render('course/course-edit', { course });
        }).catch(err => next(err));
    },

    courseEditPost: (req, res, next) => {
        const courseId = req.params.id;
        let { title, description, imageUrl, isPublic } = req.body;
        Course.findById(courseId).then((course) => {
            course.title = title || course.title;
            course.description = description || course.description;
            course.imageUrl = imageUrl || course.imageUrl;
            course.isPublic = isPublic === 'on' ? true : false;
            return Promise.resolve(course.save());
        }).then(() => {
            res.flash('warning', 'Course edited successfully!');
            res.status(204).redirect('/');
        }).catch(err => next(err));
    },

    lecturePanel: (req, res, next) => {
        const courseId = req.params.id;
        Course
            .findById(courseId)
            .select('lectures')
            .populate('lectures')
            .then((course) => {
                course.lectureCount = course.lectures.length;
                res.render('course/lecture-panel', { course });
            }).catch(err => next(err));
    },

    courseDetails: (req, res, next) => {
        const courseId = req.params.id;
        const userId = res.locals.currentUser._id;
        Course.findById(courseId)
            .populate('lectures')
            .then((course) => {

            let enrollToCourse = false;
            if(course.usersEnrolled.includes(userId)) {
                enrollToCourse = true;
            }

            res.render('course/course-details', { course, enrollToCourse });
        }).catch(err => next(err));
    },

    courseEnroll: (req, res, next) => {
        const courseId = req.params.id;
        const userId = res.locals.currentUser._id;
        Promise.all([
            User.findById(userId),
            Course.findById(courseId)
        ]).then(([user, course]) => {
            course.usersEnrolled.push(userId);
            user.enrolledCourse.push(courseId);
            return Promise.all([ user.save(), course.save()]);
        }).then(([user, course]) => {
            res.flash('info', `You enrolled to ${course.title} successfully!`);
            res.redirect(`/course/course-details/${course._id}`);
        }).catch(err => next(err));
    },

    courseSearch: (req, res, next) => {
        const { title } = req.body;
        Course.find({}).then((courses) => {
            courses = courses
            .filter(c => c.title.toLowerCase().includes(title.toLowerCase()));
            res.render('home/index', { courses });
        })
    }
}