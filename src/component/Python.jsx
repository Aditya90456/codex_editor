import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaTrash, FaSave } from 'react-icons/fa'

function Python() {
  const [code, setCode] = useState(`# Write your Python code here\nprint("Hello, CodeX!")`)
  const [output, setOutput] = useState('')

  const runCode = async () => {
    try {
      const res = await fetch('http://localhost:5000/run/python', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      setOutput(data.output || data.error)
    } catch (err) {
      setOutput('Error: Unable to connect to server.')
    }
  }

  const clearCode = () => {
    setCode('')
    setOutput('')
  }

  const saveCode = () => {
    // Placeholder: Save to backend or localStorage
    alert('Code saved successfully! 🎉')
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
        <div className="flex gap-3">
          <button
            onClick={runCode}
            className="flex items-center gap-2 bg-gradient-to-br from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 px-4 py-2 rounded-lg shadow-md transition duration-300"
          >
            <FaPlay /> Run
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
      </motion.div>
    </div>
  )
}

export default Python
