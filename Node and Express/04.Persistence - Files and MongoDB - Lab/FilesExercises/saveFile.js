//write file with Sync
function writefile(obj) {
    const fs = require('fs');
    let pathfile = './db.js';
    let objToJSON = JSON.stringify(obj);
    let savedata = `let db = ${objToJSON};\nmodule.export = db;`;
    fs.writeFile(pathfile ,savedata ,err => {
        if(err) {
            console.log(err.message);
        }

        console.log('file saved with name: db.js');
        fs.readFile('./db.js', 'utf8', (err, readData) => {
            if(err) {
                console.log(err.message);
                return;
            }

            console.log('reading file with name db.js');
            console.log(readData);
            fs.unlink('./db.js', err => {
                if(err) {
                    console.log(err.message);
                }
        
                console.log('file db.js deleted!');
                fs.readdir('../FileExercises', 'utf8', (err, data) => {
                    if(err) {
                        console.log(err);
                        return;
                    }

                    console.log(`In directory has this files => "${data}"`);
                    console.log(`All files in directory is: ${data.length}`);
                });
            });
        });
    });
}

module.exports = writefile;