const staticHandler = require('./static');
const aboutHandler = require('./about');
const errorHandler = require('./error');
const homeHandler = require('./home');
const messageHandler = require('./message');
const bigfileHandler = require('./bigfile');

module.exports = [
    staticHandler,
    aboutHandler,
    homeHandler,
    messageHandler,
    bigfileHandler,
    errorHandler
];