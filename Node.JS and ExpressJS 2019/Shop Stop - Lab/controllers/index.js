const home = require('./home-controllers');
const files = require('./static-files');
const product = require('./product-controllers');
const category = require('./category-controllers');
const user = require('./user-controllers');

module.exports = {
    home,
    product,
    category,
    files,
    user
};