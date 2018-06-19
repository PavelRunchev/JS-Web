const fs = require('fs');
const movies = require('../config/dataBase');
const queryString = require('querystring');

module.exports = (req, res) => {

    if(req.path === '/viewAllMovies' && req.method === 'GET') {
        //sort films by years
        movies.sort((a, b) => {
            let year = Number(b.movieYear) - Number(a.movieYear);
            if(year === 0) {
                return a.movieTitle.localeCompare(b.movieTitle);
            }

            return year;
        });   
        console.dir(movies);    
        const placeholder = '{{replaceMe}}';        
        let img = [];
        let index;
        let movieTemplate = ` <div class="movie">
                            <a href="/viewAllMovies/details/"><img class="moviePoster" src="${placeholder}"/></a>
                        </div>`;
        const replaceMe = '<div id="replaceMe">{{replaceMe}}</div>';
        
        
        for (let index = 0; index < movies.length; index++) {
            movieTemplate =  `<div class="movie">
            <a href="/viewAllMovies/details/${index}"><img class="moviePoster" src="${placeholder}"/></a>
        </div>`;
            movieTemplate = movieTemplate.replace(placeholder, decodeURIComponent(movies[index].moviePoster));  
            img.push(movieTemplate);   
        }
        
        fs.readFile('./views/viewAll.html', 'utf8', (err, data) => {
            if(err) {
                console.log(err.message);
                return;
            }
            res.writeHead(200, {
                'content-type': 'text/html'
            });
         
            //replace viewAll.html with all images in current HTML
            data = data.toString().replace(replaceMe, img);
            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
};