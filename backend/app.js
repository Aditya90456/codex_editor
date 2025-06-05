// server.js
const express = require('express');
const cors = require('cors');
const { check, validationResult, body } = require('express-validator');
const bodyParser = require('body-parser');
const fs = require('fs');
const { exec } = require('child_process');
const { v4: uuid } = require('uuid');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const connectDB = require('./db');
const User = require('./models/User');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to DB
connectDB()
  .then(() => console.log('✅ Connected to DB'))
  .catch((err) => {
    console.error('❌ DB Error:', err);
    process.exit(1);
  });

// Login Route
app.post('/login', [
  check('username').isString().notEmpty(),
  check('password').isString().notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ success: false, message: 'User not found' });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// Signup Route
app.post('/signup', [
  body('username').isString().notEmpty(),
  body('password').isString().notEmpty(),
  body('confirmPassword').isString().notEmpty().withMessage('Confirm Password is required'),
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

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {  
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
// Add this route at the bottom
app.get('/user', async (req, res) => {
  try {
    const users = await User.find({}, 'username email createdAt'); // select only necessary fields
    res.json(users);
  } catch (err) {
    console.error('Fetch users error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// C++ Execution Route
app.post('/run-cpp', (req, res) => {
  try {
    const { code } = req.body;
    const filename = `${uuid()}.cpp`;
    const filepath = path.join(__dirname, filename);
    const outputFile = `${filepath}.out`;
    const runCmd = process.platform === 'win32' ? `"${outputFile}"` : `./"${outputFile}"`;

    fs.writeFileSync(filepath, code);

    exec(`g++ "${filepath}" -o "${outputFile}"`, (compileErr, _, compileStderr) => {
      if (compileErr) {
        fs.unlinkSync(filepath);
        return res.status(400).json({ output: compileStderr });
      }

      exec(runCmd, { timeout: 5000 }, (runErr, stdout, runStderr) => {
        fs.unlinkSync(filepath);
        if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);

        if (runErr) {
          return res.status(400).json({ output: runStderr || runErr.message });
        }

        res.json({ output: stdout });
      });
    });
  } catch (err) {
    console.error('Execution error:', err);
    res.status(500).json({ output: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
