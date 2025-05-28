const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { exec } = require('child_process');
const { v4: uuid } = require('uuid');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

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
          return res.status(400).json({ output: runStderr || 'Runtime error' });
        }

        res.json({ output: stdout });
      });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ output: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
