const express = require('express');
const jwt = require('jsonwebtoken');
const Score = require('../models/Score');
const User = require('../models/User');

const router = express.Router();

const JWT_SECRET = "MyVery$trongSecretKey!2024"

// Middleware to verify JWT
function auth(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Save score (if logged in)
router.post('/score', auth, async (req, res) => {
  const { category, score } = req.body;
  try {
    const newScore = new Score({ userId: req.userId, category, score });
    await newScore.save();
    console.log(`Score saved: userId=${req.userId}, category=${category}, score=${score}`);
    res.status(201).json({ message: 'Score saved' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get leaderboard by category
router.get('/leaderboard/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const topScores = await Score.find({ category })
      .sort({ score: -1, date: 1 })
      .limit(10)
      .populate('userId', 'name email');
    res.json(topScores);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 