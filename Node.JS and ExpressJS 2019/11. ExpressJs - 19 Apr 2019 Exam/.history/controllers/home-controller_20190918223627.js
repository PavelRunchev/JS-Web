const Course = require('../models/Course');
const errorHandler = require('../config/errorHandler');

module.exports = {
    index: (req, res) => {
        Course.find({}).then((courses) => {
            if (res.locals.isAdmin) {
                courses.map(c => c.countLectures = c.lectures.length);
            } else if (res.locals.isAuthed) {

            } else {
                courses = courses
                    .sort((a, b) => b.usersEnrolled.length - a.usersEnrolled.length)
                    .slice(0, 2);
            }
            res.render('home/index', { courses });
        }).catch(err => errorHandler(req, res, err, 'home/index'));
    },

    pageNotFound: (req, res) => {
        //res.status(404);
        res.render('error/pageNotFound');
    }
};