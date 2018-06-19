const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const tagSchema = new mongoose.Schema({
    name: { type: String, required: true },
    //mongoose.Schema.Types.Date
    createDate: {type: Date, required: true, default: Date.now },
    images: [{ type: ObjectId}]
});

module.exports = mongoose.model('Tag', tagSchema);