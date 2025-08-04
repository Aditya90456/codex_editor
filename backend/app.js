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
const puppeteer = require('puppeteer')
const Codes = require('./models/Codes'); // Import Codes model

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
app.post('/debug', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ message: 'Code is required' });
  try {
    const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
      language: 'cpp',
      version: '10.2.0', // You can also use '11.2.0' or latest
      files: [
        {
          name: 'main.cpp', // You can change this to whatever you want 
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
    console.error('❌ Cloud C++ Debug Error:', error.response?.data || error.message
    );
    res.status(500).json({ output: 'Cloud C++ debug error: ' + error.message });
  }
});

app.post("/dryrun", (req, res) => {
  const { code } = req.body;
  const lines = code.split("\n");
  const steps = [];
  let vars = {};
  let breakTriggered = false;
  let lastOutput = null;

  function logStep(line, changed, cout = null) {
    steps.push({ line, changed: { ...changed }, cout });
  }

  function evalCondition(expr) {
    let cond = expr;
    Object.keys(vars).forEach(v => cond = cond.replace(new RegExp(`\\b${v}\\b`, "g"), vars[v]));
    let result = false;
    try { result = eval(cond); } catch {}
    return { cond, result };
  }

  // 🔍 Parse each line
  lines.forEach((line, idx) => {
    if (breakTriggered) return;
    const trimmed = line.trim();

    // 📌 Variable declaration
    const decl = trimmed.match(/int\s+(\w+)\s*=\s*(\d+)/);
    if (decl) {
      vars[decl[1]] = parseInt(decl[2]);
      logStep(idx + 1, vars);
    }

    // 📌 For Loop
    const matchFor = trimmed.match(/for\s*\(\s*int\s+(\w+)\s*=\s*(\d+);\s*\1\s*([<>=]+)\s*(\d+);\s*\1\+\+\s*\)/);
    if (matchFor) {
      let iVar = matchFor[1];
      let start = parseInt(matchFor[2]);
      let op = matchFor[3];
      let end = parseInt(matchFor[4]);
      vars[iVar] = start;

      while (
        !breakTriggered &&
        ((op === "<=" && vars[iVar] <= end) ||
         (op === "<" && vars[iVar] < end) ||
         (op === ">=" && vars[iVar] >= end) ||
         (op === ">" && vars[iVar] > end))
      ) {
        logStep(idx + 1, vars, `Check: ${vars[iVar]} ${op} ${end} → true`);

        // Loop body simulation
        lines.forEach((bodyLine, bodyIdx) => {
          const tBody = bodyLine.trim();

          // +=, -=, *=, /=
          const compound = tBody.match(/(\w+)\s*(\+=|-=|\*=|\/=)\s*(\w+)/);
          if (compound) {
            let varName = compound[1];
            let opType = compound[2];
            let rhs = compound[3];
            let before = vars[varName];
            let rhsValue = isNaN(rhs) ? vars[rhs] : parseInt(rhs);
            if (opType === "+=") {vars[varName] = before + rhsValue;
              
            }
            if (opType === "-=") vars[varName] = before - rhsValue;
            if (opType === "*=") vars[varName] = before * rhsValue;
            if (opType === "/=") vars[varName] = Math.floor(before / rhsValue);
            logStep(bodyIdx + 1, vars, `${varName} = ${before} ${opType[0]} ${rhsValue} → ${vars[varName]}`);
          }

          // If
          const matchIf = tBody.match(/if\s*\(([^)]+)\)/);
          if (matchIf) {
  let { cond, result } = evalCondition(matchIf[1]);
  logStep(bodyIdx + 1, vars, `IF (${cond}) → ${result}`);

  // Auto break condition
  if (result && cond.includes("> 5")) {
    breakTriggered = true;
    logStep(bodyIdx + 1, vars, `Auto BREAK triggered (${cond})`);
  }

  // Else branch
  if (!result && lines[bodyIdx + 1]?.trim().startsWith("else")) {
    logStep(bodyIdx + 2, vars, `ELSE branch executed`);
  }
}

          // Break
          if (tBody.startsWith("break")) {
            logStep(bodyIdx + 1, vars, `BREAK triggered`);
            breakTriggered = true;
          }

          // Continue
          if (tBody.startsWith("continue")) {
            logStep(bodyIdx + 1, vars, `CONTINUE → Skip rest of body`);
            return;
          }

          // Cout
          const coutMatch = tBody.match(/cout\s*<<\s*"([^"]+)"/);
          if (coutMatch) {
            lastOutput = coutMatch[1];
            logStep(bodyIdx + 1, vars, `Output: "${coutMatch[1]}"`);
          }
        });

        // Increment i
        let beforeI = vars[iVar];
        vars[iVar]++;
        logStep(idx + 1, vars, `${iVar} = ${beforeI} → ${vars[iVar]}`);
      }

      // Loop End
      if (!breakTriggered) {
  logStep(idx + 1, vars, `Check: ${vars[iVar]} ${op} ${end} → false`);
  logStep(idx + 1, vars, `Loop ended`);

  // 🔍 Scan remaining lines after loop
  for (let k = idx + 1; k < lines.length; k++) {
    let postLine = lines[k].trim();

    // Final IF
    const postIf = postLine.match(/if\s*\(([^)]+)\)/);
    if (postIf) {
      let { cond, result } = evalCondition(postIf[1]);
      logStep(k + 1, vars, `Final IF (${cond}) → ${result}`);
      continue;
    }

    // ELSE
    if (postLine.startsWith("else")) {
      logStep(k + 1, vars, `ELSE branch executed`);
      continue;
    }

    // Cout after loop
    const coutAfter = postLine.match(/cout\s*<<\s*"([^"]+)"/);
    if (coutAfter) {
      logStep(k + 1, vars, `Output: "${coutAfter[1]}"`);
      lastOutput = coutAfter[1];
      continue;
    }
  }
}

    }
  });

  res.json({ steps });
});





