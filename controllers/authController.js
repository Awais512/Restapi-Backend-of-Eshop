const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//@desc     Create User
//@route    POST /api/v1/auth/register
//@access   Public
exports.register = async (req, res) => {
  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
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

//@desc     Login User
//@route    POST /api/v1/auth/login
//@access   Public
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const secret = process.env.JWT_SECRET;
    if (!user) {
      return res.status(400).send('The user not found');
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin,
        },
        secret,
        { expiresIn: '1d' }
      );

      res.status(200).send({ user: user.email, token: token });
    } else {
      res.status(400).send('password is wrong!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
};
