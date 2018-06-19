const homeController = require('../controllers/homeController');
const booksController = require('../controllers/booksController');

module.exports = (app) => {
    app.get('/', homeController.home);  
    app.get('/addBook', booksController.getAddBook);   
    app.post('/addBook', booksController.postAddBook);  
    app.get('/viewAllBooks', booksController.viewAllBookd);  
    app.get('/details/:id', booksController.detailBook);
};