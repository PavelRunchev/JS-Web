const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const KeyCarSchema = new mongoose.Schema({
    car: { type: ObjectId, ref:'Car', required: true },
    renter: {type:ObjectId, ref:'User', required: true },
    rentDate: {type: Date, required: true },
    days: {type: Number, required: true } 
});

const KeyCar = mongoose.model('KeyCar', KeyCarSchema);

module.exports = KeyCar;