const fs = require('fs');

function homeHandler(req, res) {
    if(req.path === '/' && req.method === 'GET') {
        fs.readFile('./views/home.html', 'utf8', (err, data) => {
            if(err) {
                console.log(err.message);
                return;
            }
            res.writeHead(200, {
                'content-type': 'text/html'
            });
            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
}

module.exports = homeHandler;