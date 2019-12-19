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
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then((userDoc) => {
                if (userDoc)
                    return Promise.reject('Username already exists!');
            });
        }),
        body('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is required!'),

        body('firstName')
        .trim()
        .not()
        .isEmpty().withMessage('First name is required!'),

        body('lastName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Last name is required!')
    ], controllers.user.registerPost);

    router.get('/login', controllers.user.loginGet);
    router.post('/login', controllers.user.loginPost);

    router.post('/logout', auth.isAuthed, controllers.user.logout);


    router.get('/myProfile', auth.isAuthed, controllers.user.myProfile);
    router.post('/myProfile/leave-team/:id', auth.isAuthed, controllers.user.leaveTeam);

    module.exports = router;