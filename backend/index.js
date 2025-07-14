const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const scoreRoutes = require('./routes/scores');

const PORT = process.env.PORT || 5001;
// const __dirname = path.resolve();
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://abhiroy829429:QD3fYCOSxlAfUrlx@cluster0.h57dczo.mongodb.net/quizapp?retryWrites=true&w=majority&appName=Cluster0';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


// app.get('/', (req, res) => {
//   res.send('Quiz Generator API is running');

// });


app.use('/api/auth', authRoutes);
app.use('/api', questionRoutes);
app.use('/api', scoreRoutes);
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

}); 