const Course = require('../models/Course');
const errorHandler = require('../config/errorHandler');

module.exports = {
    index: (req, res) => {
        if (res.locals.isAdmin) {
            Course.find({}).then((courses) => {
                courses.map(c => c.countLectures = c.lectures.length);
                res.render('home/index', { courses });
            }).catch(err => errorHandler(req, res, err, 'home/index'));
        } else {
            res.render('home/index');
        }
    },

    pageNotFound: (req, res) => {
        //res.status(404);
        res.render('error/pageNotFound');
    }
};