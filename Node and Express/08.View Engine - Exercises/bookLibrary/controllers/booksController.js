const Book = require('../data/Book');
const bodyParser = require('body-parser');

module.exports = {
    getAddBook: (req, res) => {
        res.render('addBook');
    },

    postAddBook: (req, res) => {
        console.log(req.body);
        let book = {
            title: req.body.bookTitle,
            releaseDate: req.body.bookYear,
            image: req.body.bookPoster,
            author: req.body.bookAuthor,
            description: req.body.bookDescription
        };
    
        
        if(req.body.bookTitle === '' || req.body.bookYear === '' 
        || req.body.bookAuthor === '' || req.body.bookPoster === '' || req.body.bookDescription === '') {
            book.error = true;
            //send addBook.hbs, object Book and error bolean
            return res.render('addBook', book);

        }
    
        //book.releaseDate = new Date(book.releaseDate);
        Book.create(book).then(() => {
            let succsses = true;
            res.redirect('viewAllBooks');
        });
    },

    detailBook: (req, res) => {
        let targetId = req.params.id;
        Book.findById(targetId).then(book => {
            let date = book.releaseDate.toString().split(' ')[3];
            console.log(date);
            res.render('details', { book, date } );
        });
    },

    viewAllBookd: (req, res) => {
        Book.find().sort('-releaseDate').then(books => {
            let count = books.length;
            res.render('viewAllBooks', { books, count });
        });
    }
};