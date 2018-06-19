const fs = require('fs');
const queryString = require('querystring');
const db = require('../config/dataBase');



function addMovieHandler(req, res) {
    if(req.path === '/addMovie' && req.method === 'GET') {
        fs.readFile('./views/addMovie.html', 'utf8', (err, data) => {
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
    } else if(req.path === '/addMovie' && req.method === 'POST') {
     
        let body = [];
        req.on('data', data => {
            body.push(data);
        });

        req.on('end', () => {
            body = Buffer.concat(body).toString();
            let movieBody = queryString.parse(body);
            let addMovie = true;

            for (let prop in movieBody) {
                if(movieBody[prop] === '' || movieBody[prop] === null) {
                    addMovie = false;
                }
            }

            if(addMovie) {        
                fs.readFile('./views/addMovie.html', (err, data) => {
                    if(err) {
                        console.log(err.message);
                        return;
                    }

                    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', '<div id="succssesBox"><h2 id="succssesMsg">Movie Added</h2></div>');
                    res.writeHead(200, {
                        'content-type': 'text/html'
                    });
             
                    db.push(movieBody); 
                    console.log(db);                  
                    res.write(data);
                    res.end();
                });
            } else {
                fs.readFile('./views/addMovie.html', (err, data) => {
                    if(err) {
                        console.log(err.message);
                        return;
                    }

                    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>');
                    res.writeHead(200, {
                        'content-type': 'text/html'
                    });

                    res.write(data);
                    res.end();
                });
            }
        });
    } else {
        return true;
    }
}

module.exports = addMovieHandler;