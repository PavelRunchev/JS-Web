const Channel = require('../models/Channel');
const log4js = require('log4js');

module.exports = {
    channelGet: (req, res) => {
        res.render('channel/channel-create');
    },

    channelPost: (req, res) => {
        const followersId = req.user._id;
        const name = req.body.name;
        const description = req.body.description;
        let tags = req.body.tags
            .split(',')
            .map(t => t = t.trim())
            .filter(t => t !== '');
        let type = '';
        if (req.body.game) type = req.body.game;
        if (req.body.motivation) type = req.body.motivation;
        if (req.body.lessons) type = req.body.lessons;
        if (req.body.radio) type = req.body.radio;
        if (req.body.other) type = req.body.other;

        // Validation for empty fields!
        if (!name.length || !description.length || tags.length === 0 || !type.length) {
            res.locals.globalError = 'Fields cannot be empty!';
            tags = tags.join(', ');
            res.render('channel/channel-create', { name, description, tags });
            return;
        }

        const newChannel = { name, description, type, tags, followers: [] };
        Channel.create(newChannel).then(() => {
            res.redirect('/');
        }).catch(err => {
            errorHandler(req, res, err, 'channel/channel-create');
        });
    },

    channelDetails: (req, res) => {
        const channelId = req.params.id;
        Channel.findById(channelId).then((channel) => {
            channel.tags = channel.tags.join(', ');
            channel.following = channel.followers.length;
            res.render('channel/channel-details', channel);
        }).catch(err => console.log(err));
    },

    myChannels: (req, res) => {
        Channel.find({ followers: req.user.id }).then((myChannels) => {
            myChannels.map((myCh, i) => {
                myCh.following = myCh.followers.length;
                myCh.index = i + 1;
            });
            res.render('channel/myChannels', { myChannels });
        }).catch(err => errorHandler(req, res, err, '/'));

    },

    channelFollow: (req, res) => {
        const channelId = req.params.id;
        if (channelId !== undefined) {
            Channel.findById(channelId).then((channel) => {
                channel.followers.push(req.user.id);
                req.user.followedChannels.push(channel._id);
                return Promise.all([channel.save(), req.user.save()]);
            }).then(() => {
                res.redirect('/');
            }).catch(err => errorHandler(req, res, err, '/'));
        }
    },

    channelUnfollow: (req, res) => {
        const channelId = req.params.id;
        if (channelId !== undefined) {
            Channel.findById(channelId).then((channel) => {
                channel.followers.remove(req.user.id);
                req.user.followedChannels.remove(channel._id);
                return Promise.all([channel.save(), req.user.save()]);
            }).then(() => {
                res.redirect('/');
            }).catch(err => errorHandler(req, res, err, '/'));
        }
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