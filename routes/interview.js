const express = require('express');
const router = express.Router();
const interviewController = require('../controller/interview_controller');
const passport = require('passport');

router.get('/', passport.checkAuthentication, interviewController.home);


module.exports = router;