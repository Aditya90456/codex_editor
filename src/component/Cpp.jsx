import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import axios from 'axios'

function CppEditor() {
  const [code, setCode] = useState('#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}')
  const [output, setOutput] = useState('')

  const runCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/run-cpp', { code });
      setOutput(response.data.output);
    } catch (error) {
      if (error.response) {
        setOutput(error.response.data.output); // Backend error
      } else {
        setOutput('Network error: ' + error.message); // Network error
      }
    }
  }

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

      {/* Editor Section */}
      <div className="flex-1 bg-gray-800 p-4">
        <Editor
          height="100%"
          language="cpp"
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: 'on',
            automaticLayout: true,
          }}
        />
      </div>

      {/* Output Section */}
      <div className="w-full h-1/3 bg-gray-900 p-4">
        <h2 className="text-white text-lg font-bold mb-2">Output</h2>
        <div className="w-full h-full bg-gray-800 text-white p-4 rounded overflow-auto">
          <pre className='text-xs  text-white'>{output}</pre>
        </div>
      </div>
    </div>
  )
}

export default CppEditor