const fs = require('fs');
const Image = require('mongoose').model('Image');
const Tag = require('mongoose').model('Tag');

module.exports = (req, res) => {
    if (req.pathname === '/search') {
        fs.readFile('./views/results.html', 'utf8', (err, html) => {
            if(err) {
                console.log(err);
                return;
            }

            let limit = 0;
            let params = {};
            if(req.pathquery.tagName) {
                
                let tags = req.pathquery.tagName
                    .split(',')
                    .filter(e => e.length > 0);
                if(tags.length > 0) {
                    Tag.find({name: { $in: tags}}).then(findedObj => {

                        params.tags = findedObj.map(m => m._id);
                       
                    });
                } 
            } 

           
            Image.find(params).then(data => {
                data.sort((a, b) => b.createDate - a.createDate);
                if(req.pathquery.Limit !== '') {
                    limit = req.pathquery.Limit;   
                    data = data.splice(0, limit);
                }
                let imageHtml = '';
                for(let image of data) {
                    imageHtml += imageTemplate(image);
                }
            
                html = html.replace('<div class=\'replaceMe\'></div>', imageHtml);
                res.writeHead(200, {
                    'content-type': 'text/html'
                });
                res.write(html);
                res.end();
            });
            
        });        
    } else {
        return true;
    }
};



function imageTemplate(image) {
    return  `
    <fieldset id="${image._id}"> <legend>${image.title}:</legend> 
        <img src="${image.url}"></img>
        <p>${image.description}<p/>  
        <button onclick='location.href="/delete?id=${image._id}"'class='deleteBtn'>Delete</button>   
    </fieldset>`;  
}
