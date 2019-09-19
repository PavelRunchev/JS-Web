const formidable = require('formidable');
const Tag = require('mongoose').model('Tag');
const util = require('util');

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      if(fields.tagName === '') {
          console.log('Tag name is not be empty!');
          res.writeHead(302, { location: '/' });
          res.end();
          return;
      }
      
      res.writeHead(200, { 'content-type': 'text/plain' });
      Tag.create ({
          name: fields.tagName,
          images: []
      }).then(tag => {
          res.writeHead(302, { location: '/' });
          res.end();
      }).catch(err => {
          res.writeHead(500, { 'content-type': 'text/plain' });
          res.write('500 Server Error!');
          res.end();
      });
    });
  } else {
    return true
  }
}
