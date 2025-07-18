import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaTrash, FaSave } from 'react-icons/fa'

function JavaScript() {
  const [code, setCode] = useState(`// Write your JavaScript code here\nconsole.log("Hello, CodeX!");`)
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  // ▶ Run Code
  const runCode = async () => {
    const res=eval(code)
    setOutput(res || '✅ Code executed successfully')
    setLoading(false)
    
  }

  // 🪛 Debug Code
  const debugCode = async () => {
    setLoading(true)
    setOutput('🪛 Debugging your code...')
    try {
      const res = await fetch('http://localhost:5000/debug/js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      setOutput(data.output || '✅ Debug finished')
    } catch (err) {
      setOutput('❌ Debug Error: ' + err.message)
    }
    setLoading(false)
  }

  // 📊 Analyze Time Complexity
  const analyzeCode = async () => {
    setLoading(true)
    setOutput('📊 Analyzing time complexity...')
    try {
      const res = await fetch('http://localhost:5000/analyze/js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      setOutput(`🕒 Estimated Time Complexity: ${data.complexity || 'Unknown'}`)
    } catch (err) {
      setOutput('❌ Analysis Error: ' + err.message)
    }
    setLoading(false)
  }

  // 💾 Save Code
  const saveCode = () => {
    const savedSnippets = JSON.parse(localStorage.getItem('codex_snippets') || '[]');
    const newSnippet = {
      code,
      lang: 'javascript',
      filename: `snippet_${Date.now()}.js`,
      description: 'JavaScript Code Snippet',
    };
    savedSnippets.push(newSnippet);
    localStorage.setItem('codex_snippets', JSON.stringify(savedSnippets));
    setOutput(`✅ Code saved locally as "${newSnippet.filename}"`);
    console.log('✅ Saved to Local Storage:', newSnippet);
  }

  // 🗑 Clear Code
  const clearCode = () => {
    setCode('')
    setOutput('')
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#141E30] via-[#243B55] to-[#141E30] text-white flex flex-col px-4 py-6">
      {/* Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-lg bg-white/10 border-b border-white/20 rounded-2xl p-4 mt-3 flex justify-between items-center shadow-lg"
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
          ⚡ JavaScript Editor
        </h1>
        <div className="flex gap-3">
          <button
            onClick={runCode}
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-br from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 px-4 py-2 rounded-lg shadow-md transition duration-300"
          >
            <FaPlay /> Run
          </button>
          <button
            onClick={debugCode}
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 px-4 py-2 rounded-lg shadow-md transition duration-300"
          >
            🪛 Debug
          </button>
          <button
            onClick={analyzeCode}
            disabled={loading}
            className="flex items-center gap-2 bg-gradient-to-br from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 px-4 py-2 rounded-lg shadow-md transition duration-300"
          >
            📊 Analyze
          </button>
          <button
            onClick={saveCode}
            className="flex items-center gap-2 bg-gradient-to-br from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 px-4 py-2 rounded-lg shadow-md transition duration-300"
          >
            <FaSave /> Save
          </button>
          <button
            onClick={clearCode}
            className="flex items-center gap-2 bg-gradient-to-br from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 px-4 py-2 rounded-lg shadow-md transition duration-300"
          >
            <FaTrash /> Clear
          </button>
        </div>
      </motion.div>

      {/* Code Editor */}
      <motion.textarea
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-1 w-full bg-g
ray-800 text-white p-4 rounded-lg mt-4 resize-none font-mono text-sm"
        rows="15" 

        ></motion.textarea>
        {/* Output */}
        <motion.div

            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 backdrop-blur-lg bg-white/10 border border-white/20 rounded-lg p-4 shadow-lg"
        >
            <div className="mb-2 text-green-400 font-semibold">Terminal Output:</div>
            <div className="flex-1 bg-[#0f0f0f] rounded-lg p-4 text-green-300 font-mono overflow-y-auto">
                <pre>{output}</pre>
            </div>
        </motion.div>
    </div>
  )
}
export default JavaScript