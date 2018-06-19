const fs = require('fs');
let storage = {};

let put = (key, value) => { 
    if(typeof(key) !== 'string') {
        throw new Error('The key must be a string => ' + key);
    }

    if(storage[key]) {
        throw new Error('The key already exists!');
    }

    storage[key] = value;
};

let get = (key) => {
    if(typeof(key) !== 'string') {
        throw new Error('The key must be a string => ' + key);
    }

    if(!storage[key]) {
        throw new Error('The key not be exists!');
    }

    return storage[key];
};

let getAll = () => {
    for (let key in storage) {
        return storage;
    }
   
    return 'Storage is empty!';
};

let update = (key, newValue) => {
    if(typeof(key) !== 'string') {
        throw new Error('The key must be a string!');
    }

    if(!storage[key]) {
        throw new Error('The key not be exists');
    }

    storage[key] = newValue;
};

let remove = (key) => {
    if(typeof(key) !== 'string') {
        throw new Error('The key must be a string => ' + key);
    }

    if(!storage.hasOwnProperty(key)) {
        throw new Error('The key not be exists!');
    }

    delete storage[key];
};

let clear = () => {
    storage = {};
};

let load = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./storage.json', (err, data) => {
            storage = JSON.parse(data);
            resolve();
        });
    });

};


let save = () => {
    return new Promise((resolve, reject) => {
        let savedData = JSON.stringify(storage);
        fs.writeFile('./storage.json', savedData, err => {
            if(err) {
                console.log(err.message);
                return;
            }

            resolve;
        });
    });
};

module.exports = {
    put: put,
    get: get,
    getAll: getAll,
    update: update,
    delete: remove,
    clear: clear,
    save: save,
    load: load
};