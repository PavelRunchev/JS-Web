const mongodb = require('mongodb');

let connection = 'mongodb://localhost:27017/db';

mongodb
    .MongoClient
    .connect(connection)
    .then(client => {
        //the name of base!!!
        let db = client.db('db');
        //the name of the collection that we want to write
        let cars = db.collection('cars');

       
        //insert object in collection
        /*
        cars.insert({
            model: 'Ferrari',
            color: 'red',
            buy: '500 000$'
        });
        */
        cars.find({}).toArray((err, cars) => {
            cars.forEach(obj => console.log(obj));
        });
    
        
    });