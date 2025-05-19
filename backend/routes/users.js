const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerUser } = require('../controllers/userController');

// @route   POST /api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    check('githubId', 'GitHub ID is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
  ],
  registerUser,
);

module.exports = router;
