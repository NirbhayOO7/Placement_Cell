const express = require('express');
const router = express.Router();
const passport = require('passport');
const downloadController = require('../controller/dowload_controller');

router.get('/csv', passport.checkAuthentication, downloadController.download);

module.exports = router;