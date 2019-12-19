const controllers = require('../controllers');
const router = require('express').Router();
const auth = require('../config/auth');
const { body } = require('express-validator');
const Course = require('../models/Course');

router.get('/course-create', auth.isAdmin, controllers.course.courseCreateGet);
router.post('/course-create', [
    body('title')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Title is required!')
    .custom((value, { req }) => {
        return Course.findOne({ title: value }).then((course) => {
            if (course)
                return Promise.reject('Course already exists!');
        });
    }),

    body('description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Description is required!')
    .isLength({ max: 50 })
    .withMessage('Description should be max at 50 characters long!'),

    body('imageUrl')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Image URL is required!')
], auth.isAdmin, controllers.course.courseCreatePost);

router.get('/course-edit/:id', auth.isAdmin, controllers.course.courseEditGet);
router.post('/course-edit/:id', auth.isAdmin, controllers.course.courseEditPost);

router.get('/lecture-panel/:id', auth.isAdmin, controllers.course.lecturePanel);

router.get('/course-details/:id', auth.isAuthed, controllers.course.courseDetails);

router.post('/course-enroll/:id', auth.isAuthed, controllers.course.courseEnroll);

router.post('/course-search', auth.isAuthed, controllers.course.courseSearch);

module.exports = router;