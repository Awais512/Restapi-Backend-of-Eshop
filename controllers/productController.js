const { Product } = require('../models/product');
const { Category } = require('../models/category');

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
