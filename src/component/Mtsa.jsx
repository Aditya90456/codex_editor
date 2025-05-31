import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

function Mtsa() {
  const [nums1, setNums1] = useState('[1, 3]');
  const [nums2, setNums2] = useState('[2]');
  const [output, setOutput] = useState('');
  const [testCases, setTestCases] = useState([
    { nums1: '[1, 3]', nums2: '[2]', expected: '2.0' },
    { nums1: '[1, 2]', nums2: '[3, 4]', expected: '2.5' },
    { nums1: '[0, 0]', nums2: '[0, 0]', expected: '0.0' },
    { nums1: '[]', nums2: '[1]', expected: '1.0' },
    { nums1: '[2]', nums2: '[]', expected: '2.0' },
  ]);

  const [code, setCode] = useState(`function findMedianSortedArrays(nums1, nums2) {
  // Write your code here
}

return findMedianSortedArrays(nums1, nums2);
`);

  const runCode = () => {
    try {
      const arr1 = JSON.parse(nums1);
      const arr2 = JSON.parse(nums2);
      const func = new Function('nums1', 'nums2', code);
      const result = func(arr1, arr2);
      setOutput(`Output: ${result}`);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white p-6 flex flex-row items-center">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 absolute top-[12%] left-[2%]">Practice Median of Two Sorted Arrays</h1>
      <p className='text-lg font-bold mb-6 absolute top-[18%] left-[4%] bg-purple-700 text-white w-[18%] rounded-lg'>Hard</p>
      <p className='text-md font-semibold mb-[15%] absolute top-[22%] left-[1%] w-[30%]'>
        Given two sorted arrays <code>nums1</code> and <code>nums2</code>, return the median of the two sorted arrays.
        The overall run time complexity should be <code>O(log (m+n))</code>.
      </p>

      {/* Input Section */}
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg mt-[13%]">
        <label className="block text-sm font-medium mb-2">Enter nums1:</label>
        <input
          type="text"
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
          value={nums1}
          onChange={(e) => setNums1(e.target.value)}
        />
        <label className="block text-sm font-medium mb-2">Enter nums2:</label>
        <input
          type="text"
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
          value={nums2}
          onChange={(e) => setNums2(e.target.value)}
        />
        <h2 className="text-lg font-bold mb-4">Test Cases:</h2>
        <ul className="list-disc pl-5 mb-4">
          {testCases.map((testCase, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">Input:</span> nums1 = {testCase.nums1}, nums2 = {testCase.nums2} <br />
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

export default Mtsa;
