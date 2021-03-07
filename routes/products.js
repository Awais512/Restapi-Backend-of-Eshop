const { Product } = require('../models/product');
const express = require('express');
const { createProduct } = require('../controllers/productController');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

router.post(`/`, createProduct);

module.exports = router;
