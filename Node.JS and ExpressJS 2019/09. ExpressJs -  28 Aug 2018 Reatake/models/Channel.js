const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true },
    description: { type: mongoose.SchemaTypes.String, required: true },
    type: { type: mongoose.SchemaTypes.String, required: true, enum: ["Game", "Motivation", "Lessons", "Radio", "Other"]},
    tags: [{ type: mongoose.SchemaTypes.String, default: [] }],
    followers: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User'}]
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;