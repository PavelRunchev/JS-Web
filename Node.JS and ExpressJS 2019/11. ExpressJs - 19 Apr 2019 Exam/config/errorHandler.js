const fs = require('fs');
const log4js = require('log4js');

async function errorHandler(req, res, e, partial) {
    let errors = [];
    if (e.errmsg) {
        log4js.configure({
            appenders: { usersError: { type: 'file', filename: './logs/usersError.log' } },
            categories: { default: { appenders: ['usersError'], level: 'error' } }
        });

        const logger = log4js.getLogger('usersError');
        logger.error(`${e.errmsg}`);
        if (e.errmsg.startsWith('E11000 duplicate key error collection:')) {
            res.locals.globalError = 'username is already!';
            res.render(`${partial}`, req.body);
        }

        return;
    }

    for (let key in e.errors) {
        if (!e.errors[key].message.endsWith('required.')) {
            errors.push(e.errors[key].message);
            log4js.configure({
                appenders: { usersError: { type: 'file', filename: './logs/usersError.log' } },
                categories: { default: { appenders: ['usersError'], level: 'error' } }
            });

            const logger = log4js.getLogger('usersError');
            logger.error(`${e.errors[key].message}`);
        } else {
            log4js.configure({
                appenders: { serverError: { type: 'file', filename: './logs/serverError.log' } },
                categories: { default: { appenders: ['serverError'], level: 'error' } }
            });

            const logger = log4js.getLogger('serverError');
            logger.debug('');
            logger.info('');
            logger.warn('');
            logger.error(`${e.errors[key].message}`);
            logger.fatal(`${e.errors.errmsg}`);
        }
    }

    console.log(e);
    res.locals.globalError = errors;
    res.render(`${partial}`, req.body);
}

module.exports = errorHandler;