const Category = require('../models/Category');

module.exports = {
    createCategoryGet: (req, res) => {
        res.render('category/create');
    },

    createCategoryPost: (req, res) => {
        Category.create({
                name: req.body.name,
                creator: req.user.id,
                products: []
            })
            .then(() => {
                res.flash('success', 'Category created succesful!');
                res.redirect('/');
            }).catch(err => console.log(err.message));
    },
};