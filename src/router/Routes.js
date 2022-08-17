const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.getAll);
router.post('/user', UserController.create);
router.put('/user', UserController.updateUser);

module.exports = router;