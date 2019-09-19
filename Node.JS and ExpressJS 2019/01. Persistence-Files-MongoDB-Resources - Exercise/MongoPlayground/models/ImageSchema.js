const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: { type: mongoose.SchemaTypes.String, required: true },
    creationDate: { type: mongoose.SchemaTypes.Date, default: Date.now() },
    title: { type: mongoose.SchemaTypes.String },
    description: { type: mongoose.SchemaTypes.String },
    tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Tags" }]
});

const image = mongoose.model('Image', imageSchema);
module.exports = image;