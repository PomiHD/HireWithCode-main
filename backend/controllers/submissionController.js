const { validationResult } = require('express-validator');
const Submission = require('../models/Submission');
const User = require('../models/User');

// @desc    Create a new submission
// @route   POST /api/submissions
// @access  Public
exports.createSubmission = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, githubRepo, vercelUrl } = req.body;

  try {
    // Check if user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if submission already exists
    let existingSubmission = await Submission.findOne({ user: userId });

    if (existingSubmission) {
      // Update existing submission
      existingSubmission.githubRepo = githubRepo;
      existingSubmission.vercelUrl = vercelUrl;
      existingSubmission.submittedAt = Date.now();

      await existingSubmission.save();
      return res.status(200).json({ submission: existingSubmission });
    }

    // Create new submission
    const submission = new Submission({
      user: userId,
      githubRepo,
      vercelUrl,
    });

    await submission.save();
    res.status(201).json({ submission });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
