const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;

const memeSchema = Schema({
    title: Types.String,
    memeSrc: Types.String,
    description: Types.String,
    privacy: Types.String,
    dataStamp: {type:Date, default:Date.now()},
    genreId: Types.String
});

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;