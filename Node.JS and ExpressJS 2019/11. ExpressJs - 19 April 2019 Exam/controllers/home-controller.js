const { errorHandler } = require('../config/errorHandler');
const Course = require('../models/Course');

module.exports = {
    index: (req, res, next) => {
        if(res.locals.currentUser) {
            if(res.locals.isAdmin) {
                Course.find({}).select('title lectures').then((courses) => {
                    courses.map(c => {
                        c.lecturesInCouse = c.lectures.length;
                    });
                    res.status(200).render('home/index', { courses });
                }).catch(err => next(err));
            } else {
                Course.find({ isPublic: true }).then((courses) => {
                    res.status(200).render('home/index', { courses });
                }).catch(err => next(err));
            }
        } else {
            res.status(200).render('home/index');
        }
    }, 

    pageNotFound: (req, res) => {
        res.status(200).render('error/pageNotFound');
    }
}