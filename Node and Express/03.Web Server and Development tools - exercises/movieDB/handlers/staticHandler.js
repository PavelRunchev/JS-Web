const fs = require('fs');

const allowStaticTypes = {
    'html': 'text/html',
    'js': 'application/javascript',
    'css': 'text/css',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'ico': 'image/x-icon'
};

function staticHandler(req, res) {
    if(req.path.startsWith('/views/') 
    || req.path.startsWith('/public/')) {
        const extension = req.path.split('.').pop();
        res.writeHead(200, {
            'content-type': allowStaticTypes[extension]
        });

        const reading = fs.createReadStream('.' + req.path);
        reading.pipe(res);
    } else {
        return true;
    }
}

module.exports = staticHandler;