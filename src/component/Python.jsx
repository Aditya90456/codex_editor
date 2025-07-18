import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaTrash, FaSave, FaBug, FaChartLine, FaGithub } from 'react-icons/fa'

function Python() {
  const [code, setCode] = useState(`# Write your Python code here\nprint("Hello, CodeX!")`)
  const [filename, setFilename] = useState('snippet.py')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [githubUrl, setGithubUrl] = useState('')

  const runCode = async () => {
    setLoading(true)
    setOutput('💻 Running your code...')
    try {
      const res = await fetch('http://localhost:5000/run/python', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      setOutput(data.output || data.error)
    } catch (err) {
      setOutput('❌ Error: Unable to connect to server.')
    }
    setLoading(false)
  }

  const debugCode = async () => {
    setLoading(true)
    setOutput('🪛 Debugging your code...')
    try {
      const res = await fetch('http://localhost:5000/debug/python', {
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

  const analyzeCode = async () => {
    setLoading(true)
    setOutput('📊 Analyzing time complexity...')
    try {
      const res = await fetch('http://localhost:5000/analyze/python', {
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

  const clearCode = () => {
    setCode('')
    setOutput('')
    setGithubUrl('')
  }
const saveCode = () => {
  const savedSnippets = JSON.parse(localStorage.getItem('codex_snippets') || '[]')

  const newSnippet = {
    id: Date.now(),         // Unique ID
    filename: filename || 'snippet.py',
    code,
    description: 'User saved code snippet',
    lang: 'python',
    savedAt: new Date().toLocaleString()
  }

  savedSnippets.push(newSnippet)
  localStorage.setItem('codex_snippets', JSON.stringify(savedSnippets))

  console.log('✅ Saved to Local Storage:', newSnippet)
  setOutput(`✅ Code saved locally as "${newSnippet.filename}"`)
}


  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex flex-col px-4 py-6">
      {/* Decorative Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-lg bg-white/10 border-b border-white/20 rounded-2xl p-4 mt-3 flex justify-between items-center shadow-lg"
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          🐍 Python Editor
        </h1>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={runCode}
            disabled={loading}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg shadow-md transition duration-300 disabled:opacity-50"
          >
            <FaPlay /> {loading ? 'Running...' : 'Run'}
          </button>
          <button
            onClick={debugCode}
            disabled={loading}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg shadow-md transition duration-300 disabled:opacity-50"
          >
            <FaBug /> Debug
          </button>
          <button
            onClick={analyzeCode}
            disabled={loading}
            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg shadow-md transition duration-300 disabled:opacity-50"
          >
            <FaChartLine /> Analyze
          </button>
          <button
            onClick={saveCode}
            disabled={saving}
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg shadow-md transition duration-300 disabled:opacity-50"
          >
            <FaSave /> {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={clearCode}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow-md transition duration-300"
          >
            <FaTrash /> Clear
          </button>
        </div>
      </motion.div>

      {/* Filename Input */}
      <input
        type="text"
        placeholder="Enter filename (e.g., hello.py)"
        className="mt-3 mb-3 w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
      />

      {/* Code Editor */}
      <motion.textarea
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-1 w-full bg-gray-900/50 text-white p-4 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner font-mono text-sm resize-none"
        rows="15"
      ></motion.textarea>

      {/* Output */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-4 backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-4 shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-2">📝 Output:</h2>
        <pre className="whitespace-pre-wrap text-green-300">{output || 'Output will appear here...'}</pre>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <FaGithub /> View on GitHub
          </a>
        )}
      </motion.div>
    </div>
  )
}

export default Python
