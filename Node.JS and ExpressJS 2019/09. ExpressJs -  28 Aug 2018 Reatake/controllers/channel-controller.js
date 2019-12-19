const { validationResult } = require('express-validator');
const { errorHandler } = require('../config/errorHandler');
const validTypes = ["Game", "Motivation", "Lessons", "Radio", "Other"];
const Channel = require('../models/Channel');
const User = require('../models/User');

function validateChannel(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.locals.globalError = errors.errors[0]['msg'];
        const channel = req.body;
        res.render('channel/channel-create', channel);
        return false;
    }

    return true;
}

module.exports = {
    myChannels: (req, res) => {
        const userId = res.locals.currentUser._id;
        User.findById(userId)
            .select('followedChannels')
            .populate('followedChannels')
            .then((user) => {
                user.followedChannels.map((f,i) => {
                    f.index = i + 1;
                    f.following = f.followers.length;
                })
                res.render('channel/myChannels', user);
            }).catch(err => errorHandler(err, req, res));
    },

    channelCreateGet: (req, res) => {
        const channel = req.body;
        res.render('channel/channel-create', channel);
    },

    channelCreatePost: (req,  res) => {
        let { name, description, tags, type} = req.body;

        if(validateChannel(req, res)) {
            if(tags === "") {
                res.locals.globalError = "Tags is requires!";
                const channel = req.body;
                res.render('channel/channel-create', channel);
                return;
            }

            if(!validTypes.includes(type)) {
                res.locals.globalError = "Invalid Type!";
                const channel = req.body;
                res.render('channel/channel-create', channel);
                return;
            }

            const tagsSplited = tags
                .split(',')
                .map(t => t = t.trim());
            Channel.create({
                name,
                description,
                type,
                tags: tagsSplited
            }).then(() => {
                res.flash('success', 'Channel created successfully!');
                res.status(201).redirect('/');
            }).catch(err => errorHandler(err, req, res));
        }
    },

    channelDetails: (req, res) => {
        const channelId = req.params.id;
        Channel.findById(channelId).then((channel) => {
            channel.following = channel.followers.length;
            channel.tagView = channel.tags.join(', ');
            res.render('channel/channel-details', channel);
        }).catch(err => errorHandler(err, req, res));
    },

    channelFollow: (req, res) => {
        const channelId = req.params.id;
        const userId = res.locals.currentUser._id;
        Promise.all([
            User.findById(userId),
            Channel.findById(channelId)
        ]).then(([user, channel]) => {
            user.followedChannels.push(channel._id);
            channel.followers.push(user._id);
            return Promise.all([ user.save(), channel.save()]);
        }).then(() => {
            res.flash('info', 'The Channel is followed successfully!');
            res.status(204).redirect('/');
        }).catch(err => errorHandler(err, req, res));
    },

    channelUnfollow: (req, res) => {
        const channelId = req.params.id;
        const userId = res.locals.currentUser._id;

        Promise.all([
            Channel.findById(channelId),
            User.findById(userId)
        ]).then(([channel, user]) => {
            user.followedChannels.pull(channel._id);
            channel.followers.pull(user._id);
            return Promise.all([ user.save(), channel.save()]);
        }).then(() => {
            res.flash('info', 'You unfollow successfully!');
            res.status(204).redirect('/');
        }).catch(err => errorHandler(err, req, res));
    }
}