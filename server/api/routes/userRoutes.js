const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUser);
router.put('/', userController.updateUser);
router.put('/change-password', userController.changePassword);

module.exports = router;
