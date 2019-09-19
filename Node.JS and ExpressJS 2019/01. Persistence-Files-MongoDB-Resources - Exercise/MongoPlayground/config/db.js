const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/mongoplayground';

module.exports = mongoose.connect(connectionString);
