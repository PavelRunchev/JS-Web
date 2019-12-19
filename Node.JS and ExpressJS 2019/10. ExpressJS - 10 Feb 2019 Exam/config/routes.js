const controllers = require('../controllers');

// import sub module router!!!
const routers = require('../routers');

module.exports = app => {
    app.use('/', routers.home);
    app.use('/home', routers.home);
    app.use('/user', routers.user);
    app.use('/team', routers.team);
    app.use('/project', routers.project);

    // Page Not Found 404
    app.all('*', controllers.home.pageNotFound);
};