const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { createSubmission } = require('../controllers/submissionController');

// @route   POST /api/submissions
// @desc    Create a submission
// @access  Public
router.post(
  '/',
  [
    check('userId', 'User ID is required').not().isEmpty(),
    check('githubRepo', 'GitHub repository URL is required').not().isEmpty(),
    check('githubRepo', 'Please enter a valid GitHub URL').matches(
      /^https:\/\/github\.com\/[\w-]+\/[\w-]+/,
    ),
    check('vercelUrl', 'Vercel URL is required').not().isEmpty(),
    check('vercelUrl', 'Please enter a valid Vercel URL').matches(
      /^https:\/\/([\w-]+\.)+vercel\.app/,
    ),
  ],
  createSubmission,
);

module.exports = router;
