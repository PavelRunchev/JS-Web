const formidable = require('formidable');
const Tag = require('mongoose').model('Tag');
const util = require('util');

module.exports = (req, res) => {
    if (req.pathname === '/generateTag' && req.method === 'POST') {
        const form = formidable.IncomingForm();
       
        form.parse(req, function(err, fields, files) {
            res.writeHead(200, {
                'content-type': 'text/plain'
            });

            if(fields.tagName === '') {
                console.log('Tag name is not be empty!');
                return;
            }
            const name = fields.tagName;
            Tag.create ({
                name: name,
                images: []
            }).then(tag => {
                res.writeHead(302, {
                    location: '/'
                });
                res.end();
            }).catch(err => {
                res.writeHead(500, {
                    'content-type': 'text/plain'
                });
                res.write('500 Server Error');
                res.end();
            });
        });
    } else {
        return true;
    }
};
