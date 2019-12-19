const jwt = require('../util/jwt');
const { decryptCookie } = require('../util/encryptCookie');

module.exports = {
    isAuthed: async (req, res, next) => {
        const token = req.cookies['auth_cookie'] || '';
        const data = await jwt.verifyToken(token);
        if (data) { 
            next();
        } else {
            res.flash('danger', 'Invalid credentials! Unauthorized!');
            res.status(401).redirect('/user/login');
            return;
        }
    },

    isAdmin: async (req, res, next) => {
        const token = req.cookies['auth_cookie'] || '';
        const role = decryptCookie(req.cookies['_ro_le_']);
        const access = await jwt.verifyToken(token);
        // check id is valid!
        const authedUser = access !== undefined ? true : false;
        // check role is valid! (Admin or Moderator)
        const roleIsAdmin = role === 'Admin';
        // check in session Admin role is valid not expire!
        const sessionIsAdmin = res.locals.isAdmin === true;
            
        // all is true for role Admin!
        if (authedUser && roleIsAdmin && sessionIsAdmin) {
            next();
        } else {
            res.flash('danger', 'Invalid credentials! Unauthorized!');
            res.redirect('/user/login');
            return;
        }
    },
};