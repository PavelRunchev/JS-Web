const Lecture = require('../models/Lecture');
const Course = require('../models/Course');
const errorHandler = require('../config/errorHandler');

module.exports = {
    lectureVideo: (req, res) => {
        const lectureId = req.params.id;
        Lecture.findById(lectureId).then((lecture) => {
            res.render('course/play-video', { lecture });
        }).catch(err => errorHandler(req, res, err, '/'));
    }
};