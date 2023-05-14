const express = require('express');
const passport = require('passport');
const router = express.Router();
const employeeController = require('../controller/employee_controller');

router.post('/create', employeeController.create);
router.get('/sign-in', employeeController.signin);
router.get('/sign-up', employeeController.signup);
router.post(
    '/create-session',
    passport.authenticate(
        'local',
        {failureRedirect: '/employee/sign-in'}
    ),
    employeeController.createSession);
    
router.get('/sign-out', employeeController.destroySession);

module.exports = router;