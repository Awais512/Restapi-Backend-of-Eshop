const { Product } = require('../models/product');
const express = require('express');
const {
  createProduct,
  getProducts,
  getProduct,
} = require('../controllers/productController');
const router = express.Router();

router.route(`/`).get(getProducts).post(createProduct);

router.route('/:id').get(getProduct);

module.exports = router;
