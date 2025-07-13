const mongoose = require('mongoose');
const Question = require('../models/Question');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/quizapp';

async function seed() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'sampleQuestions.json')));
  await Question.deleteMany({});
  await Question.insertMany(data);
  console.log('Sample questions seeded!');
  mongoose.disconnect();
}

seed(); 