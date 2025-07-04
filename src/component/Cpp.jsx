import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

function CppEditor() {
  const [code, setCode] = useState(`#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}`);
  const [output, setOutput] = useState('');

  const runCode = async () => {
    setOutput('Running...');
    try {
      const response = await axios.post('http://localhost:5000/run', { code });
      setOutput(response.data.output);
    } catch (err) {
      setOutput('Error: ' + (err.response?.data?.output || err.message));
    }
  };

  return (
    <div className="w-full h-screen flex justify-between items-center bg-gray-900 text-white">
      
      {/* Left Side: Output */}
      <div className="w-1/3 bg-gray-800 border-r border-gray-700 p-4 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Output</h2>
          <button
            onClick={runCode}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-3 py-1 rounded"
          >
            Run Code
          </button>
        </div>
        <div className="bg-black rounded p-3 text-green-400 text-sm font-mono flex-1 overflow-y-auto">
          <pre>{output}</pre>
        </div>
      </div>

      {/* Right Side: Editor */}
      <div className="flex-1 h-full p-4 relative top-12 left-0">
        <Editor
          height="100%"
          language="cpp"
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            wordWrap: 'on', 
            height: '78%',       
          }}
        />
      </div>
    </div>
  );
}

export default CppEditor;
