module.exports = {
    development: {
        port: process.env.PORT || 27017,
        // base connect to Mongo Atlas!!!
        // change user, pass, nameDb!!!
        dbPath: 'mongodb+srv://abobo:123@db-fcmym.mongodb.net/Doner-place-db?retryWrites=true&w=majority'
    },
    production: {}
};