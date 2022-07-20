
const { Router } = require('express');
const express = require('express');
const changePassword = require('../reset_password/emailer');
const router = express.Router();

router.get('/reset', changePassword.leon);
module.exports = router;