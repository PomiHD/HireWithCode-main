const { validationResult } = require('express-validator');
const User = require('../models/User');

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { githubId, email } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({ user });
    }

    // Create new user
    user = new User({
      githubId,
      email,
    });

    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
