const controllers = require('../controllers');
const router = require('express').Router();
const auth = require('../config/auth');
const { body } = require('express-validator');
const User = require('../models/User');

    //
    // User Router
    //
    router.get('/register', controllers.user.registerGet);

    router.post('/register', [
        body('username')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Username is required!')
        .matches('^[A-Za-z0-9_]{3,}$').withMessage('Username is incorrect format!')
        .custom((value, { req }) => {
            return User.findOne({ username: value }).then((userDoc) => {
                if (userDoc)
                    return Promise.reject('Username already exists!');
            });
        }),
        body('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is required!'),

        body('email')
        .trim()
        .not()
        .isEmpty().withMessage('Email is required!')
        .matches('^[A-Za-z0-9._-]+@[a-z0-9.-]+.[a-z]{2,4}$').withMessage('Email is incorrect format!')
    ], controllers.user.registerPost);

    router.get('/login', controllers.user.loginGet);
    router.post('/login', controllers.user.loginPost);

    router.get('/logout', auth.isAuthed, controllers.user.logout);

    module.exports = router;