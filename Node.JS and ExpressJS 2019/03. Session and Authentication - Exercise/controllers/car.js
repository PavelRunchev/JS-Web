const Car = require('../models/Car');
const Rent = require('../models/Rent');

module.exports = {
    addCarGet: (req,res) => {
        res.render('car/add');
    },

    addCarPost: (req, res) => {
        const carBody = req.body;
        carBody.pricePerDay = Number(carBody.pricePerDay);

        if(!carBody.model || !carBody.image || !carBody.pricePerDay) {
            carBody.error = 'Please fill all fields';
            res.render('car/add', carBody);
            return;
        }

        if(carBody.model.length < 2 || carBody.model.length > 15) {
            carBody.error = 'Model must be between 2 or 15 characters!';
            res.render('car/add', carBody);
            return;
        }

        if(typeof (carBody.pricePerDay) !== 'number' || carBody.pricePerDay < 0) {
            carBody.error = 'Price per Day must be positive number!';
            res.render('car/add', carBody);
            return;
        }
      
        Car.create(carBody).then(() => {
            res.redirect('/');
        }).catch(err => console.log(err.message));
    },

    allCars: (req, res) => {
        Car.find({isRented: false}).sort('-pricePerDay').then((cars) => {
            res.render('car/all', { cars });
        }).catch(err => console.log(err.message));
    },

    searchCars: (req, res) => {
        const carModel = req.query.model;
        Car.find({ isRented: false }).then((cars) => {
            cars = cars.filter(c => c.model.startsWith(carModel));
            res.render('car/all', { cars });
        }).catch(err => console.log(err.message));
    },

    rentGet: (req, res) => {
        const carId = req.params.id;
        Car.findById(carId).then((car) => {
            res.render('car/rent', car);
        }).catch(err => console.log(err.message));
    },

    rentPost: async (req, res) => {
        const carId = req.params.id;
        const userId = req.user._id;
        const days = Number(req.body.days);

        try{
            const rent = await Rent.create({ days, car: carId, user: userId });
            req.user.rents.push(rent._id);
            req.user.save();
            const car = await Car.findById(carId);
            car.isRented = true;
            await car.save();
            res.redirect('/car/all');
        } catch(e) { console.log(e.message); }
    },

    editGet: (req, res) => {
        const carId = req.params.id;
        Car.findById(carId).then((car) => {
            res.render('car/edit', car);
        }).catch(err => console.log(err.message));
    },

    editPost: (req, res) => {
        const carId = req.params.id;
        const carBody = req.body;
        carBody.pricePerDay = Number(carBody.pricePerDay);

        if(!carBody.model || !carBody.image || !carBody.pricePerDay) {
            carBody.error = 'Please fill all fields';
            res.render('car/add', carBody);
            return;
        }

        if(carBody.model.length < 2 || carBody.model.length > 15) {
            carBody.error = 'Model must be between 2 or 15 characters!';
            res.render('car/add', carBody);
            return;
        }

        if(typeof (carBody.pricePerDay) !== 'number' || carBody.pricePerDay < 0) {
            carBody.error = 'Price per Day must be positive number!';
            res.render('car/add', carBody);
            return;
        }
        
        Car.findById(carId).then((car) => {
            car.model = carBody.model;
            car.image = carBody.image;
            car.pricePerDay = carBody.pricePerDay;
            car.save();
            res.redirect('/car/all');
        }).catch(err => console.log(err.message));
    }
};