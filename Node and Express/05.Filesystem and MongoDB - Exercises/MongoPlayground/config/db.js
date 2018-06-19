const mongoose = require('mongoose');

//override mongoose Promise with global Promise(Node.js), which useing in all applications
mongoose.Promise = global.Promise;

require('../models/ImageSchema');
require('../models/TagSchema');

const connectionString = 'mongodb://localhost:27017/mongoplayground';

module.exports = mongoose.connect(connectionString);