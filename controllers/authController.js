const { User } = require('../models/user');

//@desc     Create User
//@route    POST /api/v1/users
//@access   Public
exports.register = async (req, res) => {
  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: req.body.passwordHash,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    });

    user = await user.save();

    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
};
