const Car = require('../models/Car');

module.exports = {
    index: async (req, res) => {
        const cars = await Car.find();
        const freeCars = cars.filter(c => c.isRented === false).length;
        const rentedCars = cars.filter(c => c.isRented === true).length;
        res.render('home/index', { freeCars, rentedCars });
    }
};