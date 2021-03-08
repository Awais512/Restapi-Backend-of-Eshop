const { Product } = require('../models/product');
const express = require('express');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductCount,
  getFeaturedProduct,
} = require('../controllers/productController');
const router = express.Router();

router.route(`/`).get(getProducts).post(createProduct);

router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);
router.get('/get/count', getProductCount);
router.get('/get/featured/:count', getFeaturedProduct);

module.exports = router;
