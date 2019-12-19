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
        .matches('^[A-Za-z0-9]{4,}$').withMessage('Username should be at least 4 characters long and should contains only english letters and digits')
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
        .withMessage('Password is required!')
        .isLength({ min: 8 })
        .withMessage('Password should be at leasat 8 characters long'),
    ], controllers.user.registerPost);

    router.get('/login', controllers.user.loginGet);
    router.post('/login', controllers.user.loginPost);

    router.get('/logout', auth.isAuthed, controllers.user.logout);

    router.post('/fill-amount', auth.isAuthed, controllers.user.fillAmount);

    router.get('/account-info', auth.isAuthed, controllers.user.accountInfo);

    module.exports = router;