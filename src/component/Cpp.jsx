import React, { useState } from 'react';
import axios from 'axios';

function CppEditor() {
  const [code, setCode] = useState(`#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!";
    return 0;
}`);
  const [output, setOutput] = useState('');

  const runCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/run-cpp', {
        code, // send whatever is currently in the editor
      });
      if (response.data.output) {
        setOutput(response.data.output);
      } else if (response.data.error) {
        setOutput('Error: ' + response.data.error);
      } else {
        setOutput('No output');
      }
    } catch (error) {
      setOutput('Network error: ' + error.message);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="w-full h-16 bg-gray-800 flex items-center justify-between px-6">
        <h1 className="text-white text-2xl font-bold">C++ Editor</h1>
        <button
          onClick={runCode}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Run Code
        </button>
      </div>

      {/* Editor */}
      <textarea
        className="flex-1 bg-gray-800 text-white p-4"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>

      {/* Output */}
      <div className="w-full h-1/3 bg-gray-900 p-4">
        <h2 className="text-white text-lg font-bold mb-2">Output</h2>
        <div className="w-full h-full bg-gray-800 text-white p-4 rounded overflow-auto">
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
}

export default CppEditor;