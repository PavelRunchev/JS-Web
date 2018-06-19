const Car = require('mongoose').model('Car');
const User = require('mongoose').model('User');
const KeyCar = require('mongoose').model('KeyCar');

module.exports = {
    getDetails: (req, res) => {
        let targetId = req.params.id;

        Car
            .findById(targetId)
            .then(car => {
                let dateArr = car.createDate.toString().split(' ');
                let published = dateArr[2] + ' ' + dateArr[1] + ' ' + dateArr[3];
                car['published'] = published;
                res.render('cars/details', car);
            })
            .catch(err => console.log(err.message));
    },


    RentCar: (req, res) => {
        let rentedCarId = req.params.id;
        let userId = req.user.id;
        let days = Number(req.body.days);

        if (days === '') {
            console.log('days not be empty');
            return;
        }

        if (userId === undefined || rentedCarId === undefined) {
            console.log('not User or Car');
            return;
        }

        Car
            .findById(rentedCarId)
            .then(car => {
                car.rented = true;
                car.duration = days;
                car.save();
                User
                    .findById(userId)
                    .then(user => {
                        user.carList.push(rentedCarId);
                        user.save();
                        let keyObj = {
                            car: rentedCarId,
                            renter: userId,
                            rentDate: Date.now(),
                            days: days
                        };

                        KeyCar
                            .create(keyObj)
                            .then(() => {
                                res.redirect('/');
                            })
                            .catch(err => console.log(err.message));
                    })
                    .catch(err => console.log(err.message));
            }).catch(err => console.log(err.message));
    },

    OutRentCar: (req, res) => {
        let rentedCarId = req.params.id;
        let userId = req.user.id;

        User
            .update({
                _id: userId
            }, {
                $pull: {
                    carList: rentedCarId
                }
            })
            .then(user => {
                Car
                    .findById(rentedCarId)
                    .then(car => {
                        car.rented = false;
                        car.duration = '';
                        car.save();
                        KeyCar.deleteOne({car: rentedCarId}).then(() => {
                            console.log('rented car is deleted...');
                            res.redirect('/');
                        });
                    })
                    .catch(err => console.log(err.message));
            })
            .catch(err => console.log(err.message));
    }
};