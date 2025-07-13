const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const PythonShell  =require('python-shell');
const fs = require('fs');

const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { exec } = require('child_process');
const { v4: uuid } = require('uuid'); 
const { body, validationResult } = require('express-validator');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const connectDB = require('./db');
const User = require('./models/User');
const Problem = require('./models/problem');
const authenticateToken = require('./middleware/auth');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// 🟢 Connect MongoDB'';
app.get('/api/me', authenticateToken, async (req, res) => {
  try {   
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found ' });
    res.json({ username: user.username, ObjectId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/run/python', async (req, res) => {
  const { code } = req.body;

  if (!code) return res.status(400).json({ message: 'Code is required' });

  try {
    const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
      language: 'python3',
      version: '3.10.0', // optional, defaults to latest
      files: [
        {
          name: 'main.py',
          content: code
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = response.data;

    res.json({
      output: result.run.stdout || result.run.stderr || '✅ Program executed successfully. No output.'
    });
  } catch (error) {
    console.error('❌ Cloud Python Error:', error.response?.data || error.message);
    res.status(500).json({ output: 'Cloud Python error: ' + error.message });
  }
});

app.get('/dashboard', authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  try {
    const problems = await Problem.find({ userId });
    const { total, solved, progress } = calculateProgress(problems);
    res.json({ message: 'Dashboard data retrieved successfully', problems, total, solved, progress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }   

})

app.post('/run', async (req, res) => {
  const { code } = req.body;

  if (!code) return res.status(400).json({ message: 'Code is required' });

  try {
    const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
      language: 'cpp',
      version: '10.2.0', // You can also use '11.2.0' or latest
      files: [
        {
          name: 'main.cpp',
          content: code
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = response.data;

    res.json({
      output: result.run.stdout || result.run.stderr || '✅ Program executed successfully. No output.'
    });
  } catch (error) {
    console.error('❌ Cloud C++ Error:', error.response?.data || error.message);
    res.status(500).json({ output: 'Cloud C++ error: ' + error.message });
  }
});

connectDB()
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => {
    console.error('❌ MongoDB Error:', err);
    process.exit(1);
  });

/**
 * 📝 Signup
 */
app.post('/signup', [
  body('username').isString().notEmpty(),
  body('password').isString().notEmpty(),
  body('confirmPassword').isString().notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ success: false, message: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '9yrs' });

    res.status(201).json({ success: true, message: 'User registered successfully', token, username });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * 🔐 Login
 */
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, username }, JWT_SECRET, { expiresIn: '9yr' });

    res.status(200).json({ success: true, token, username: user.username });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * 👤 Get Current Logged-in User
 */
app.get('/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ username: user.username, ObjectId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * 🧠 Gemini AI Chat API
 */

async function callGeminiWithRetry(prompt, retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      if (err.message.includes('503') && i < retries - 1) {
        console.warn(`🌐 Gemini overloaded. Retrying in ${delay}ms...`);
        await new Promise(r => setTimeout(r, delay));
        delay *= 2; // exponential backoff
      } else {
        throw err;
      }
    }
  }
}
app.post('/ai', authenticateToken, async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ message: 'Prompt is required' });

  try {
    const response = await callGeminiWithRetry(prompt);
    res.json({ reply: response });
  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    res.status(500).json({ message: 'Error calling Gemini API', error: error.message });
  }
});
/**
 * 📦 Problems API
 */
app.post('/prob', authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const { title, solved, attempted, tags, link } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  try {
    const normalizedTitle = title.trim().toLowerCase();
    const tagsArray = Array.isArray(tags) ? tags : tags?.split(',').map((tag) => tag.trim());

    const updatedProblem = await Problem.findOneAndUpdate(
      { userId, title: normalizedTitle },
      { $set: { solved, attempted, tags: tagsArray, link, title: normalizedTitle } },
      { upsert: true, new: true, collation: { locale: 'en', strength: 2 } }
    );

    const allProblems = await Problem.find({ userId });
    const { total, solved: solvedCount, progress } = calculateProgress(allProblems);

    res.json({
      message: 'Problem saved successfully',
      progress,
      total,
      solved: solvedCount,
      updatedProblem
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/prob', authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  try {
    const allProblems = await Problem.find({ userId });
    const { total, solved, progress } = calculateProgress(allProblems);
    res.json({ message: 'Problems retrieved successfully', progress, total, solved, problems: allProblems });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

function calculateProgress(problems) {
  const total = problems.length;
  const solved = problems.reduce((acc, p) => acc + (p.solved ? 1 : 0), 0);
  const progress = total ? Math.round((solved / total) * 100) : 0;
  return { total, solved, progress };
}

/**
 * 📹 WebRTC Signaling with Socket.IO
 */
io.on('connection', (socket) => {
  console.log('📡 Client connected');

  socket.on('offer', (offer) => {
    socket.broadcast.emit('offer', offer);
  });

  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer);
  });

  socket.on('candidate', (candidate) => {
    socket.broadcast.emit('candidate', candidate);
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected');
  });
});

/**
 * 🚀 Start Server
 */
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});