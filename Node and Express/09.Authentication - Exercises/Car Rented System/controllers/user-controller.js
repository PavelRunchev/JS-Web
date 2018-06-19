const encryption = require('../util/encryption');
const User = require('mongoose').model('User');
const Car = require('mongoose').model('Car');
const KeyCar = require('mongoose').model('KeyCar');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: async (req, res) => {
        const reqUser = req.body;
        const salt = encryption.generateSalt();
        const hashedPass =
            encryption.generateHashedPassword(salt, reqUser.password);
        try {
            const user = await User.create({
                username: reqUser.username,
                hashedPass,
                salt,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                roles: []
            });
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('users/register', user);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/register');
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('users/login');
    },
    loginPost: async (req, res) => {
        const reqUser = req.body;
        try {
            const user = await User.findOne({ username: reqUser.username });
            if (!user) {
                errorHandler('Invalid user data');
                return;
            }
            if (!user.authenticate(reqUser.password)) {
                errorHandler('Invalid user data');
                return;
            }
            req.logIn(user, (err, user) => {
                if (err) {
                    errorHandler(err);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            errorHandler(e);
        }

        function errorHandler(e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/login');
        }
    },

    profile: (req, res) => {
        //id of loged user
        let targetUserId = req.params.id;

        User
            .findById(targetUserId)
            .populate('carList')
            .then(user => {
                KeyCar.find({renter: targetUserId}).then(key => {                   
                    res.render('users/profile', user);
                }).catch(err => console.log(err));            
            })
            .catch(err => console.log(err.message));
    },

    getAllCars: (req, res) => {
        let pageNum = Number(req.query.page);
        
        let prevPage = pageNum - 1;
        let nextPage = pageNum + 1;

        if(prevPage < 0) {
            prevPage = 0;
        }

        let page = {
            prevPage,
            nextPage
        };
        Car
            .find({})
            .where('rented').equals('false')
            .sort('-createDate')
            .skip(page*10)
            .limit(10)
            .then(cars => {   
                for(let car of cars) {
                    car['isRented'] = 'free';
                }           
                res.render('cars/all', { cars, page });
            })
            .catch(err => console.log(err.message));
    },

    createCarView: (req, res) => {
        res.render('cars/createCar');
    },

    createCar: (req, res) => {
        let make = req.body.make;
        let model = req.body.model;
        let imageUrl = req.body.imageUrl;
        let color = req.body.color;

        if(make === '' || model === '' || imageUrl === '' || color === '') {
            console.log('fields not be empty!');
            res.render('createCar');
        } else {
            let createCar = {
                make,
                model,
                imageUrl,
                color
            };

            Car
                .create(createCar)
                .then(() => {
                    res.redirect('/');
                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    }
};