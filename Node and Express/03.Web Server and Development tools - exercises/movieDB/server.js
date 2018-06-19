const fs = require('fs');
const http = require('http');
const url = require('url');
const port = 5000;

const handlers = require('./handlers');
http.ClientRequest;
http.ClientResponse;

let server = http.createServer(frontController).listen(port);
console.log(`Server is running on port: ${port}`);

/**
 * 
 * @param {http.ClientRequest} req 
 * @param {http.ClientResponse} res 
 */
function frontController(req, res) {
    req.path = url.parse(req.url).pathname;
    
    for (let handler of handlers) {
        if(handler(req, res) !== true) {
            break;
        }
    }
}


