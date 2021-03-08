const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');

router.route('/').post(register);
module.exports = router;
