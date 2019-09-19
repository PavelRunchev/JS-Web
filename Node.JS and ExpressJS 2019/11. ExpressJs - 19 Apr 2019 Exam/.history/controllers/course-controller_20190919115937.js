const Course = require('../models/Course');
const Lecture = require('../models/Lecture');
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
        Course.findById(courseId).populate('lectures').then((course) => {
            course.lecturesCount = course.lectures.length;
            res.render('course/lecture-panel', course);
        }).catch(err => errorHandler(req, res, err, 'course/lecture-panel'));;
    },

    courseAddLecturePost: (req, res) => {
        const courseId = req.params.id;
        const { lectureTitle, videoUrl } = req.body;

        if (!lectureTitle.length || !videoUrl.length) {
            res.locals.globalError = 'Please fill all fields!';
            res.render('course/lecture-panel', req.body);
            return;
        }

        if (courseId === undefined) {
            res.redirect('/user/login');
            return;
        }

        const newLecture = { title: lectureTitle, videoUrl, course: courseId };
        Lecture.create(newLecture).then((lecture) => {
            Course.findById(courseId).then((course) => {
                course.lectures.push(lecture._id);
                return Promise.all([course.save()]);
            }).then(() => {
                res.redirect(`/course/course-addLecture/${courseId}`);
            }).catch(err => errorHandler(req, res, err, 'course/lecture-panel'));
        }).catch(err => errorHandler(req, res, err, 'course/lecture-panel'));
    },

    courseDeleteLecture: (req, res) => {
        const lectureId = req.params.id;
        Lecture.findByIdAndRemove({ _id: lectureId }).then((lecture) => {
            Course.findById(lecture.course).then((course) => {
                course.lectures.pull(lectureId);
                return course.save();
            }).then((course) => {
                console.log(course);
                res.redirect(`/course/course-addLecture/${course._id}`);
            });
        }).catch(err => errorHandler(req, res, err, 'course/lecture-panel'));
    }
};