const mongoose = require('mongoose');

const editSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: mongoose.Schema.Types.String },
    content: { type: mongoose.Schema.Types.String, required: true },
    creationDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }
});

const Edit = new mongoose.model('Edit', editSchema);
module.exports = Edit;