app.post('/analyze/python', async (req, res) => {
  const { code } = req.body;
  var complexity = 'O(1)'; // Placeholder for actual analysis logic
  var timeComplexity = 'O(1)'; // Placeholder for actual analysis logic
var spaceComplexity = 'O(1)'; // Placeholder for actual analysis logic 
  const loopCount = (code.match(/for\s*\(|while\s*\(/g) || []).length;
  const functionNames = [...code.matchAll(/(\w+)\s*\([^)]*\)\s*{/g)].map(match => match[1]);
  const isRecursive = functionNames.some(fn => new RegExp(`\\b${fn}\\s*\\(`).test(code));
  if (loopCount === 1) complexity = 'O(n)';
  else if (loopCount >= 2) complexity = 'O(n^2)';
  if (isRecursive) complexity = 'O(2^n) or O(n) [Recursion detected]';  
  res.json({ complexity, timeComplexity, spaceComplexity });
});


app.post('/debug/python', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ message: 'Code is required' }); 
  // 🐍 Use PythonShell to run the cod
  // e

  try {
    const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
      language: 'python',

      version: '3.10.0', // You can also use '3.11.0' or latest
      files: [
        {
          name: 'main.py', // You can change this to whatever you want
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
      output: result.run.stdout || result.run.stderr || '✅ Program executed successfully. No output' 
    });
  } catch (error) {
    console.error('❌ Cloud Python Debug Error:', error.response?.data || error.message);
    res.status(500).json({ output: 'Cloud Python debug error: ' + error .message });
  }   
});  
     
    const fetch = require('node-fetch');
