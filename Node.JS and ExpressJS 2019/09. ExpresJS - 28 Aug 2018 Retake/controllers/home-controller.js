const Channel = require('../models/Channel');
const log4js = require('log4js');

module.exports = {
    index: async(req, res) => {
        if (res.locals.isAuthed) {
            try {
                let channels = await Channel.find({});
                channels.map(c => c.following = c.followers.length);

                // your channels
                const yourChannels = channels
                    .filter(c => c.followers.some(s => s.toString() === req.user.id))
                    .slice(0, 5);
                // empty your channel
                const emptyYourChannels = ['', '', '', '', '']
                    .splice(0, 5 - yourChannels.length);

                // suggested channels
                const suggestedChannels = channels
                    .filter(c => c.followers.length > 0)
                    .slice(0, 5);
                // empty suggested channel
                const emptySuggestedChannels = ['', '', '', '', '']
                    .splice(0, 5 - suggestedChannels.length);

                // see other
                const seeOther = channels
                    .filter(c => c._id !== suggestedChannels.includes(c._id))
                    .slice(0, 5);
                // empty see other
                const emptyseeOther = ['', '', '', '', '']
                    .splice(0, 5 - seeOther.length);
                res.render('home/index', { yourChannels, emptyYourChannels, suggestedChannels, emptySuggestedChannels, seeOther, emptyseeOther });
            } catch (err) {
                errorHandler(req, res, err, '/');
            }
        } else {
            res.render('home/index');
        }
    },

    pageNotFound: (req, res) => {
        //res.status(404);
        res.render('error/pageNotFound');
    }
};

async function errorHandler(req, res, e, partial) {
    let errors = [];
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
            logger.debug('Got cheese.');
            logger.info('Cheese is Comté.');
            logger.warn('Cheese is quite smelly.');
            logger.error(`${e.errors[key].message}`);
            logger.fatal(`${e.errors[key]}`);
        }
    }

    console.log(e);
    res.locals.globalError = errors;
    res.render(`${partial}`, req.body);
}