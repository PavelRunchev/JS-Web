const { convertDate } = require('../util/dataConvert');
const User = require('../models/User');
// If get MongooseError for populate properties - added with require!!!
const Expense = require('../models/Expense');

module.exports = {
    index: (req, res, next) => {
        if(res.locals.currentUser) {
            const userId = res.locals.currentUser._id;
            
            User
                .findById(userId)
                .populate('expenses')
                .then((user) => {
                    user.expenses.map(e => {
                        e.dateFormat = convertDate(e.date);
                    })
                    user.isExpenses = user.expenses.length > 0 ? true : false;
                res.status(200).render('home/index', user);
            }).catch(err => errorHandler(err, req, res));
        } else {
            res.status(200).render('home/index');
        }
    }, 

    pageNotFound: (req, res) => {
        res.status(200).render('error/pageNotFound');
    }
}