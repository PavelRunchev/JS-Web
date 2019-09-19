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
        const data = {
            data: new Date().toLocaleString(),
            error: reason,
        };
        fs.writeFile('../logs/serverErrors.txt', `${JSON.stringify(data)}\n`, { flag: 'a+' }, (err) => {
            if (err) return console.error(err);
            console.log('The file has been saved!');
        });
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