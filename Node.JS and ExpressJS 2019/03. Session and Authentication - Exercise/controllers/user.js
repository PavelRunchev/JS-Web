const encryption = require('../util/encryption');
const User = require('../models/User');
const Car =  require('../models/Car');
const Rent = require('../models/Rent');

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },
    registerPost: async (req, res) => {
        const reqUser = req.body;

        if(!reqUser.password || !reqUser.repeatPassword || !reqUser.username 
            || !reqUser.firstName || !reqUser.lastName) {
            reqUser.error = 'Please fill all fields';
            res.render('user/register', reqUser);
            return;
        }

        if(reqUser.password !== reqUser.repeatPassword) {
            reqUser.error = 'Passwords must match!';
            res.render('user/register', reqUser);
            return;
        }

        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, reqUser.password);
        try {
            const user = await User.create({
                username: reqUser.username,
                hashedPass,
                salt,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                roles: [ 'User' ]
            });

            //after successful registration auto login!
            req.logIn(user, (err) => {
                if(err) {
                    reqUser.error = err;
                    res.render('user/register', reqUser);
                    return;
                }

                res.redirect('/');
            });
        } catch(err) { console.log(err.message);}
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('user/login');
    },
    loginPost: async (req, res) => {
        const reqUser = req.body;

        try {
            const user = await User.findOne({ username: reqUser.username });
            if(!user) {
                reqUser.error = 'Invalid username';
                res.render('user/login', reqUser);
                return;
            }

            if(!user.authenticate(reqUser.password)) {
                reqUser.error = 'Invalid password';
                res.render('user/login', reqUser);
                return;
            }

            req.logIn(user, (err) => {
                if(err) {
                    reqUser.error = err;
                    res.render('user/login', reqUser);
                    return;
                }

                res.redirect('/');
            });
        } catch (e) {
            reqUser.error = e;
            res.render('user/login', reqUser);
        }
    },

    myRents: async (req, res) => {
        let cars = [];
        const userId = req.user.id;
        try {
            const myRents = await Rent.find({ user: userId }).populate('car');
            for (let r of myRents) {
                const statsCar = {
                    _id: r._id,
                    model: r.car.model,
                    pricePerDay: r.car.pricePerDay,
                    expiresOn: r.days
                };
                cars.push(statsCar);
            }
            res.render('user/rented', { cars } );
        } catch(e) {
            console.log(e.message);
        }
    },

    removeMyRent: async (req, res) => {
        const rentId = req.params.id;
        const userId = req.user.id;
        try {
            const rent = await Rent.findById(rentId);
            const car = await Car.findById(rent.car);
            car.isRented = false;
            await car.save();
            const deletedRent = await Rent.deleteOne({ _id: rentId});
            let currentUser = await User.findById(userId);
            //Warning - remove ObjectId with filter method is failed(dont work)!!!
            currentUser.rents.remove(rentId);
            await currentUser.save();
            res.redirect('/car/all');
        }
        catch(e) { console.log(e.message); }
    }
};