const homeController = require('../controllers/home.js');
const cubeController = require('../controllers/cube.js');

module.exports = app => {
    app.get('/', homeController.homeGet);
    app.get('/about', homeController.about);
    app.get('/search', homeController.search);
    app.get('/create', cubeController.createGet);
    app.post('/create', cubeController.createPost);
    app.get('/details/:id', cubeController.details);
    app.get('/remove/:id', cubeController.remove);
    app.get('/search', homeController.search);
};