const path = require('path');

module.exports = {
    development: {
        connectionString: 'mongodb+srv://abobo:123@db-fcmym.mongodb.net/shop-stop-db?retryWrites=true&w=majority',
        rootPath: path.normalize(path.join(__dirname, '../'))
    },
    production: {}
};