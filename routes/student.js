const express = require('express');
const router = express.Router();
const passport = require('passport');
const studentController = require('../controller/student_controller');

router.get('/', passport.checkAuthentication, studentController.home);

module.exports = router;