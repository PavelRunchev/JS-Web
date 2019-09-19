const Course = require('../models/Course');

module.exports = {
    courseCreateGet: (req, res) => {
        res.render('course/course-create');
    },

    courseCreatePost: (req, res) => {
        const courseBody = req.body;
        console.log(courseBody);
    }
};