const Course = require('../models/Course');
const errorHandler = require('../config/errorHandler');

module.exports = {
    courseCreateGet: (req, res) => {
        res.render('course/course-create');
    },

    courseCreatePost: (req, res) => {
        const { title, description, imageUrl, isPublic } = req.body;

        if (!title.length || !description.length || !imageUrl.length) {
            res.locals.globalError = 'Fields cannot be empty!';
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
            res.render('/');
        }).catch(err => errorHandler(req, res, err, 'course/course-create'));
    }
};