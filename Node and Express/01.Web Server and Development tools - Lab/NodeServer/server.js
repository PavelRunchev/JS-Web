const http = require('http');
const url = require('url');
const port = 5000;
const fs = require('fs');
const handlers = require('./handlers/index');
http.ClientRequest;
http.ClientResponse;

let server = http.createServer(frontController);
server.listen(port);
console.log(`Server is running on port: ${port}...`);

/**
 * 
 * @param {http.ClientRequest} req 
 * @param {http.ClientResponse} res 
 */
function frontController(req, res) {
    req.path = url.parse(req.url).pathname;
    res.sendHtml = (path) => {
        fs.readFile(path, 'utf8', (err, data) => {
            res.writeHead(200, {
                'content-type': 'text/html'
            });
            res.write(data);
            res.end();
        });
    };
   
    if(req.method == 'GET') {
        for (let handler of handlers) {
            if (handler(req, res) !== true) {
                break;
            }
        }
    } else if (req.method == 'POST') {
        let body = '';
        req.on('data', data => {
            body += data;
        });

        req.on('end', () => {
            console.log(body);
            res.end();
        });
    }
}


