const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const ProjectController = require('../controllers/ProjectController');
const TechnologyController = require('../controllers/TechnologyController');
const HourWorkedController = require('../controllers/HourWorkedController');
const AdminAuth = require('../middleware/LoginAuthenticate');
const RecoverPasswordController = require('../controllers/RecoverPasswordController');

router.get('/', UserController.getAll);
router.post('/user', UserController.create);
router.put('/user', AdminAuth, UserController.updateUser);
router.post('/project', AdminAuth, ProjectController.create);
router.get('/project', AdminAuth, ProjectController.getProjectByIdUser);
router.put('/finished', AdminAuth, ProjectController.setFinished);
router.post('/technology', AdminAuth, TechnologyController.create);
router.get('/technology', AdminAuth, TechnologyController.getTechnologyByProject);
router.delete('/technology', AdminAuth, TechnologyController.remove);
router.post('/hourworked', AdminAuth, HourWorkedController.create);
router.get('/hourworked', AdminAuth, HourWorkedController.getHourWorkedByIdProject);
router.get('/totalhourworked', AdminAuth, HourWorkedController.getTotalHoursWorked);
router.put('/valuetotal', AdminAuth, ProjectController.updateValueTotal);
router.post('/login', UserController.login);
router.post('/recoverPass', RecoverPasswordController.createrecover);
router.put('/updatePass', RecoverPasswordController.recoverPassword);

module.exports = router;