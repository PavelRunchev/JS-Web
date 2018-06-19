const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String},
    releaseDate: { type: Date, required: true },
    image: { type: String, required: true },
    description: {type: String, required: true }
});

mongoose.model('Book', bookSchema);

module.exports = mongoose.model('Book');