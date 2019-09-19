/* eslint-disable no-console */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const fs = require('fs');
const User = require('../models/User');
const log4js = require('log4js');

module.exports = config => {
    mongoose.connect(config.dbPath, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) throw err;
        User.seedAdminUser().then(() => {
            console.log('Database ready');
        }).catch((reason) => {
            errorHandler(reason);
            console.log('Something went wrong');
            console.log(reason);
        });
    });
    db.on('error', reason => {
        errorHandler(reason);
        console.log(reason);
    });
};

function errorHandler(reason) {
    log4js.configure({
        appenders: { serverError: { type: 'file', filename: './logs/serverError.log' } },
        categories: { default: { appenders: ['serverError'], level: 'error' } }
    });

    const logger = log4js.getLogger('serverError');
    logger.error(`${reason}`);
    logger.fatal(`${reason}`);
}