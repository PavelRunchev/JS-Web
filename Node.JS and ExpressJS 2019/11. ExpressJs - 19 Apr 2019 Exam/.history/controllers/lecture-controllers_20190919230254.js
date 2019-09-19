const Lecture = require('../models/Lecture');
const Course = require('../models/Course');
const errorHandler = require('../config/errorHandler');

module.exports = {
    lectureVideo: async(req, res) => {
        try {
            const lectureId = req.params.id;
            const lecture = await Lecture.findById(lectureId);
            const course = await Course.findById(lecture.course).populate('lectures');

            // check course is public or redirect!
            if (course.isPublic === false) {
                return res.redirect('/user/login');
            }

            // check user is enrolled to play or redirect!
            course.isEnrolled = course
                .usersEnrolled.some(id => id.toString() === req.user.id.toString()) ?
                true : false;
            if (course.isEnrolled === false) {
                res.redirect(`course/course-details/${course._id}`);
            }

            console.log(course);
            res.render('course/play-video', { lecture, course });
        } catch (err) { errorHandler(req, res, err, '/'); };
    }
};