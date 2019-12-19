const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: mongoose.SchemaTypes.String, required: true, unique: true },
    description: { type: mongoose.SchemaTypes.String, required: true, maxlength: 50 },
    imageUrl: { type: mongoose.SchemaTypes.String, required: true },
    isPublic: { type: mongoose.SchemaTypes.Boolean, default: false },
    lectures: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Lecture' }],
    usersEnrolled: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;