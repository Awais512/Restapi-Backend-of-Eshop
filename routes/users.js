const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  getUserCount,
} = require('../controllers/userController');

router.route('/').get(getUsers);
router.route('/:id').get(getUser);
router.route('/get/count').get(getUserCount);
module.exports = router;
