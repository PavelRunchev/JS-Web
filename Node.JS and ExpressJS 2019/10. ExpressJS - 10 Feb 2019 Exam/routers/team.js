const controllers = require('../controllers');
const router = require('express').Router();
const auth = require('../config/auth');
const { body } = require('express-validator');

router.get('/team-create', auth.isAdmin, controllers.team.teamCreateGet);
router.post('/team-create', [
    body('teamName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Team name is required!')
], auth.isAdmin, controllers.team.teamCreatePost);

router.get('/teams-admin', auth.isAdmin, controllers.team.teamsAdminGet);
router.post('/teams-admin', auth.isAdmin, controllers.team.teamsAdminPost);

router.get('/teams', auth.isAuthed, controllers.team.teamsGet);

router.post('/teams-search', auth.isAuthed, controllers.team.teamsSearch);

module.exports = router;