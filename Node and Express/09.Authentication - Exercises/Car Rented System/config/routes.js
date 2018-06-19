const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);

    app.get('/users/createCar', controllers.user.createCarView);
    app.post('/users/createCar', controllers.user.createCar);

    app.get('/users/register', controllers.user.registerGet);
    app.post('/users/register', controllers.user.registerPost);

    app.get('/users/login', controllers.user.loginGet);
    app.post('/users/login', controllers.user.loginPost);

    app.get('/logout', controllers.user.logout);

    app.get('/users/profile/:id', controllers.user.profile);
    app.get('/cars/all', controllers.user.getAllCars);

    app.get('/about', controllers.admin.about);

    app.get('/cars/details/:id', controllers.details.getDetails);

    app.get('/cars/rent/:id', controllers.details.OutRentCar);
    app.post('/cars/rent/:id', controllers.details.RentCar);

    app.post('/edit/:id', controllers.edit.postEdit);
    app.post('/cars/edit/:id', controllers.edit.getEdit);
    

    
    app.all('*', (req, res) => {
        res.status(404);
        res.render('error');
    });
};