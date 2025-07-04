const express = require('express');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { exec } = require('child_process');
const { v4: uuid } = require('uuid');
require('dotenv').config();

const connectDB = require('./db');
const User = require('./models/User');
const Problem = require('./models/problem');
const authenticateToken = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

connectDB()
  .then(() => console.log('✅ Connected to MongoDB'))
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

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

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

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

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

    // Return user details without password   

    res.json({ username: user.username, ObjectId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * 🚪 Logout
 */
app.post('/logout', authenticateToken, (req, res) => {
  res.json({ message: 'Logged out (client should delete token)' });
});

/**
 * ⚙️ Run C++ Code
 */
app.post('/run', (req, res) => {
  const { code } = req.body;

  if (!code) return res.status(400).json({ output: 'No code provided' });

  const filename = `${uuid()}.cpp`;
  const filepath = path.join(__dirname, filename);
  const outputPath = path.join(__dirname, `${uuid()}.exe`);

  fs.writeFileSync(filepath, code);

  const command = `g++ "${filepath}" -o "${outputPath}" && "${outputPath}"`;

  exec(command, { timeout: 5000 }, (err, stdout, stderr) => {
    fs.unlinkSync(filepath);
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

    if (err || stderr) {
      return res.json({ success: false, output: stderr || err.message });
    }

    res.json({ success: true, output: stdout });
  });
});

/**
 * 🧠 Update Problem Status
 */
/**
 * 🌱 Seed test user
 */
(async () => {
  const existing = await User.findOne({ username: 'testuser' });
  if (!existing) {
    const hashed = bcrypt.hashSync('123456', 10);
    await User.create({ username: 'testuser', password: hashed });
    console.log('🔥 Test user created: testuser / 123456');
  }
})();
app.post('/prob', authenticateToken, async (req, res) => {
  const userId = req.user.userId;
  const { title, solved, attempted, tags, link } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const normalizedTitle = title.trim().toLowerCase();
    const tagsArray = Array.isArray(tags)
      ? tags
      : tags?.split(',').map((tag) => tag.trim());

    const updatedProblem = await Problem.findOneAndUpdate(
      { userId, title: normalizedTitle },
      {
        $set: {
          solved,
          attempted,
          tags: tagsArray,
          link,
          title: normalizedTitle // save normalized title
        }
      },
      {
        upsert: true,
        new: true,
        collation: { locale: 'en', strength: 2 } // case-insensitive matching
      }
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
    console.error('❌ Error in POST /prob:', error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Duplicate problem detected for this user',
        error: error.keyValue
      });
    }

    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
app.get('/prob', authenticateToken, async (req, res) => { 

  const userId = req.user.userId;

  try {
    const allProblems = await Problem.find({ userId });
    const { total, solved, progress } = calculateProgress(allProblems);

    res.json({
      message: 'Problems retrieved successfully',
      progress,
      total,
      solved,
      problems: allProblems
    });
  } catch (error) {
    console.error('❌ Error in GET /prob:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
);

// Helper to calculate progress
function calculateProgress(problems) {
  const total = problems.length;
  const solved = problems.reduce((acc, p) => acc + (p.solved ? 1 : 0), 0);
  const progress = total ? Math.round((solved / total) * 100) : 0;
  return { total, solved, progress };
}


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * 🚀 Start Server
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
