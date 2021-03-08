const { Product } = require('../models/product');
const { Category } = require('../models/category');

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
  } catch (error) {
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
  } catch (error) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
};

//@desc     Update Product
//@route    PUT /api/v1/products/:id
//@access   PRIVATE
exports.updateProduct = async (req, res) => {
  try {
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
    console.log(error);
  }
};

//@desc     Delete  Product
//@route    DELETE /api/v1/products/:id
//@access   PRIVATE
exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product does not exist' });
    }

    res.status(200).json({ success: true, msg: 'Product deleted!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
    console.log(error);
  }
};
