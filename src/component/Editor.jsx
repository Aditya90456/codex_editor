import React, { useState } from 'react'
import Editor from '@monaco-editor/react'

function CodeEditor() {
  const [html, setHtml] = useState('<h1>Hello World</h1>')
  const [css, setCss] = useState('h1 { color: red; }')
  const [js, setJs] = useState('console.log("Hello World");')
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
    <div className="w-full h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="w-full h-16 bg-gray-800 flex items-center justify-center relative top-13 py-6 px-6">
        <h1 className="text-white text-2xl font-bold text-center">Web development editor</h1>
        <button
          onClick={runCode}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Run Code
        </button>
      </div>

      {/* Editor Section */}
      <div className="flex flex-row w-full h-2/3">
        <div className="w-1/3 h-full bg-gray-800 p-4">
          <h2 className="text-white text-lg font-bold mb-2">HTML</h2>
          <Editor
            defaultLanguage="html"
            value={html}
            onChange={(value) => setHtml(value || '')}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              wordWrap: 'on',
              lineNumbers: 'on',
            }}
          />
        </div>
        <div className="w-1/3 bg-gray-800 p-4">
          <h2 className="text-white text-lg font-bold mb-2">CSS</h2>
          <Editor
            defaultLanguage="css"
            value={css}
           theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              wordWrap: 'on',
              lineNumbers: 'on',
            }}
          />
        </div>
        <div className="w-1/3 bg-gray-800 p-4">
          <h2 className="text-white text-lg font-bold mb-2">JavaScript</h2>
          <Editor
            defaultLanguage="javascript"
            value={js}
            onChange={(value) => setJs(value || '')}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              wordWrap: 'on',
              lineNumbers: 'on',
            }}
          />
        </div>
      </div>

      {/* Output Section */}
      <div className="w-full h-1/3 bg-gray-900 p-4">
        <h2 className="text-white text-lg font-bold mb-2">Output</h2>
        <iframe
          srcDoc={output}
          title="Output"
          sandbox="allow-scripts"
          frameBorder="0"
          className="w-full h-full bg-white"
        ></iframe>
      </div>
    </div>
  )
}

export default CodeEditor