import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

export default function CppEditor() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  // 🌟 Load saved code from localStorage on mount
  useEffect(() => {
    const savedCode = localStorage.getItem('cppCode');
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(`#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}`);
    }
  }, []);

  // 💾 Save code to localStorage
  const saveCode = () => {
    const savedSnippets = JSON.parse(localStorage.getItem('codex_snippets') || '[]');
    const newSnippet = {    
      code,
      lang: 'cpp',
      filename: `snippet_${Date.now()}.cpp`,
      description: 'C++ Code Snippet',
    };
    savedSnippets.push(newSnippet);
    localStorage.setItem('codex_snippets', JSON.stringify(savedSnippets));
    setOutput(`✅ Code saved locally as "${newSnippet.filename}"`);           
    console.log('✅ Saved to Local Storage:', newSnippet);
  };

  // ▶ Run Code
  const runCode = async () => {
    setLoading(true);
    setOutput('💻 Running your code...');
    try {
      const res = await axios.post('http://localhost:5000/run', { code });
      setOutput(res.data.output || '✅ Code executed successfully');
    } catch (err) {
      setOutput('❌ Run Error: ' + (err.response?.data?.output || err.message));
    }
    setLoading(false);
  };

  // 🪛 Debug Code
  const debugCode = async () => {
    setLoading(true);
    setOutput('🪛 Debugging your code...');
    try {
      const res = await axios.post('http://localhost:5000/debug', { code });
      setOutput(res.data.output || '✅ Debug completed');
    } catch (err) {
      setOutput('❌ Debug Error: ' + (err.response?.data?.output || err.message));
    }
    setLoading(false);
  };

  // 📊 Analyze Time Complexity
  const analyzeCode = async () => {
    setLoading(true);
    setOutput('📊 Analyzing time and space complexity...');
    try {
      const res = await axios.post('http://localhost:5000/analyze', { code });
      setOutput(`🕒 Time Complexity: ${res.data.timeComplexity}\n📦 Space Complexity: ${res.data.spaceComplexity}`);
    } catch (err) {
      setOutput('❌ Analysis Error: ' + (err.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#1e1e2f] text-white">
      
      {/* 🏷️ Header */}
      <div className="flex justify-between items-center px-6 py-3 bg-[#27293d] mt-12 border-b border-gray-700">
        <h1 className="text-xl font-bold text-green-400">⚡ Codex C++ Playground</h1>
        <div className="flex space-x-4">
          <button
            onClick={runCode}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white font-medium transition
              ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
          >
            ▶ Run
          </button>
          <button
            onClick={saveCode}
            className="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600"
          >
            💾 Save
          </button>
          <button
            onClick={debugCode}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-white bg-yellow-500 hover:bg-yellow-600"
          >
            🪛 Debug
          </button>
          <button
            onClick={analyzeCode}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-white bg-purple-500 hover:bg-purple-600"
          >
            📊 Analyze
          </button>
        </div>
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
