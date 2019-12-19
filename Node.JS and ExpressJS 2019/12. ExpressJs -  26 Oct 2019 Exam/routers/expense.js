const controllers = require('../controllers');
const router = require('express').Router();
const auth = require('../config/auth');
const { body } = require('express-validator');
const Expense = require('../models/Expense');

router.get('/expense-create', auth.isAuthed, controllers.expense.expenseCreateGet);
router.post('/expense-create', 
[
    body('merchant')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Merchant is required!')
    .matches('^[A-Za-z0-9 ]{4,}$').withMessage('Merchant should be at least 4 characters long')
    .custom((value, { req }) => {
        return Expense.findOne({ merchant: value }).then((userDoc) => {
            if (userDoc)
                return Promise.reject('Merchant already exists!');
        });
    }),

    body('description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Description is required!')
    .isLength({ min: 10, max: 50 })
    .withMessage('Description should be minimum 10 characters long and 50 characters maximum')
]
,auth.isAuthed, controllers.expense.expenseCreatePost);

router.get('/expense-report/:id', auth.isAuthed, controllers.expense.expenseReport);

router.get('/expense-stop-tracking/:id', auth.isAuthed, controllers.expense.stopTracking);

module.exports = router;