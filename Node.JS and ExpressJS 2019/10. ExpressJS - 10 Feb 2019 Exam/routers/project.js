const controllers = require('../controllers');
const router = require('express').Router();
const auth = require('../config/auth');
const { body } = require('express-validator');

router.get('/project-create', auth.isAdmin, controllers.project.projectCreateGet);
   
router.post('/project-create', [
    body('projectName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Project name is required!'),
    body('description')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Description is required!')
    .isLength({ max: 50 })
    .withMessage('Description should be max length 50 characters!')
], auth.isAdmin, controllers.project.projectCreatePost);

router.get('/projects-admin', auth.isAdmin, controllers.project.projectsAdminGet);
router.post('/projects-admin', auth.isAdmin, controllers.project.projectsAdminPost);

router.get('/projects', auth.isAuthed, controllers.project.projectsGet);

router.post('/project-search', auth.isAuthed, controllers.project.projectSearch);

module.exports = router;