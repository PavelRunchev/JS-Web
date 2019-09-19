module.exports = {
    isAuthed: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/user/login');
        }
    },
    hasRole: (req, res, next) => {
        if (req.isAuthenticated() &&
            req.user.roles.includes('Admin')) {
            next();
        } else {
            res.redirect('/user/login');
        }
    },
    isAnonymous: (req, res, next) => {
        if (!req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/');
        }
    }
};