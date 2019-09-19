const Image = require('mongoose').model('Image');
const formidable = require('formidable');
const ObjectId = require('mongoose').Types.ObjectId;
const Tag = require('mongoose').model('Tag');

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res);
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res);
  } else {
    return true
  }
};

function addImage(req, res) {
  const form = formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
      if(err) throw Error(err.message);

      if(fields.imageUrl === '' || fields.imageTitle === '' 
      || fields.description === '' || fields.tags === '') {
        console.log('Tag name is not be empty!');
        res.writeHead(302, { location: '/' });
        res.end();
        return;
      }

      //filtred unique tagId with reduce
      let tags = fields.tagsID.split(',');
      tags.pop();
      delete fields.tagsID;

      const image = {
          url: fields.imageUrl,
          title: fields.imageTitle,
          description: fields.description,
          tags: tags
      };
      
      Image.create(image).then(img => {
          let targetTag = img.tags;
  
          Tag
            .update({_id: {$in: targetTag}}, { $push: { images: img.id}}, {multi:true})
            .then(re => {
                  console.log(re);
            })
            .catch(err => console.log(err.message));

          res.writeHead(302, { location: '/' });
          res.end();
      });
  });
}

function deleteImg(req, res) {
  Image
    .deleteOne({_id: req.pathquery.id})
    .then(() => {
      res.writeHead(302, { location: '/' });
      res.end();
    }).catch(err => {
      res.writeHead(500, { 'content-type': 'text/plain' });
      res.write('500 Server Error');
      res.end();
    });
}