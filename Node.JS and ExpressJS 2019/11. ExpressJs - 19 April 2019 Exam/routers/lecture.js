const controllers = require('../controllers');
const router = require('express').Router();
const auth = require('../config/auth');
const { body } = require('express-validator');

router.post('/lecture-add-to-course/:id', [
    body('title')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Lecture title is required!'),

    body('videoUrl')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Video URL is required!')
], auth.isAdmin, controllers.lecture.lectureAddToCourse);

router.get('/lecture-delete/:id', auth.isAdmin, controllers.lecture.lectureDelete);

router.get('/lecture-play-video/:id', auth.isAuthed, controllers.lecture.lecturePlayVideo);

module.exports = router;