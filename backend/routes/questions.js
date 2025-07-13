const express = require('express');
const Question = require('../models/Question');

const router = express.Router();

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Question.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get randomized questions by category
router.get('/questions/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const questions = await Question.aggregate([
      { $match: { category } },
      { $sample: { size: 10 } },
    ]);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 