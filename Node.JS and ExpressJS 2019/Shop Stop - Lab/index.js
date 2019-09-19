const config = require('./config/config.js');
const database = require('./config/database.config.js');
const express = require('express');
const port = 27017;

let app = express();
let environment = process.env.Node_ENV || 'development';
database(config[environment]);
require('./config/express')(app, config[environment]);
require('./config/passport')();
require('./config/routes')(app);

app.listen(port, console.log(`server is port: ${port}`));