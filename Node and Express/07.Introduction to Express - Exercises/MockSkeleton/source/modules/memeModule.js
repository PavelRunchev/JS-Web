const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');
const tagDb = require('../config/tagDb');
const db = require('../config/dataBase');

const router = require('express').Router();
const shortid = require('shortid');

const memeService = require('../services/memeService');
const genreService = require('../services/genreService');
const memeTemplates = require('../infrastructure/memeTemplates');
const uiTemplates = require('../infrastructure/uiTemplates');
const placeholder = '<div id="replaceMe">{{replaceMe}}</div>';

let memeGenerator = (title, memeSrc, description, privacy, genreId) => {
    return {
        title: title,
        memeSrc: memeSrc,
        description: description,
        privacy: privacy,
        dateStamp: Date.now(),
        genreId: genreId
    };
};

let defaultResponse = (respString, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(respString);
};

let fieldChecker = obj => {
    for (let prop in obj) {
        if (obj[prop] === '') {
            return true;
        }
    }
};

let viewAll = (req, res) => {
    memeService
        .getAll()
        .then(data => {
            data = data.sort((a, b) => b.dateStamp - a.dateStamp);
            data = data.filter(meme => meme.privacy === 'on');

            let responseString = '';
            for (let meme of data) {
                responseString += memeTemplates.viewAll(meme._id, meme.memeSrc);
            }

            fs.readFile('./source/views/viewAll.html', (err, html) => {
                if (err) {
                    console.log(err);
                    return;
                }
                html = html
                    .toString()
                    .replace(placeholder, responseString);

                defaultResponse(html, res);
            });
        });
};

let viewAddMeme = (req, res, status = null) => {
    fs.readFile('./source/views/addMeme.html', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        genreService
            .getAll()
            .then(genres => {
                let exitString = '';
                for (let genre of genres) {
                    exitString += memeTemplates.genreOption(genre._id, genre.title);
                }

                if (status === 'err') {
                    data = data
                        .toString()
                        .replace(
                            placeholder,
                            uiTemplates.errorMessage()
                        );
                }
                if (status === 'suc') {
                    data = data
                        .toString()
                        .replace(
                            placeholder,
                            uiTemplates.successMessage()
                        );
                }
                defaultResponse(
                    data
                        .toString()
                        .replace('<div id="replaceMe">{{replaceMe2}}</div>', exitString),
                    res
                );
            });
    });
};

let getDetails = (req, res) => {
    let targetId = qs.parse(url.parse(req.url).query).id;
    memeService
        .get(targetId)
        .then(targetedMeme => {
            let replaceString = memeTemplates.details(
                targetedMeme.memeSrc, 
                targetedMeme.title, 
                targetedMeme.description,
                targetId);
        
            fs.readFile('./source/views/details.html', (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
        
                data = data
                    .toString()
                    .replace(placeholder, replaceString);
                defaultResponse(data, res);
            });
        })
        .catch(() => {
            res.end('Meme does not exist.');
        });
};

