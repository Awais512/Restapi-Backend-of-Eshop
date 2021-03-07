const { Category } = require('../models/category');
const express = require('express');
const {
  createCategory,
  getCategories,
  deleteCategory,
} = require('../controllers/categoriesController');
const router = express.Router();

router.route(`/`).post(createCategory).get(getCategories);
router.route(`/:id`).delete(deleteCategory);

module.exports = router;
