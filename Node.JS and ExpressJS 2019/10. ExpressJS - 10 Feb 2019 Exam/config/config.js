module.exports = {
    development: {
        port: process.env.PORT || 27017,
        dbPath: 'mongodb+srv://abobo:123@db-fcmym.mongodb.net/Project-manager-db?retryWrites=true&w=majority'
    },
    production: {}
};