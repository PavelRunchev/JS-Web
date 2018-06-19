const home = require('./home-controller');
const user = require('./user-controller');
const admin = require('./admin-controller');
const details = require('./details-controller');
const edit = require('./edit-controller');

module.exports = {
    admin,
    home,
    details,
    user,
    edit
};