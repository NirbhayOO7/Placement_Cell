const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');

router.get('/', homeController.home);

router.use('/employee', require('./employee'));
router.use('/student', require('./student'));
router.use('/interview', require('./interview'));

module.exports = router;