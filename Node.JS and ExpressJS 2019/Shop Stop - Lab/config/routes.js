const controllers = require('../controllers');
const auth = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);

    app.get('/user/register', auth.isAnonymous, controllers.user.registerGet);
    app.post('/user/register', auth.isAnonymous, controllers.user.registerPost);

    app.get('/user/login', auth.isAnonymous, controllers.user.loginGet);
    app.post('/user/login', auth.isAnonymous, controllers.user.loginPost);

    app.post('/user/logout', auth.isAuthed, controllers.user.logout);

    app.post('/product/search', controllers.product.searchProducts);

    app.get('/product/product-create', auth.isAuthed, controllers.product.createGet);
    app.post('/product/product-create', auth.isAuthed, controllers.product.createPost);

    app.get('/product/product-buy/:id', auth.isAuthed, controllers.product.buyGet);
    app.post('/product/product-buy/:id', auth.isAuthed, controllers.product.buyPost);

    app.get('/product/product-edit/:id', auth.isAuthed, controllers.product.editGet);
    app.post('/product/product-edit/:id', auth.isAuthed, controllers.product.editPost);

    app.get('/product/product-delete/:id', auth.isAuthed, controllers.product.deleteGet);
    app.post('/product/product-delete/:id', auth.isAuthed, controllers.product.deletePost);

    app.get('/product/productsByCategory/:id', controllers.product.productsByCategory);

    app.get('/category/category-create', auth.isAuthed, controllers.category.createCategoryGet);
    app.post('/category/category-create', auth.isAuthed, controllers.category.createCategoryPost);



    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
}