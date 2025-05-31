import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

function TwoSum() {
  const [nums, setNums] = useState('[2, 7, 11, 15]');
  const [target, setTarget] = useState('9');
  const [output, setOutput] = useState('');
  const [testCases, setTestCases] = useState([
    { nums: '[2, 7, 11, 15]', target: '9', expected: '[0, 1]' },  , { nums: '[3, 2, 4]', target: '6', expected: '[1, 2]' },
        { nums: '[3, 3]', target: '6', expected: '[0, 1]' }]);
  const [code, setCode] = useState(`function twoSum(nums, target) { 
    // Write your code here
}
return twoSum(nums, target);  
`); 

  const runCode = () => {
    try {
      console.log('Input nums:', nums); // Debugging log
      console.log('Input target:', target); // Debugging log

      const numArray = JSON.parse(nums); // Parse the input as a JSON array
      const func = new Function('nums', 'target', code); // Dynamically create the function

      const result = func(numArray, Number(target)); // Execute the function 
      console.log('Parsed nums:', numArray); // Debugging log
      console.log('Result:', result); // Debugging log
      setOutput(result.length > 0 ? `Output: ${JSON.stringify(result)}` : 'No pairs found.');
    } catch (error) {
      console.error('Error:', error.message); // Debugging log
      setOutput(`Error: ${error.message}`); // Handle errors
    }
  }; 

  return (
    <div className="w-full h-screen bg-gray-900 text-white p-6 flex flex-row  items-center">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 absolute top-[12%] left-[2%] flex justify-center items-center">Practice Two Sum Problem</h1>
      <p className='text-lg font-bold mb-6 absolute top-[18%] left-[4%] bg-red-700 text-white w-[11%] rounded-lg '>Easy</p>
      <p className='text-lg font-bold mb-[15%] absolute top-[22%] left-[1%]'>

        Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.  
      </p>

      {/* Input Section */}
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg mt-[8%]">
        <label className="block text-sm font-medium mb-2">Enter Array []:</label>
        <input
          type="text"
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
          value={nums}
          onChange={(e) => setNums(e.target.value)}
        />
        <label className="block text-sm font-medium mb-2">Enter Target:</label>
        <input
          type="text"
          className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        /> 
        <h2 className="text-lg font-bold mb-4">Test Cases:</h2>
        <ul className="list-disc pl-5 mb-4">
          {testCases.map((testCase, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">Input:</span> nums = {testCase.nums}, target = {testCase.target} <br />
              <span className="font-semibold">Expected Output:</span> {testCase.expected}
            </li>
          ))}        </ul>
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
        <div className="p-2 bg-gray-700 rounded"> 
        </div>
        <div className="">
          {output.length > 0 ? <p className="text-white">{output}</p> : <p className="text-red-500">No output yet. Please run the code.</p>} 
        </div> </div>
      </div>
  );
}

export default TwoSum;