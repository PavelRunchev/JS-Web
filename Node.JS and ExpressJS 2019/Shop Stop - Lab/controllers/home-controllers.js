const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const path = require('path');
const Product = require('../models/Product');

module.exports = {
    index: (req, res) => {
        // get all products without bought products (buyer: null)!!
        Product.find({ buyer: null }).populate('category').then((products) => {
            if (res.locals.isAuthed) {
                products.map(p => {
                    if (p.creator.toString() === res.locals.user.id || res.locals.isAdmin) {
                        p.hasAccess = true;
                    }

                    p.isAuthed = true;
                });
            }
            res.render('home/index', { products });
        }).catch(err => console.log(err.message));
    },
};