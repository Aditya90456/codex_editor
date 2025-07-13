import React, { useState } from 'react'
import Editor from '@monaco-editor/react'

function CodeEditor() {
  const [html, setHtml] = useState('<h1>Hello, Aditya!</h1>')
  const [css, setCss] = useState('h1 { color: #00FFAB; text-align: center; }')
  const [js, setJs] = useState('console.log("Welcome to CodeX")')
  const [output, setOutput] = useState('')

  const runCode = () => {
    const source = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}<\/script>
        </body>
      </html>
    `
    setOutput(source)
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#141E30] to-[#243B55] text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-black/20 backdrop-blur-md mt-12 shadow-lg">
        <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text">
          🚀 Web Development Editor
        </h1>
        <button
          onClick={runCode}
          className="px-5 py-2 bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white rounded-xl shadow-md transition"
        >
          Run ▶
        </button>
      </header>

      {/* Editors */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* HTML Editor */}
        <div className="flex-1 p-3">
          <h2 className="text-lg font-semibold mb-2">🔤 HTML</h2>
          <Editor
            height="30vh"
            defaultLanguage="html"
            value={html}
            onChange={(value) => setHtml(value || '')}
            theme="vs-dark"
            options={{ fontSize: 14, minimap: { enabled: false }, wordWrap: 'on' }}
          />
        </div>

        {/* CSS Editor */}
        <div className="flex-1 p-3">
          <h2 className="text-lg font-semibold mb-2">🎨 CSS</h2>
          <Editor
            height="30vh"
            defaultLanguage="css"
            value={css}
            onChange={(value) => setCss(value || '')}
            theme="vs-dark"
            options={{ fontSize: 14, minimap: { enabled: false }, wordWrap: 'on' }}
          />
        </div>

        {/* JS Editor */}
        <div className="flex-1 p-3">
          <h2 className="text-lg font-semibold mb-2">⚡ JavaScript</h2>
          <Editor
            height="30vh"
            defaultLanguage="javascript"
            value={js}
            onChange={(value) => setJs(value || '')}
            theme="vs-dark"
            options={{ fontSize: 14, minimap: { enabled: false }, wordWrap: 'on' }}
          />
        </div>
      </div>

      {/* Output */}
      <div className="p-4 bg-black/30 backdrop-blur-md">
        <h2 className="text-lg font-semibold mb-2">📦 Output</h2>
        <iframe
          srcDoc={output}
          title="Output"
          sandbox="allow-scripts"
          frameBorder="0"
          className="w-full h-[300px] rounded-lg shadow-lg bg-white"
        ></iframe>
      </div>
    </div>
  )
}

export default CodeEditor
