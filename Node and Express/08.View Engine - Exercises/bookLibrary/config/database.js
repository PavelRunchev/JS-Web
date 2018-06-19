const mongoose = require('mongoose');
const databaseName = 'mongodb://localhost:27017/bookLibrary';
mongoose.Promise = global.Promise;

module.exports = mongoose.connect(databaseName, (err) => {
    if(err) {
        console.log(err.message);
        return;
    }
    
    console.log('MongoDb is running...');
});



