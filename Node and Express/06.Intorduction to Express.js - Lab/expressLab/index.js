const express = require('express');
const bodyParser = require('body-parser');
const port = 1337;

let app = express();
//attach bodyParser to expres
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.status(200);
    res.send('Welcome to Expres.js!');
});


//test with postman
app.post('/create', (req, res) => {
    res.status(200);
    res.send('POST request to the homepage');
});

//test with postman
app.put('/modify', (req, res) => {  
    res.send('PUT request to the homepage');
});

app.all('/about', (req, res, next) => {
    console.log('Middleware execution');
    next();
}, (req, res) => {
    res.send('Show about page.');
});

app.get(/.*fly$/, (req, res) => {
    res.send('butterfly, dragonfly');
});

app.get('/users/:userId(\\d+)', (req, res) => {
    let paramsObj = req.params.userId;
    res.send(paramsObj);
});

//test with postman
app.route('/home')
    .get((req, res) => {
        res.send('Get home page');
    })
    .post((req, res) => {
        res.send('POST home page');
    })
    .all((req, res) => {
        res.send('Everything else');
    });


app.get('/download', (req, res) => {
    res.download('./public/what-does-it-mean-when-cat-wags-tail.jpg');
});


app.get('/about/old', (req, res) => {
    res.redirect('/about');
});


//send Image(jpg) to client(browser)
app.get('/file/:cat', (req, res) => {
    //scpecify path to image on the application
    res.sendFile('public/cat.jpg', {root: __dirname});
}); 

//access to client for him all files in 'public' directory
app.use(express.static('public'));


//parse form easy
app.route('/login')
    //load html form
    .get((req, res) => {
        res.sendFile('login.html', {root: __dirname});
    //return data from html form
    }).post((req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        console.log('username: ' + username + '\npass: ' + password );
        res.redirect('/');
    });



app.listen(port, () => console.log(`Express running on port ${port}`));