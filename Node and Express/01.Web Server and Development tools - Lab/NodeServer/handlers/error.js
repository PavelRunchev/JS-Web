const fs = require('fs');

function errorHandler(req, res) {
    fs.readFile('./error.html', 'utf8', (err, data) => {
        res.writeHead(404, {
            'content-type': 'text/html'
        });
        res.write(data);
        res.end();
    });
}

module.exports = errorHandler;