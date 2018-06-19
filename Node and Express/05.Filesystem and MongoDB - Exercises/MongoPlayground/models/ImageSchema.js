const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ImageSchema = new mongoose.Schema({
    url: {type: mongoose.SchemaTypes.String, required: true },
    title: {type: String, required: true },
    cretaDate: { type: mongoose.SchemaTypes.Date, required: true, default: Date.now },
    description: {type: String, required: true },
    tags: [{ type: ObjectId }]
});

module.exports = mongoose.model('Image', ImageSchema);