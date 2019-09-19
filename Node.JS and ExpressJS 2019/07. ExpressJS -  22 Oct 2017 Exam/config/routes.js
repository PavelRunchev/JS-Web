const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);
    app.get('/register', restrictedPages.isAnonymous, controllers.user.registerGet);
    app.post('/register', restrictedPages.isAnonymous, controllers.user.registerPost);
    app.post('/logout', restrictedPages.isAuthed, controllers.user.logout);
    app.get('/login', restrictedPages.isAnonymous, controllers.user.loginGet);
    app.post('/login', restrictedPages.isAnonymous, controllers.user.loginPost);

    // Authentication role
    app.get('/order/customize-order/:id', restrictedPages.isAuthed, controllers.order.customizeOrder);
    app.post('/order/order-placed', restrictedPages.isAuthed, controllers.order.orderPlaced);

    app.get('/order/order-status', restrictedPages.isAuthed, controllers.order.orderStatus);
    app.get('/order/order-details/:id', restrictedPages.isAuthed, controllers.order.details);

    // Admin role
    app.get('/product/create', restrictedPages.hasRole('Admin'), controllers.product.createGet);
    app.post('/product/create', restrictedPages.hasRole('Admin'), controllers.product.createPost);
    app.get('/order/all-orders', restrictedPages.hasRole('Admin'), controllers.order.allOrders);
    app.post('/order/saveChanges', restrictedPages.hasRole('Admin'), controllers.order.saveChanges);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};