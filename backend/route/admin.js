const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/login', adminController.login);
router.post('/register', adminController.register);
// TEMP: Delete all admins
router.delete('/delete-all', adminController.deleteAllAdmins);
// TEMP: Force create default admin
router.post('/force-create-default', adminController.forceCreateDefaultAdmin);

module.exports = router; 