const Thread = require('../models/Thread');

module.exports = {
    index: (req, res) => {
        Thread.find({}).populate('users').then((threads) => {
            threads.map(t => {
                t.user1 = t.users[0].username;
                t.user2 = t.users[1].username;
                t.date = convertDate(t.dateCreated);
            });
            res.render('home/index', { threads });
        }).catch(err => console.log(err.message));
    }
};

function convertDate(value) {
    const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let day = new Date(value).getUTCDate();
    let month = new Date(value).getUTCMonth() + 1;
    let year = new Date(value).getUTCFullYear();
    let minutes = new Date(value).getUTCMinutes();
    let hours = new Date(value).getUTCHours();
    let week = weeks[new Date(value).getDay()];
    if (day < 10)
        day = '0' + day;
    if (month < 10)
        month = '0' + month;

    return `${week} ${day} ${month} ${year} - ${hours}:${minutes}`;
}