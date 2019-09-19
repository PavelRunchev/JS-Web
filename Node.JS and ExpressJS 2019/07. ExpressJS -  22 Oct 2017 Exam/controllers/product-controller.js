const allowToppings = ['pickle', 'tomato', 'onion', 'lettuce', 'hot sauce', 'extra sauce', 'parsley'];
const Product = require('../models/Product');

module.exports = {
    createGet: (req, res) => {
        res.render('product/create');
    },

    createPost: async(req, res) => {
        const { category, imageUrl, size, toppings } = req.body;
        try {
            let toppingsFiltered = toppings
                .split(',')
                .map(t => t = t.trim())
                .filter(t => t !== '')
                .filter(t => allowToppings.includes(t) === true);

            const products = await Product.find({ category: category });
            for (let pro of products) {
                if (pro.size === Number(size) && pro.category === category) {
                    res.locals.globalError = 'You have created those a doner!';
                    res.render('product/create.hbs', req.body);
                    return;
                }
            }

            const created = await Product.create({
                category,
                size: Number(size),
                imageUrl,
                toppings: toppingsFiltered
            });

            res.redirect('/');
        } catch (err) {
            let errors = [];
            for (const key in err.errors) {
                if (!err.errors[key].message.endsWith('required.'))
                    errors.push(err.errors[key].message);
            }

            console.log(err.message);
            res.locals.globalError = errors;
            res.render('product/create', req.body);
        };
    }
};