const { Category } = require('../models/category');
const express = require('express');
const {
  createCategory,
  getCategories,
  deleteCategory,
  getCategory,
  updateCategory,
} = require('../controllers/categoriesController');
const router = express.Router();

router.route(`/`).post(createCategory).get(getCategories);
router
  .route(`/:id`)
  .delete(deleteCategory)
  .get(getCategory)
  .put(updateCategory);

module.exports = router;
