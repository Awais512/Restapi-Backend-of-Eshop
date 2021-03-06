const { Category } = require('../models/category');

//@desc     Create Category
//@route    POST /api/v1/categories
//@access   PRIVATE
exports.createCategory = async (req, res) => {
  try {
    let category = new Category({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });
    category = await category.save();

    if (!category)
      return res.status(400).send('the category cannot be created!');

    res.send(category);
  } catch (err) {
    res.status(500).json({ success: false, error: err });
    console.log(err);
  }
};

//@desc     Get all Category
//@route    GET /api/v1/categories
//@access   PUBLIC
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch (err) {
    res.status(500).json({ success: false, error: err });
    console.log(err);
  }
};

//@desc     Delete  Category
//@route    DELETE /api/v1/categories/:id
//@access   PRIVATE
exports.deleteCategory = async (req, res) => {
  try {
    let category = await Category.findByIdAndRemove(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: 'Category does not exist' });
    }

    res.status(200).json({ success: true, msg: 'Category deleted!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
    console.log(err);
  }
};

//@desc     Get Single  Category
//@route    GET /api/v1/categories/:id
//@access   PUBLIC
exports.getCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: 'Category does not exist' });
    }

    res.status(200).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
    console.log(err);
  }
};

//@desc     Update Category
//@route    PUT /api/v1/categories/:id
//@access   PRIVATE
exports.updateCategory = async (req, res) => {
  try {
    let category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
      },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ msg: 'Category does not exist' });
    }

    res.status(200).send(category);
  } catch (err) {
    res.status(500).json({ success: false, error: err });
    console.log(err);
  }
};
