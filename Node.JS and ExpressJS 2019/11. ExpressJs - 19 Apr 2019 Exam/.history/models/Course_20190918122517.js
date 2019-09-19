const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
    title: { type: mongoose.SchemaTypes.String, required: true, unique: true },
    description: { type: mongoose.SchemaTypes.String, required: true },
    imageUrl: { type: mongoose.SchemaTypes.String, required: true },
    isPublic: { type: mongoose.SchemaTypes.Boolean, default: false },
    lectures: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Lecture' }],
    usersEnrolled: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
});

courseSchema.path('description').validate(function() {
    return this.description.length <= 50;
}, 'Description cannot be more than 50 symbols!');

courseSchema.path('imageUrl').validate(function() {
    return this.imageUrl.startsWith('http') &&
        (this.imageUrl.endsWith('.jpg') || this.imageUrl.endsWith('.png'))
}, 'Image Url must starting with "http" and ending with ".jpg" or ".png"!');

// if ((!imageUrl.startsWith('http')) ||
// (!imageUrl.endsWith('.jpg') || !imageUrl.endsWith('.png'))) 



const Course = mongoose.model('Course', courseSchema);
module.exports = Course;