app.post('/code', authenticateToken, async (req, res) => {
  console.log('🔵 Save Code Called');
  const { code, description, lang, filename } = req.body;

  if (!code || !description || !lang || !filename) {
    console.log('🔴 Missing fields');
    return res.status(400).json({ message: 'Code, description, lang, and filename are required' });
  }

  const githubToken = process.env.GITHUB_TOKEN;
  const repoOwner = 'your-github-username';
  const repoName = 'your-repo-name';
  const filePath = `snippets/${lang}/${req.user.userId}/${filename}`; // 🗂️ Save in user folder

  try {
    // Check if file exists
    let sha = null;
    const getFileRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
      headers: { Authorization: `token ${githubToken}` }
    });

    if (getFileRes.ok) {
      const fileData = await getFileRes.json();
      sha = fileData.sha;
    }

    // Create or update file
    const saveRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        Authorization: `token ${githubToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `💾 Save code: ${description}`,
        content: Buffer.from(code).toString('base64'),
        sha
      })
    });

    if (!saveRes.ok) {
      const error = await saveRes.json();
      throw new Error(`GitHub API Error: ${error.message}`);
    }

    const result = await saveRes.json();
    console.log('✅ Code saved to GitHub:', result.content.path);

    res.status(201).json({
      message: 'Code saved to GitHub',
      github: result.content
    });
  } catch (err) {
    console.error('❌ GitHub Save Error:', err.message);
    res.status(500).json({ message: 'Failed to save code to GitHub', error: err.message });
  }
});
  app.post('/debug/js', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ message: 'Code is required' });
  try {
    const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
      language: 'javascript',
      version: '18.15.0', // Node 18 LTS
      files: [{ name: 'debug.js', content: code }]
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const result = response.data;
    res.json({
      output: result.run.stdout || result.run.stderr || '✅ Debug finished. No output.'
    });
  } catch (err) {
    console.error('❌ Debug Error:', err.response?.data || err.message);
    res.status(500).json({ output: '❌ Cloud Debug Error: ' + err.message });
  }
});
const PDFDocument = require('pdfkit'); 
const { b } = require('motion/react-client');

 

app.post('/analyze/js', async (req, res) => {
  const { code } = req.body;
  var complexity = 'O(1)'; // Placeholder for actual analysis logic
  var timeComplexity = 'O(1)'; // Placeholder for actual analysis logic
  var spaceComplexity = 'O(1)'; // Placeholder for actual analysis logic
  const loopCount = (code.match(/for\s*\(|while\s*\(/g) || []).length;
  const functionNames = [...code.matchAll(/(\w+)\s*\([^)]*\)\s*{/g)].map(match => match[1]);
  const isRecursive = functionNames.some(fn => new RegExp(`\\b${fn}\\s*\\(`).test(code));
  if (loopCount === 1) complexity = 'O(n)';
  else if (loopCount >= 2) complexity = 'O(n^2)';
  if (isRecursive) complexity = 'O(2^n) or O(n) [Recursion detected]';
  res.json({ complexity, timeComplexity, spaceComplexity });
});
app.post('/analyze', (req, res) => {
  const { code } = req.body;

  // 📊 Simple heuristic-based complexity analyzer
  let complexity = 'O(1)';

  // Count loops
  const loopCount = (code.match(/for\s*\(|while\s*\(/g) || []).length;

  // Detect recursion
  const functionNames = [...code.matchAll(/(\w+)\s*\([^)]*\)\s*{/g)].map(match => match[1]);
  const isRecursive = functionNames.some(fn => new RegExp(`\\b${fn}\\s*\\(`).test(code));
  // Set complexity based on loops and recursion
  if (loopCount === 0 && !isRecursive) complexity = 'O(1)';
  else if (loopCount === 1) complexity = 'O(n)';  
  else if (loopCount >= 2) complexity = 'O(n^2)';
  if (isRecursive) complexity = 'O(2^n) or O(n) [Recursion detected]';
 

  res.json({ complexity });
});

connectDB().then(() => console.log('✅ MongoDB Connected'))
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

    const token = jwt.sign({  

      userId: user._id,
      username: user.username
    }, JWT_SECRET, { expiresIn: '9yr' });

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
// 🔥 Retry Gemini API call with exponential backoff
async function callGeminiWithRetry(prompt, retries = 3, delay = 2000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      const isRetryable = err.message.includes('503') || err.code === 'ECONNRESET';

      if (isRetryable && attempt < retries) {
        console.warn(
          `🌐 Gemini API overload (Attempt ${attempt}/${retries}). Retrying in ${delay}ms...`
        );
        await new Promise((r) => setTimeout(r, delay));
        delay *= 2; // exponential backoff
      } else {
        console.error(`❌ Gemini API call failed on attempt ${attempt}:`, err);
        throw err; // rethrow after retries
      }
    }
  }
}

// 🛡️ API route: /ai
app.post('/ai', authenticateToken, async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ message: '❗ Invalid or missing prompt.' });
  }

  try {
    console.log(`📝 Prompt received: "${prompt}" from user ${req.user?.id}`);
    const reply = await callGeminiWithRetry(prompt);

    res.status(200).json({ reply });
  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    res.status(500).json({
      message: 'Error calling Gemini API',
      error: error.message || 'Unknown error',
    });
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