const { validationResult } = require('express-validator');
const Course = require('../models/Course');
const Lecture = require('../models/Lecture');

function validateLecture(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.locals.globalError = errors.errors[0]['msg'];
        const courseId = req.params.id;
        Course
            .findById(courseId)
            .select('lectures')
            .populate('lectures')
            .then((course) => {
                const lecture = req.body;
                course.lectureCount = course.lectures.length;
                res.render('course/lecture-panel', { course, lecture });
            }).catch(err => next(err));
        return false;
    }

    return true;
}

module.exports = {
    lectureAddToCourse: (req, res, next) => {
        const courseId = req.params.id;
        const { title, videoUrl } = req.body;
        if(validateLecture(req, res)) {
            Promise.all([
                Course.findById(courseId),
                Lecture.create({ title, videoUrl, course: courseId })
            ]).then(([course, lecture]) => {
                course.lectures.push(lecture._id);
                return Promise.resolve(course.save());
            }).then((course) => {
                res.flash('success', 'Lecture added successfully!');
                res.status(201).redirect(`/course/lecture-panel/${course._id}`);
            }).catch(err => next(err));
        }
    },

    lectureDelete: (req, res, next) => {
        const lectureId = req.params.id;
        Lecture.findByIdAndRemove({ _id: lectureId})
            .then((lecture) => {
                return Promise.resolve(Course.findById(lecture.course));
            }).then((course) => {
                course.lectures.pull(lectureId);
                return Promise.resolve(course.save());
            }).then((course) => {
                res.redirect(`/course/lecture-panel/${course._id}`);
            }).catch(err => next(err));
    },

    lecturePlayVideo: (req, res, next) => {
        const lectureId = req.params.id;
        Lecture.findById(lectureId).then((lecture) => {
            return Promise.all([
                Course.findById(lecture.course)
                    .select('lectures')
                    .populate('lectures', 'title'),
                lecture
            ]);
            
        }).then(([course, lecture]) => {
            res.render('lecture/lecture-play-video', { lecture, course });
        }).catch(err => next(err));
    }
}