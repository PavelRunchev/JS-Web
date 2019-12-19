module.exports = {
    development: {
        port: process.env.PORT || 3000,
        // MongoDB Atlas
        //dbPath: 'mongodb+srv://abobo:123@db-fcmym.mongodb.net/Blogger-DB?retryWrites=true&w=majority'

        // Local database 
        dbPath: 'mongodb://localhost:27017/VideoTutorial-db'
    },
    production: { }
};