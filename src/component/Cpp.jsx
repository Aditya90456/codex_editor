import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

export default function CppEditor() {
  const [code, setCode] = useState(`#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}`);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setOutput('💻 Running your code...');
    try {
      const res = await axios.post('http://localhost:5000/run', { code });
      setOutput(res.data.output || '✅ Code executed successfully');
    } catch (err) {
      setOutput('❌ Error: ' + (err.response?.data?.output || err.message));
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#1e1e2f] text-white">
      
      {/* 🏷️ Header */}
      <div className="flex justify-between items-center px-6 py-3 bg-[#27293d] border-b border-gray-700">
        <h1 className="text-xl font-bold text-green-400">⚡ Codex C++ Playground</h1>
        <button
          onClick={runCode}
          disabled={loading}
          className={`px-5 py-2 rounded-lg text-white mt-9 font-medium transition-all duration-200
            ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {loading ? 'Running...' : '▶ Run Code'}
        </button>
      </div>

      {/* 📜 Editor + Terminal */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
        {/* 👨‍💻 Editor */}
        <div className="border-r border-gray-700">
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
            }}
          />
        </div>

        {/* 💻 Output */}
        <div className="bg-black p-4 flex flex-col">
          <div className="mb-2 text-green-400 font-semibold">Terminal Output:</div>
          <div className="flex-1 bg-[#0f0f0f] rounded-lg p-4 text-green-300 font-mono overflow-y-auto">
            <pre>{output}</pre>
          </div>
        </div>
      </div>

      {/* 📦 Footer */}
      <div className="p-3 text-center text-gray-400 text-sm bg-[#27293d]">
        Codex Playground © 2025
      </div>
    </div>
  );
}
