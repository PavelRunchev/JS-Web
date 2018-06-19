const fs = require('fs');
const db = require('../config/dataBase');

function statusHandler(req, res) {
    if(req.path === '/status' && req.method === 'GET') {
        const moviesCount = db.length;
        const text = `<center><h1>Your movies is ${moviesCount}</h1></center>`;
        fs.readFile('./views/status.html', 'utf8', (err, data) => {
            if(err) {
                console.log(err.message);
                return;
            }
            res.writeHead(200, {
                'content-type': 'text/html'
            });
            data = data.toString().replace('<h1>{{replaceMe}}</h1>', text);
            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
}

module.exports = statusHandler;