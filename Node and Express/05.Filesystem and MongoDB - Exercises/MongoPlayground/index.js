const http = require('http');
const url = require('url');
const qs = require('querystring');
const port = process.env.PORT || 5000;
const handlers = require('./handlers/handlerBlender');

//first reading the base, after run the server. Create Promise(then)!
require('./config/db').then(function() {
    http.createServer((req, res) => {
        req.pathname = url.parse(req.url).pathname;
        req.pathquery = qs.parse(url.parse(req.url).query);
        for (let handler of handlers) {
            if (handler(req, res) !== true) {
                break;
            }
        }
    }).listen(port, () => {
        console.log(`Running server on port: ${port}...`);
    });
}).catch(err => {
    throw new Error(err.message);
});


