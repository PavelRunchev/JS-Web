const Product = require('../models/Product');

module.exports = {
    index: async(req, res) => {
        const products = await Product.find({}).sort({ size: 'ascending' });
        let chickens = [];
        let beefs = [];
        let lambs = [];
        for (const p of products) {
            if (p.category === 'Chicken')
                chickens.push(p);
            else if (p.category === 'Beef')
                beefs.push(p);
            else if (p.category === 'Lamb')
                lambs.push(p);
        }

        res.render('home/index', { chickens, beefs, lambs });
    }
};