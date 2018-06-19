const mongoose = require('mongoose');


const carSchema = new mongoose.Schema({
    make: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    imageUrl: { type: String, required: true },
    color: { type: String, required: true },
    rented: { type: Boolean, required: true, default: false },
    createDate: { type: Date, required: true ,default: Date.now},
    duration: { type: String, default: ''},
    price: { type: String }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;