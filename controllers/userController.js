const { User } = require('../models/user');

//@desc     Get all Users
//@route    GET /api/v1/users
//@access   Public
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');

    res.status(200).json({ count: users.length, data: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
};

//@desc     Get single User
//@route    GET /api/v1/users/:id
//@access   Public
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if (!user) {
      return res.status(404).send('User Does not exist');
    }

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
};
