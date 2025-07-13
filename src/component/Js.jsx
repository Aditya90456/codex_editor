import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import { FaPlay } from 'react-icons/fa'

export default function JavaScriptEditor() {
  const [js, setJs] = useState('console.log("Hello from CodeX JS Editor!");')
  const [output, setOutput] = useState('')

  const runCode = () => {
    try {
      const result = eval(js)
      setOutput(String(result) || '✅ Code executed successfully.')
    } catch (err) {
      setOutput(`❌ Error: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-black/30 backdrop-blur-md mt-9 shadow-lg">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          ⚡ JavaScript Editor
        </h1>
        <button
          onClick={runCode}
          className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-teal-500 hover:scale-105 px-4 py-2 rounded-xl shadow-lg transition-all duration-300"
        >
          <FaPlay /> Run
        </button>
      </header>

      {/* Editor */}
      <div className="flex-1 p-4 bg-black/40 backdrop-blur-lg rounded-lg shadow-lg m-4">
        <Editor
          height="60vh"
          defaultLanguage="javascript"
          value={js}
          onChange={(val) => setJs(val || '')}
          theme="vs-dark"
          options={{
            fontSize: 16,
            minimap: { enabled: false },
            wordWrap: 'on',
            lineNumbers: 'on',
          }}
        />
      </div>

      {/* Output */}
      <div className="p-4 bg-black/50 backdrop-blur-md rounded-lg shadow-lg m-4">
        <h2 className="text-lg font-semibold mb-2">📦 Console Output</h2>
        <pre className="bg-gray-900 text-green-400 rounded-lg p-3 h-48 overflow-y-auto">
          {output || '// Your output will appear here...'}
        </pre>
      </div>
    </div>
  )
}
