const mongoose = require('mongoose');

const messegeSchema = new mongoose.Schema({
    content: { type: mongoose.Schema.Types.String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true }
});

const Messege = mongoose.model('Message', messegeSchema);
module.exports = Messege;