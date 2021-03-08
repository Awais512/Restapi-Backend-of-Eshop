const { Product } = require('../models/product');
const { Category } = require('../models/category');
const mongoose = require('mongoose');

//@desc     Create Product
//@route    POST /api/v1/products
//@access   PRIVATE

exports.createProduct = async (req, res) => {
  try {
    let category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category');
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    });

    product = await product.save();

    if (!product) {
      return res.status(400).send('PProduct can not be created');
    }
    res.status(201).send(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
};

//@desc     Get all Products
//@route    GET /api/v1/products
//@access   PUBLIC

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('category');
    if (products.length === 0) {
      return res
        .status(400)
        .send('Currently we do not have products in our database');
    }

    res.status(200).json({ count: products.length, data: products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
};

//@desc     Get Single Products
//@route    GET /api/v1/products/:id
//@access   PUBLIC

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(400).send('Product does not exist');
    }

    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
};

//@desc     Update Product
//@route    PUT /api/v1/products/:id
//@access   PRIVATE
exports.updateProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send('Invalid product id');
    }
    let category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category');
    let product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
      },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ msg: 'Product does not exist' });
    }

    res.status(200).send(product);
  } catch (err) {
    res.status(500).json({ success: false, error: err });
    console.log(err);
  }
};

//@desc     Delete  Product
//@route    DELETE /api/v1/products/:id
//@access   PRIVATE
exports.deleteProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send('Invalid product id');
    }
    let product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product does not exist' });
    }

    res.status(200).json({ success: true, msg: 'Product deleted!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
    console.log(err);
  }
};

//@desc     Get Count of Products
//@route    GET /api/v1/products/get/count
//@access   PUBLIC

exports.getProductCount = async (req, res) => {
  try {
    const productCount = await Product.countDocuments((count) => count);
    if (!productCount) {
      return res.status(400).send('Product does not exist');
    }

    res.status(200).json({ count: productCount });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
};

//@desc     Get feature Products
//@route    GET /api/v1/products/get/featured
//@access   PUBLIC

exports.getFeaturedProduct = async (req, res) => {
  try {
    const count = req.params.count ? req.params.count : 0;
    const featuredProducts = await Product.find({ isFeatured: true }).limit(
      +count
    );
    if (!featuredProducts) {
      return res.status(400).send('Product does not exist');
    }

    res.status(200).send(featuredProducts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
};
