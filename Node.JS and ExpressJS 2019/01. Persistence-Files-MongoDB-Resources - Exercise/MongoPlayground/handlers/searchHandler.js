const fs = require('fs');
const Image = require('mongoose').model('Image');
const Tag = require('mongoose').model('Tag');


module.exports = (req, res) => {
  if (req.pathname === '/search') {
    fs.readFile('./views/results.html', 'utf8', (err, html) => {
        if(err) {
          console.log(err.message);
          res.end();
          return;
        }

        let objTag = {};
        let tags = req.pathquery.tagName.split(',').filter(t => t !== "");
        if(req.pathquery.tagName !== 'Write tags separted by ,' && tags.length > 0) {
          Tag
            .find({name: { $in: tags}})
            .then(findByTag => {
              objTag.tags  = findByTag.map(m => m._id);
          }).catch(err => console.log(err.message));
        }

        Image.find({}).then(data => {
          //search by tagName
          if(objTag.tags !== undefined) {
              let arrImages = [];
              for (let img of data) {
                for (let id of objTag.tags) {
                    if(img.tags.includes(id))
                      arrImages.push(img);
                }
              }

              data = arrImages;
          }

          //search by Date
          let after = req.pathquery.afterDate;
          let before = req.pathquery.beforeDate;

          if(after.length !== 0) {
            data = data.filter(i => Number(new Date(after)) - Number(i.creationDate) < 0);
          }

          if(before.length !== 0) {
            data = data.filter(i => Number(new Date(before)) - Number(i.creationDate) > 0);
          }
          
          //search by Limit
          if(req.pathquery.Limit !== '')
              data = data.splice(0, Number(req.pathquery.Limit));
          else
              data = data.splice(0, 10);
        
          let imageHtml = '';
          for(let image of data) {
              imageHtml += imageTemplate(image);
          }
      
          html = html.replace('<div class=\'replaceMe\'></div>', imageHtml);
          res.writeHead(200, {'content-type': 'text/html'});
          res.write(html);
          res.end();
      }).catch(err => console.log(err.message));
    })
  } else {
    return true
  }
};

function imageTemplate(image) {
  return  `
  <fieldset id="${image._id}"> <legend>${image.title}:</legend> 
      <img src="${image.url}"></img>
      <p>${image.description}<p/>  
      <button onclick='location.href="/delete?id=${image._id}" 'class='deleteBtn'>Delete</button>   
  </fieldset>`;  
}
