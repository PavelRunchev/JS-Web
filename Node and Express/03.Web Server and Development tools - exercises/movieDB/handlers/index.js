const staticHandler = require('./staticHandler');
const homeHandler = require('./homeHandler');
const errorHandler = require('./errorHandler');
const addMovieHandler = require('./addMovieHandler');
const moviesHandler = require('./movieHandler');
const detailsHandler = require('./detailsHandler');
const statusHandler = require('./statusHandler');

module.exports = [
    statusHandler,
    staticHandler,
    homeHandler, 
    addMovieHandler,
    moviesHandler,
    detailsHandler,
    errorHandler
];