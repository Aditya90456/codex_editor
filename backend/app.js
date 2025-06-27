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

// Connect to DB
connectDB()
  .then(() => console.log('✅ Connected to DB'))
  .catch((err) => {
    console.error('❌ DB Error:', err);
    process.exit(1);
  });

// Route to fetch all DSA problems
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
      console.error('Error parsing problems.json:', parseErr);
      res.status(500).json({ message: 'JSON parse error' });
    }
  });
});

// Signup Route
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
    const token=jwt.sign({userId:newUser._id},process.env.JWT_SECRET,{expiresIn:'1h'});
    newUser.token=token;
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ✅ Protected Route (cleaned up)
app.post('/logout', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Optionally, you can invalidate the token here by removing it from the user
    user.token = null; // Clear token
    await user.save();

    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Error logging out:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
);
app.get('/user', authenticateToken, async (req, res) => {

    try { 

      const user = await User.findById(req.user.userId).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ username: user.username, objectId: user._id });
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ message: 'Server error' });
    }})
app.get('/protected', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.objectId).select('-password');
    console.log(user);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Protected content', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ C++ Code Execution Route
app.post('/run', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ output: 'No code provided' });

  const filename = `${uuid()}.cpp`;
  const filepath = path.join(__dirname, filename);
  const outputPath = path.join(__dirname, `${uuid()}.exe`);

  fs.writeFileSync(filepath, code);

  const command = `g++ "${filepath}" -o "${outputPath}" && "${outputPath}"`;

  exec(command, (err, stdout, stderr) => {
    // Cleanup
    fs.unlinkSync(filepath);
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

    if (err || stderr) {
      return res.json({ success: false, output: stderr || err.message });
    }

    res.json({ success: true, output: stdout });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
