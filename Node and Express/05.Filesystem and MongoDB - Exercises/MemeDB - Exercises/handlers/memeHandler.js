const fs = require('fs');
const db = require('./../config/dataBase');
const qs = require('querystring');
const url = require('url');
const formidable = require('formidable');
const shortid = require('shortid');
const util = require('util');


let memeGenerator = (id, title, memeSrc, description, privacy) => {
    return {
        id: id,
        title: title,
        memeSrc: memeSrc,
        description: description,
        privacy: privacy,
        dateStamp: Date.now()
    };
};

let viewAll = (req, res) => {
    let memes = db.getDb();

    fs.readFile('./views/viewAll.html', 'utf8', (err, data) => {
        if(err) {
            console.log(err.message);
            return;
        }

        //sort by dateStamp(date)
        memes.sort((a, b) => {
            return b.dateStamp - a.dateStamp;
        });

        //filter memes by property (privacy= on)
        memes = memes.filter(m => m.privacy === 'on');

        let memeString = '';
        for (const meme of memes) {
            memeString += `<div class="meme">
            <a href="/getDetails?id=${meme.id}">
            <img class="memePoster" src="${meme.memeSrc}"/>          
        </div>`;
        }

        res.writeHead(200, {
            'content-type': 'text/html'
        });
        data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', memeString);
        res.write(data);
        res.end();
    });

};

let viewAddMeme = (req, res) => {
    fs.readFile('./views/addMeme.html', 'utf8', (err, data) => {
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
};

let addMeme = (req, res) => {
    let form = new formidable.IncomingForm();
    let fileName = shortid.generate();
    let dbLength = Math.ceil(db.getDb().length / 10);
    let newPath = `./public/memeStorage/${dbLength}/${fileName}.jpg`;

    //save file in directory
    form.on('error', (err) => {
        console.log(err.message);
        return;
    }).on('fileBegin', (name, file) => {
        //check directory  for exist
        fs.access(`./public/memeStorage/${dbLength}`, err => {
            if(err) {
                //no directory -> is created
                fs.mkdirSync(`./public/memeStorage/${dbLength}`);
            }
        });
        file.path = newPath;
    });

    form.parse(req, function(err, fields, files) {
        let id = shortid.generate();
        let createMeme = memeGenerator(id, fields.memeTitle, newPath, fields.memeDescription, fields.status);
        
        //check for empty fields
        if(fields.memeTitle === '' || files.meme.size === 0 || fields.memeDescription === '') {
            fs.readFile('./views/addMeme.html', (err, data) => {
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
        }else{
            fs.readFile('./views/addMeme.html', (err, data) => {
                if(err) {
                    console.log(err.message);
                    return;
                }         
                let createMeme = memeGenerator(id, fields.memeTitle, newPath, fields.memeDescription, fields.status);
                
                db.add(createMeme);
                db.save();
                data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', '<div id="succssesBox"><h2 id="succssesMsg">Meme Added</h2></div>');
                res.writeHead(200, {
                    'content-type': 'text/html'
                });
                             
                res.write(data);
                res.end();
            });
        }
    });
};

let getDetails = (req, res) => {
    //get id on clicked meme
    let queryPath = url.parse(req.url).query;
    //qs parse with regex queryPath and return Id
    let targeteId = qs.parse(queryPath).id; 
    //find and return meme with targetId
    let targetedMeme = db.getDb().find(m => {
        return m.id === targeteId;
    });
    
    fs.readFile('./views/details.html', 'utf8', (err, data) => {
        if(err) {
            console.log(err.message);
            return;
        }

        res.writeHead(200, {
            'content-type': 'text/html'
        });

        let details = `<div class="content">
        <img src="${targetedMeme.memeSrc}" alt=""/>   
        <h3>Title  ${targetedMeme.title}</h3>   
        <p> ${targetedMeme.description}</p>    
        <button><a href="${targetedMeme.memeSrc}" download="${targetedMeme.id}.jpg">Download Meme</a></button>    
        </div>`;

        data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', details);
        res.write(data);
        res.end();
    });
};

module.exports = (req, res) => {
    if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
        viewAll(req, res);
    } else if (req.pathname === '/addMeme' && req.method === 'GET') {
        viewAddMeme(req, res);
    } else if (req.pathname === '/addMeme' && req.method === 'POST') {
        addMeme(req, res);
    } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
        getDetails(req, res);
    } else {
        return true;
    }
};
