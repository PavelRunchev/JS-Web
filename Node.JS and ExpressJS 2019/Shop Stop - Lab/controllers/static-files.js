const url = require('url');
const fs = require('fs');
const path = require('path');

function getContentType(data) {
    let dataTypes = {
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.ico': 'image/x-icon'
    };
    for (let type in dataTypes) {
        if (data.endsWith(type)) {
            return dataTypes[type]
        }
    }
}

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;
    if (req.pathname.startsWith('/content/') && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, `..${req.pathname}`));
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write('Resource not found!');
                res.end();
                return;
            }

            res.writeHead(200, { 'Content-Type': getContentType(req.pathname) });
            res.write(data);
            res.end();
        })
    } else {
        return true;
    }
}