const fs = require('fs');
let data = {};

let put = (key, value)=> {
    if(typeof(key) !== 'string') {
        throw new Error('The key must be a string => ' + key);
    }

    if(data.hasOwnProperty(key)) {
        throw new Error('The key already exists!');
    }

    data[key] = value;
};

let get = (key) => {
    if(typeof(key) !== 'string') {
        throw new Error('The key must be a string => ' + key);
    }

    if(!data.hasOwnProperty(key)) {
        throw new Error('The key not be exists!');
    }

    return data[key];
};

let getAll = () => {
    for (let key in data) {
        return data;
    }
   
    return 'Storage is empty!';
};

let update = (key, newValue) => {
    if(typeof(key) !== 'string') {
        throw new Error('The key must be a string!');
    }

    if(!data.hasOwnProperty(key)) {
        throw new Error('The key not be exists');
    }

    data[key] = newValue;
};

let remove = (key) => {
    if(typeof(key) !== 'string') {
        throw new Error('The key must be a string => ' + key);
    }

    if(!data.hasOwnProperty(key)) {
        throw new Error('The key not be exists!');
    }

    delete data[key];
};

let clear = () => {
    data = {};
};

let load = () => {
    try {
        data = JSON.parse(fs.readFileSync('./storage.json', 'utf8'));
    } catch (err) {
        console.log(err.message);
    }
};

let save = () => {
    fs.writeFileSync('./storage.json', JSON.stringify(data), 'utf8');
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