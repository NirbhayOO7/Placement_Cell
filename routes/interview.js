const express = require('express');
const router = express.Router();
const interviewController = require('../controller/interview_controller');
const passport = require('passport');

router.get('/', passport.checkAuthentication, interviewController.home);
router.post('/create', passport.checkAuthentication, interviewController.create);
router.post('/add-student/:id', passport.checkAuthentication, interviewController.addStudent);
router.get('/delete/:id', passport.checkAuthentication, interviewController.delete);

module.exports = router;