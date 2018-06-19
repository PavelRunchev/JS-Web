const express = require('express');
const datebase = require('./config/database');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const port = 5000;
const app = express();
const routes = require('./config/router');


//load handlebars with '.hbs
app.engine('hbs', handlebars({
    extname: '.hbs',
    //main html
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main.hbs',
    //partial html to Main.hbs
    partialsDir: 'views/'
}));
app.set('view engine', 'hbs');

app.use('/static', express.static('./static'));
//load bodyParser to express 
//Coution bodyParser is attach to express before routers to app!!!
app.use(bodyParser.urlencoded({extended: true}));

//attach routers to app
routes(app);

//load mongoDb and after load server express...
require('./config/database.js').then(() => {
    app.listen(port, () => console.log(`Express server is running on port: ${port}...`));
}).catch(err => {
    console.log('Could not connect to MongoDb ' + err);
});
