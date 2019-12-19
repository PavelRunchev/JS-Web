const { errorHandler } = require('../config/errorHandler');
const User = require('../models/User');
const Channel = require('../models/Channel');

module.exports = {
    index: (req, res) => {
        if(res.locals.isAuthed) {
            const userId = res.locals.currentUser._id;
            Channel.find({}).then((channels) => {
                let array = channels;
                // Your Channels
                let myChannels = array
                    .filter(c => c.followers.some(s => s.toString() === userId.toString()))
                    .splice(0, 5);

                myChannels.map(c => {
                    c.following = c.followers.length;
                });

                // empty Your Channels
                let noMyChannels = ['', '', '', '', '']
                .splice(0, 5 - myChannels.length);

                // Suggest Channels
                let suggestChannels = array
                .filter(c => c.tags.some(t => myChannels.some(m => m.tags.includes(t))))
                .filter(c => myChannels.some(a => a._id !== c._id))
                .splice(0, 5);

                suggestChannels.map(c => {
                    c.following = c.followers.length;
                });

                // empty Suggest Channels
                let noSuggestChannels = ['', '', '', '', '']
                .splice(0, 5 - suggestChannels.length);


                // See Other
                let seeOther = array
                .filter(c => (!suggestChannels.some(d => d._id === c._id)) && (!myChannels.some(e => e._id === c._id)))
                .splice(0, 5);
                seeOther.map(c => {
                    c.following = c.followers.length;
                });

                // empty See Other
                let noSeeOther = ['', '', '', '', '']
                .splice(0, 5 - seeOther.length);

                res.status(200).render('home/index', 
                { myChannels, noMyChannels, suggestChannels, noSuggestChannels, seeOther, noSeeOther });
            }).catch(err => errorHandler(err, req, res));
        } else {
            res.status(200).render('home/index');
        }
    }, 

    pageNotFound: (req, res) => {
        res.status(200).render('error/pageNotFound');
    }
}