let addMeme = (req, res) => {
    let fileName = shortid.generate() + '.jpg';
    let fields = req.body;
    let files = req.files;

    if(req.body.memeTitle === '' || files.meme === undefined || req.body.memeDescription === '') {
        fs.readFile('./source/views/addMeme.html', (err, data) => {
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
    } else {
        memeService
            .getAll()
            .then(allMemes => {
                let dirName = `/public/memeStorage/${Math.ceil(allMemes.length / 10)}`;
                let relativeFilePath = dirName + '/' + fileName;
                let absoluteDirPath = path.join(__dirname, `../../${dirName}`);
                let absoluteFilePath = absoluteDirPath + '/' + fileName; 
        
                fs.access(absoluteDirPath, err => {
                    if (err) {
                        fs.mkdirSync(absoluteDirPath);
                    }
                
                    files.meme.mv(absoluteFilePath, err => {
                        if (err) {
                            console.log(err);
                            viewAddMeme(req, res, 'err');
                            return;
                        }

                        if (fieldChecker(fields)) {
                            viewAddMeme(req, res, 'err');
                        } else {
                            let memeForImport = memeGenerator(
                                fields.memeTitle,
                                relativeFilePath,
                                fields.memeDescription,
                                fields.status,
                                fields.genreSelect
                            );
        
                            memeService
                                .create(memeForImport)
                                .then(() =>  {
                                    viewAddMeme(req, res, 'suc');
                                })
                                .catch(() => { 
                                    viewAddMeme(req, res, 'err');
                                });
                        }
                    });
                });
            });
    }
};

let createGenreView = (req, res) => {
    fs.readFile('./source/views/addGenre.html', (err, data) => {
        if (err) {
            console.log(err);
        }
        defaultResponse(data, res);
    });
};

let removeMeme = (req, res) => {
    res.redirect('/');
};

let statusMeme = (req, res) => {
    fs.readFile('./source/views/status.html', (err, file) => {
        if (err) {
            console.log(err);
        }
        memeService
            .getAll()
            .then(data => {
                let privacyOn = data.filter(m => m.privacy === 'on');
                genreService.getAll().then(genres => {
                    let replacer = `<h1>All Genre is: ${genres.length}</h1>
                    <h2>All Memes is: ${data.length}<h2>
                    <h2>Memes is privacy on: ${privacyOn.length}</h2>`;
                    file = file.toString().replace('<h1>{{replaceMe}}</h1>', replacer);
                    res.write(file);
                    res.end();
                });        
            });
    });
    
};

let addGenre = (req, res) => {
    let title = req.body.genreTitle;

    if(title === '') {
        fs.readFile('./source/views/addGenre.html', (err, data) => {
            if(err) {
                console.log(err.message);
                return;
            }

            data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', '<div id="errBox"><h2 id="errMsg">Field not be empty!</h2></div>');
            res.writeHead(200, {
                'content-type': 'text/html'
            });

            res.write(data);
            res.end();
        });
    } else {
        let newGenre = {
            title: title,
            memes: []
        };
        genreService.create(newGenre).then(n => {
            fs.readFile('./source/views/addGenre.html', (err, data) => {
                if(err) {
                    console.log(err.message);
                    return;
                }
    
                data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', '<div id="succssesBox"><h2 id="errMsg">Genre is Added</h2></div>');
                res.writeHead(200, {
                    'content-type': 'text/html'
                });
    
                res.write(data);
                res.end();
            });
        });
    }
};

let getSearchMeme = (req, res) => {
    fs.readFile('./source/views/searchMeme.html', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        
        genreService
            .getAll()
            .then(genres => {
                let exitString = '<option value="all">all</option>';

                for (let genre of genres) {
                    exitString += `<option value="${genre.title}">${genre.title}</option>`;
                }

                data = data
                    .toString()
                    .replace('<div id="replaceMe">{{replaceMe}}</div>', exitString);
                defaultResponse(data, res);
            });
    });
};

let searchForMeme = (req, res) => {
    let title = req.body.memeTitle;
    
    let selectedGenre = req.body.genreSelect;
    let memesArr = [];

    if(title !== '' && selectedGenre === 'all') {
        let targetId = '';
        memeService.getAll().then(memes => {
            for (let meme of memes) {
                if(meme.title === title) {
                    targetId = meme.id;
                    break;
                }
            }

            if(targetId !== '') {
                searchMeme(targetId, res);
            }
        });
    } else if(selectedGenre !== 'all') {
        genreService.getAll().then(genres => {
            let targetId = '';
            let genreTitle = '';
            
            for (let genre of genres) {
                if(genre.title === selectedGenre) {
                    genreTitle = selectedGenre;
                    targetId = genre.id;
                    break;
                }
            }
    
            memeService.getAll().then(allMemes => {
                for (let meme of allMemes) {
                    if(meme.genreId === targetId) {
                        memesArr.push(meme);
                    }
                }
    
                memesArr = memesArr
                    .sort((a, b) => {
                        return b.dateStamp - a.dateStamp;
                    })
                    .filter(meme => {
                        return meme.privacy === 'on';
                    });

                viewSearch(memesArr, res);
            });
        });
    } else {
        memeService.getAll().then(memesAll => {
            viewSearch(memesAll, res);
        });
    }
};

function viewSearch (memesArr, res) {
    let responseString = '';
    for (let meme of memesArr) {
        responseString += `<div class="meme">
            <a href="/memes/getDetails?id=${meme.id}">
                <img class="memePoster" src="${meme.memeSrc}"/> 
            </a>         
        </div>`;
    }

    fs.readFile('./source/views/viewAll.html', (err, html) => {
        if (err) {
            console.log(err);
            return;
        }
        html = html
            .toString()
            .replace('<div id="replaceMe">{{replaceMe}}</div>', responseString);

        defaultResponse(html, res);
    });
}

function searchMeme (targetId, res) {
    memeService
        .get(targetId)
        .then(targetedMeme => {
            let replaceString = memeTemplates.details(
                targetedMeme.memeSrc, 
                targetedMeme.title, 
                targetedMeme.description,
                targetId);
        
            fs.readFile('./source/views/details.html', (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
        
                data = data
                    .toString()
                    .replace(placeholder, replaceString);
                defaultResponse(data, res);
            });
        })
        .catch(() => {
            res.end('Meme does not exist.');
        });
}

router
    .get('/viewAllMemes', (req, res) => viewAll(req, res))
    .get('/addMeme', (req, res) => viewAddMeme(req, res))
    .post('/addMeme', (req, res) => addMeme(req, res))
    .get('/getDetails', (req, res) => getDetails(req, res))
    .get('/addGenre', (req, res) => createGenreView(req, res))
    .get('/statusMeme', (req, res) => statusMeme(req, res))
    .post('/addGenre', (req, res) => addGenre(req, res))
    .get('/searchMemes', (req, res) => getSearchMeme(req, res))
    .post('/searchMemes', (req, res) => searchForMeme(req, res));
    

module.exports = router;