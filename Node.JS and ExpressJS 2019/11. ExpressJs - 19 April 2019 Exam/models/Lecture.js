const mongoose = require('mongoose');

const lectureSchema = new  mongoose.Schema({
    title: { type: mongoose.SchemaTypes.String, required: true },
    videoUrl: { type: mongoose.SchemaTypes.String, required: true },
    course: { type: mongoose.SchemaTypes.ObjectId, ref: 'Course' }
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;