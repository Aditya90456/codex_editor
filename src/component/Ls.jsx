import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

function Ls() {
  const [inputStr, setInputStr] = useState('"abcabcbb"');
  const [output, setOutput] = useState('');
  const [testCases, setTestCases] = useState([
    { input: '"abcabcbb"', expected: '3' },
    { input: '"bbbbb"', expected: '1' },
    { input: '"pwwkew"', expected: '3' },
    { input: '""', expected: '0' },
    { input: '"dvdf"', expected: '3' }
  ]);

  const [code, setCode] = useState(`function lengthOfLongestSubstring(s) {
  // Write your code here
}

return lengthOfLongestSubstring(s);
`);

  const runCode = () => {
    try {
      const str = JSON.parse(inputStr); // safely parse string input
      const func = new Function('s', code);
      const result = func(str);
      setOutput(`Output: ${result}`);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white p-6 flex flex-row items-center">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 absolute top-[12%] left-[2%]">Practice Longest Substring Without Repeating Characters</h1>
      <p className='text-lg font-bold mb-6 absolute top-[18%] left-[4%] bg-blue-700 text-white w-[11%] rounded-lg'>Medium</p>
      <p className='text-md font-semibold mb-[15%] absolute top-[22%] left-[1%] w-[30%]'>
        Given a string <code>s</code>, find the length of the longest substring without repeating characters.
      </p>

      {/* Input Section */}
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg mt-[8%]">
        <label className="block text-sm font-medium mb-2">Enter String:</label>
        <input
          type="text"
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
          value={inputStr}
          onChange={(e) => setInputStr(e.target.value)}
        />
        <h2 className="text-lg font-bold mb-4">Test Cases:</h2>
        <ul className="list-disc pl-5 mb-4">
          {testCases.map((testCase, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">Input:</span> s = {testCase.input} <br />
              <span className="font-semibold">Expected Output:</span> {testCase.expected}
            </li>
          ))}
        </ul>
        <button
          onClick={runCode}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Run Code
        </button>
      </div>

      {/* Code Editor */}
      <div className="w-full max-w-3x bg-gray-800 p-6 rounded-lg shadow-lg ml-[20%]">
        <h2 className="text-xl font-bold mb-4">Write Your Solution:</h2>
        <Editor
          height="300px"
          defaultLanguage="javascript"
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            scrollBeyondLastLine: false,
            renderWhitespace: 'all',
            autoClosingBrackets: 'always',
            lineNumbers: 'on',
            formatOnType: true,
            formatOnPaste: true
          }}
        />
      </div>

      {/* Output Section */}
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg absolute top-[89%] left-[33%]">
        <h2 className="text-xl font-bold mb-4">Output:</h2>
        <div>
          {output.length > 0 ? <p className="text-white">{output}</p> : <p className="text-red-500">No output yet. Please run the code.</p>}
        </div>
      </div>
    </div>
  );
}

export default Ls;
