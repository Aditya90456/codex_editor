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
const authenticateToken = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
connectDB()
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB Error:', err);
    process.exit(1);
  });

// Create a test user once
(async () => {
  const existing = await User.findOne({ username: 'testuser' });
  if (!existing) {
    const hashed = bcrypt.hashSync('123456', 10);
    await User.create({ username: 'testuser', password: hashed });
    console.log('🔥 Test user created: testuser / 123456');
  }
})();

/**
 * 📚 Get All Problems
 */
app.get('/prob', (req, res) => {
  fs.readFile('./prob(1).js', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading problems:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    try {
      const problems = JSON.parse(data);
      res.json(problems);
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr);
      res.status(500).json({ message: 'JSON parse error' });
    }
  });
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
 * 🚪 Logout (Frontend should just delete token)
 */
app.post('/logout', authenticateToken, (req, res) => {
  // No real logout in stateless JWT
  res.json({ message: 'Logged out (client should delete token)' });
});

/**
 * 👤 Get Current Logged-in User
 */
// Get Current Logged-in User
app.get('/user', authenticateToken, async (req, res) => {
  try {
    // Find the user by ID from the token
    const user = await User.findById(req.user.userId).select('-password'); // Exclude the password field

    res.json({ username: user.username, ObjectID: user._id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the user's username and ID
    res.json({ username: user.username, ObjectID: user._id });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * 🔒 Protected Route Test
 */
app.get('/protected', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Protected content', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * ⚙️ Run C++ Code
 */
app.post('/run', (req, res) => {
  const { code } = req.body;

  if (!code) return res.status(400).json({ output: '❌ No code provided' });

  // Generate unique filenames
  const filename = `${uuid()}.cpp`;
  const executable = `${uuid()}.exe`;
  const filepath = path.join(__dirname, filename);
  const outputPath = path.join(__dirname, executable);

  // Write the code to a temporary .cpp file
  fs.writeFileSync(filepath, code);

  // Compile and run the C++ code
  const command = `g++ "${filepath}" -o "${outputPath}" && "${outputPath}"`;

  exec(command, { timeout: 5000 }, (err, stdout, stderr) => {
    // Always clean up
    try {
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    } catch (cleanupErr) {
      console.error('⚠️ Cleanup error:', cleanupErr);
    }

    // If there was an error (compilation or runtime)
    if (err || stderr) {
      return res.json({
        success: false,
        output: stderr || err.message
      });
    }

    // Return output
    return res.json({
      success: true,
      output: stdout
    });
  });
});
/**
 * 🚀 Start Server
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
