const shortid = require('shortid');
const Product = require('../models/Product');
const Category = require('../models/Category');
const download = require('image-downloader');

module.exports = {
    createGet: (req, res) => {
        Category.find().select('_id name').then((categories) => {
            res.render('product/create', { categories });
        }).catch(err => {
            console.log(err.message);
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('404 not found page!');
            res.redirect('/');
            return;
        });
    },

    createPost: async(req, res) => {
        const { name, description, price, image, category } = req.body;

        //validate fields!!!
        // TODO
        if (!name.length || !description.length || !image.length || !category.length) {
            return console.log('Fields cannot be empty!');
        }

        if (Number(price) === NaN || Number(price) < 0) {
            return console.log('Price must be positive number!');
        }

        try {
            let productImage = shortid.generate();
            await download
                .image({ url: image, dest: `content/images/${productImage}.jpg` });
            // create object product
            const newProduct = {
                name,
                description,
                price: Number(price),
                image: `/images/${productImage}.jpg`,
                creator: req.user.id,
                category
            };
            //create product to base!
            const productCreated = await Product.create(newProduct);
            const currentCategory = await Category.findById(category);
            currentCategory.products.push(productCreated._id);
            await currentCategory.save();
            res.flash('success', 'Product created succesfully!');
            res.redirect('/');
        } catch (err) {
            console.log(err.message);
        }
    },

    buyGet: (req, res) => {
        const productId = req.params.id;
        Product.findById(productId).then((pro) => {
            res.render('product/buyProduct', pro);
        }).catch(err => console.log(err));
    },

    buyPost: async(req, res) => {
        const productId = req.params.id;
        try {
            let product = await Product.findById(productId).populate('buyer');
            if (product.buyer) {
                res.locals.globalError = 'Product was already bought!';
                res.render('product/buyProduct', req.body);
                return;
            }

            product.buyer = req.user.id;
            req.user.boughtProducts.push(productId);
            await product.save();
            await req.user.save();
            res.flash('success', 'Product did bought succesfully!');
            res.redirect('/');
        } catch (err) {
            console.log(err);
        }
    },

    editGet: (req, res) => {
        const productId = req.params.id;
        if (productId === undefined) return;

        Product.findById(productId).populate('category').then((product) => {
            Category.find().select('_id name').then((categories) => {
                res.render('product/edit', { product, categories });
            }).catch(err => console.log(err.message));
        }).catch(err => console.log(err.message));
    },

    editPost: async(req, res) => {
        const productId = req.params.id;
        const { name, description, price, image, category } = req.body;

        try {
            if (!productId) return;
            const product = await Product.findById(productId);

            if ((product.creator.toString() !== res.locals.user.id.toString()) &&
                (!res.locals.isAdmin)) {
                res.redirect('/user/login');
                return;
            }

            product.name = name || product.name;
            product.description = description || product.description;
            product.price = Number(price) || product.price;
            product.image = image || product.image;

            // change only cateogry field
            if (product.category.toString() !== category.toString()) {
                //remove from old category
                const oldCategory = await Category.findById(product.category);
                oldCategory.products.remove(productId);
                await oldCategory.save();
                //for product
                product.category = category;
                // add to new category
                const newCategory = await Category.findById(category);
                newCategory.products.push(productId);
                await newCategory.save();
            }

            await product.save();
            res.flash('warning', 'Product edited succesfully!');
            res.redirect('/');
        } catch (err) { console.log(err.message); }
    },

    deleteGet: (req, res) => {
        const productId = req.params.id;
        Product.findById(productId).then((p) => {
            res.render('product/delete', p);
        }).catch(err => console.log(err));
    },

    deletePost: (req, res) => {
        const productId = req.params.id;

        Product.findById(productId).then((product) => {
            if ((product.creator.toString() !== res.locals.user.id.toString()) &&
                (!res.locals.isAdmin)) {
                res.redirect('/user/login');
                return;
            }

            // remove product and return deleted product!
            Product.findByIdAndRemove(productId).then((p) => {
                // get category after deleted product!!!
                Category.findById(p.category).then((c) => {

                    c.products = c.products.filter(id => id.toString() !== p._id.toString());
                    return Promise.all([c.save()]);
                }).then(() => {
                    res.flash('danger', 'Product deleted successfully!');
                    res.redirect('/');
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    },

    productsByCategory: async(req, res) => {
        const categoryId = req.params.id;
        if (categoryId === undefined) return;

        try {
            // get all products without bought products!!
            const products = await Product
                .find({ category: categoryId, buyer: null })
                .populate('category');

            if (res.locals.isAuthed) {
                products.map(p => {
                    if (p.creator.toString() === res.locals.user.id || res.locals.isAdmin) {
                        p.hasAccess = true;
                    }

                    p.isAuthed = true;
                });
            }
            const categoryName = products[0].category.name;
            res.render('product/allProductsByCategory', { products, categoryName });
        } catch (err) { console.log(err.message); }
    },

    searchProducts: (req, res) => {
        const name = req.body.query;

        Product.find({ buyer: null }).then((products) => {
            products = products.filter(p => p.name.includes(name));
            res.render('home/index', { products });
        }).catch(err => console.log(err.message));
    }
};