const { validationResult } = require('express-validator');
const { convertDate } = require('../util/dataConvert');
const { errorHandler } = require('../config/errorHandler');
const Expense = require('../models/Expense');
const User = require('../models/User');
const categories = ["advertising", "benefits", "car", "equipment", "fees", 
"home-office", "insurance", "interest", "Labor", "maintenance", "materials", 
"meals-and-entertainment", "office-supplies", "other", "professional-services", 
"rent", "taxes", "travel", "utilities"];


function validateExpense(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.locals.globalError = errors.errors[0]['msg'];
        const expense = req.body;
        res.render('expense/new-expense', expense);
        return false;
    }

    return true;
}

module.exports = {
    expenseCreateGet: (req, res) => {
        const expense = req.body;
        res.render('expense/new-expense', expense);
    },

    expenseCreatePost: (req, res, next) => {
        const userId = res.locals.currentUser._id;
        const { merchant, total, category, description, report } = req.body;

        if(validateExpense(req, res)) {
            if(Number(total) < 0) {
                res.locals.globalError = 'Total should be positive number';
                const expense = req.body;
                res.render('expense/new-expense', expense);
                return;
            } 
    
            if(!categories.includes(category)) {
                res.locals.globalError = 'Category should one from the given options';
                const expense = req.body;
                res.render('expense/new-expense', expense);
                return;
            }
            
            Promise.all([
                Expense.create({
                    merchant,
                    total: Number(total),
                    category,
                    description,
                    report: report === 'on' ? true : false
                }),

                User.findById(userId)
            ]).then(([expense, user]) => {
                user.expenses.push(expense._id);
                return Promise.resolve(user.save());
            }).then(() => {
                res.flash('success', 'Expense created successfully!');
                res.status(201).redirect('/');
            }).catch(err => errorHandler(err, req, res));
        }
    },

    expenseReport: (req,  res, next) => {
        const expenseId = req.params.id;
        Expense.findById(expenseId).then((expense) => {
            expense.dateFormat = convertDate(expense.date);
            res.render('expense/report', expense);
        }).catch(err => errorHandler(err, req, res));
    },

    stopTracking: (req, res, next) => {
        const expenseId = req.params.id;
        const userId = res.locals.currentUser._id;
        Promise.all([
            Expense.findByIdAndRemove({ _id: expenseId }),
            User.findById(userId)
        ]).then(([expense, user]) => {
            user.expenses.pull(expense._id);
            return Promise.resolve(user.save());
        }).then(() => {
            res.flash('success', 'Expense deleted successfully!');
            res.status(301).redirect('/');
        }).catch(err => errorHandler(err, req, res));
    }
}