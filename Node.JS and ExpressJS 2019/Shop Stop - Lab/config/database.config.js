const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require('../models/User');

module.exports = (config) => {
    mongoose.connect(config.connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    let database = mongoose.connection;

    database.once('open', (err) => {
        if (err) return console.log(err.message);

        User.seedAdminUser().then(() => {
            console.log('Connected to database!');
        }).catch((err) => {
            console.log('Something went wrong!');
            console.log(err.message);
        });
    });

    database.on('error', (err) => {
        console.log(err.message);
    });
}