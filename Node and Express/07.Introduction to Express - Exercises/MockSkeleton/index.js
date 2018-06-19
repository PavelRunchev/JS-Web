const express = require('express');
const bodyParser = require('body-parser');
const fileUploader = require('express-fileupload');
const path = require('path');
const port = 2323;

const homeModule = require('./source/modules/homeModule');
const memeModule = require('./source/modules/memeModule');
const apiModule = require('./source/modules/apiModule');



const app = express();

app.use('/public', express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(fileUploader());

app.use('/', homeModule);
app.use('/memes', memeModule);
app.use('/api', apiModule);

require('./source/config/mongoConfig')
    .then(() => {
        app.listen(port, () => console.log('Im listening on ' + port));

    })
    .catch(err => {
        console.log('Could not connect to MongoDb\n', err);
    });
