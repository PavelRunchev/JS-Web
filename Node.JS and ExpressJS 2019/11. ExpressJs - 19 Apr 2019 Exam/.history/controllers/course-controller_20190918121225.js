const Course = require('../models/Course');

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

        if ((!imageUrl.startsWith('http')) ||
            (!imageUrl.endsWith('.jpg') || !imageUrl.endsWith('.png'))) {
            res.locals.globalError = 'ImageUrl must starting with "https:" with ending ".jpg" or ".png"!';
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

        console.log(newCourse);
    }
};