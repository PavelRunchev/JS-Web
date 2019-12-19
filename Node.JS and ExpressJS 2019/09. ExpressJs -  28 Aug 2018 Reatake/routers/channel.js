const controllers = require('../controllers');
const router = require('express').Router();
const auth = require('../config/auth');
const { body } = require('express-validator');
const Channel = require('../models/Channel');

router.get('/myChannels', auth.isAuthed, controllers.channel.myChannels);
router.get('/channel-create', auth.isAdmin, controllers.channel.channelCreateGet);
router.post('/channel-create',[
    body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Username is required!')
    .custom((value, { req }) => {
        return Channel.findOne({ name: value }).then((checkChannel) => {
            if (checkChannel)
                return Promise.reject('Channel already exists!');
        });
    }),
    body('description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Description is required!'),
    body('tags')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Tags is required!')
], auth.isAdmin, controllers.channel.channelCreatePost);

router.get('/channel-details/:id', auth.isAuthed, controllers.channel.channelDetails);

router.get('/channel-follow/:id', auth.isAuthed, controllers.channel.channelFollow);
router.get('/channel-unfollow/:id', auth.isAuthed, controllers.channel.channelUnfollow);

module.exports = router;