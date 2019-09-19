//import mongoose from 'mongoose';
const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true },
    description: { type: mongoose.SchemaTypes.String, required: true },
    type: { type: mongoose.SchemaTypes.String, required: true, },
    tags: [{ type: mongoose.SchemaTypes.String }],
    followers: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }]
});

channelSchema.path('type').validate(function() {
    return this.type === 'Game' || this.type === 'Motivation' ||
        this.type === 'Lesson' || this.type === 'Radio' ||
        this.type === 'Other';
}, 'Type must be only Game, Motivation, Lesson, Radio and Other!');

const Channel = mongoose.model('Channel', channelSchema);
module.exports = Channel;