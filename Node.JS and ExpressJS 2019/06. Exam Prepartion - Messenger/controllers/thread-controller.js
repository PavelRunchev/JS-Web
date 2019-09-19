const Thread = require('../models/Thread');
const Message = require('../models/Message');
const User = require('../models/User');

module.exports = {
    findThread: async(req, res) => {
        try {
            const searchUsername = req.body.username;

            if (!searchUsername.length) {
                res.locals.globalError = 'Username cannot must empty!';
                res.render('/home/index');
                return;
            }

            const searchedUsername = await User.findOne({ username: searchUsername });
            let thread = await Thread.findOne({ users: { $all: [searchedUsername._id, req.user._id] } });

            if (!thread)
                thread = await Thread.create({ users: [searchedUsername._id, req.user._id] });

            res.redirect(`/thread/${searchedUsername.username}`);
        } catch (err) { console.log(err.Messege); }
    },

    openThread: async(req, res) => {
        const recieverUser = req.params.username;
        try {
            const chatUser = await User.findOne({ username: recieverUser });
            const thread = await Thread
                .findOne({ users: { $all: [req.user._id, chatUser._id] } });
            let messages = await Message.find({ thread: thread._id });

            if (messages !== null) {
                messages = filterMessages(messages, req.user._id.toString());
            }

            let otherUserBlock = false;
            let iAmBlocked = false;
            if (req.user.blockedUsers.includes(recieverUser)) otherUserBlock = true;
            if (chatUser.blockedUsers.includes(req.user.username)) iAmBlocked = true;

            res.render('chatroom', { chatUser, messages, thread, otherUserBlock, iAmBlocked });
        } catch (err) { console.log(err.Messege); }
    },

    sendMessage: async(req, res) => {
        // get from form!!!
        const threadId = req.body.threadId;
        const message = req.body.message;

        const sender = req.user._id;
        const reciever = req.params.username;
        try {
            if (!message.length) {
                res.locals.globalError = 'Message cannot must empty!';
                return;
            }

            const messageCreated = await Message
                .create({
                    content: message,
                    user: sender,
                    thread: threadId,
                });

            let messages = await Message.find({ thread: threadId });
            if (messages !== null) {
                messages = filterMessages(messages, req.user._id.toString());
            }
            const chatUser = { username: reciever };
            const thread = { _id: threadId };
            res.render('chatroom.hbs', { chatUser, messages, thread });
        } catch (err) { console.log(err.message); }
    },

    blockUser: async(req, res) => {
        const userForBlock = req.params.username;
        req.user.blockedUsers.push(userForBlock);
        await req.user.save();
        res.redirect(`/thread/${userForBlock}`);
    },

    unblockUser: async(req, res) => {
        const userForBlock = req.params.username;
        req.user.blockedUsers.remove(userForBlock);
        await req.user.save();
        res.redirect(`/thread/${userForBlock}`);
    },

    removeThread: (req, res) => {
        const threadId = req.params.id;

        Message.deleteMany({ thread: threadId }).then(() => {
            return Promise.all([Thread.deleteOne({ _id: threadId })]);
        }).then(() => {
            res.redirect('/');
        }).catch(err => {
            console.log(err.message);
        });
    }
};

function filterMessages(messages, isMyId) {
    messages.forEach(m => {
        if (m.user.toString() === isMyId) {
            m.isMine = true;
        }

        if (m.content.startsWith('http') &&
            (m.content.endsWith('.jpg') || m.content.endsWith('.png'))) {
            m.isImage = true;
        }
    });

    return messages;
}