const Lecture = require('../models/Lecture');
const Course = require('../models/Course');
const errorHandler = require('../config/errorHandler');

module.exports = {
    lectureVideo: async(req, res) => {
        try {
            const lectureId = req.params.id;
            const lecture = await Lecture.findById(lectureId);
            const course = await Course.findById(lecture.course).populate('lectures');
            console.log(course);
            res.render('course/play-video', { lecture, course });
        } catch (err) { errorHandler(req, res, err, '/'); };
    }
};