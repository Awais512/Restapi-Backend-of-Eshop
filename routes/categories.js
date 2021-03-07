const { Category } = require('../models/category');
const express = require('express');
const {
  createCategory,
  getCategories,
  deleteCategory,
  getCategory,
} = require('../controllers/categoriesController');
const router = express.Router();

router.route(`/`).post(createCategory).get(getCategories);
router.route(`/:id`).delete(deleteCategory).get(getCategory);

module.exports = router;
