const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: { type: mongoose.Schema.Types.String, required: true },
    content: { type: mongoose.Schema.Types.String, required: true },
    isLocked: { type: mongoose.Schema.Types.Boolean, default: false },
    creationDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    edits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Edit' }]
});

const Article = new mongoose.model('Article', articleSchema);
module.exports = Article;