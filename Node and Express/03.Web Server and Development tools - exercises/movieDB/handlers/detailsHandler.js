const fs = require('fs');
const qs = require('querystring');
const db = require('../config/dataBase');


function detailsHandler(req, res) {
    
    if(req.path.startsWith('/viewAllMovies/details/') && req.method === 'GET') {
        let index = req.path.substr(req.path.lastIndexOf('/') + 1);
        
        if(index !== undefined) {
            let currentMovie = db[index];
            const detailsYear = currentMovie.movieYear;
            //decode img (movie.poster)
            const detailsImg = decodeURIComponent(currentMovie.moviePoster);
            let detailsTitle = currentMovie.movieTitle.toString()
                .replace(/[+%3.^$-&?]/g, ' ');
            const detailsDescription = currentMovie.movieDescription.toString()
                .replace(/[+%3.^$-&?]/g, ' ');
    
            const detailsTemplate = `
                <div class="content">
                    <img src="${detailsImg}"/>
                    <h3>Title:  ${detailsTitle}</h3>
                    <h3>Year: ${detailsYear}</h3>
                    <p> ${detailsDescription}</p>
                 </div>​`;
            fs.readFile('./views/details.html', 'utf8', (err, data) => {
                if(err) {
                    console.log(err.message);
                    return;
                }
                res.writeHead(200, {
                    'content-type': 'text/html'
                });
    
                data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', detailsTemplate);
                res.write(data);
                res.end();
            });
        }
       
    } else {
        return true;
    }
}

module.exports = detailsHandler;