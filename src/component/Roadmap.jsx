import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { motion } from 'framer-motion';
import { FaFileDownload, FaEdit, FaTrash, FaCode } from 'react-icons/fa';
import { SiPython, SiJavascript, SiCplusplus } from 'react-icons/si';

const langIcons = {
  python: <SiPython className="text-green-400 text-xl" />,
  javascript: <SiJavascript className="text-yellow-400 text-xl" />,
  cpp: <SiCplusplus className="text-blue-400 text-xl" />,
  default: <FaCode className="text-gray-400 text-xl" />
};

function Dashboard() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load saved snippets from localStorage
  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem('codex_snippets') || '[]');

    // If no saved data, add dummy data for testing
    if (saved.length === 0) {
      saved = [
        {
          filename: 'hello_world',
          lang: 'python',
          code: 'print("Hello, World!")'
        },
        {
          filename: 'factorial',
          lang: 'javascript',
          code: 'function factorial(n) { return n <= 1 ? 1 : n * factorial(n-1); }'
        },
        {
          filename: 'binary_search',
          lang: 'cpp',
          code: '#include <iostream>\nusing namespace std;\nint main() { cout << "Binary Search"; }'
        }
      ];
      localStorage.setItem('codex_snippets', JSON.stringify(saved));
    }

    setSnippets(saved);
    setLoading(false);
  }, []);

  // Download single snippet
  const downloadSnippet = (snippet) => {
    const blob = new Blob([snippet.code], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${snippet.filename || 'snippet'}.${snippet.lang}`);
  };

  // Delete a snippet
  const deleteSnippet = (index) => {
    const updated = [...snippets];
    updated.splice(index, 1);
    setSnippets(updated);
    localStorage.setItem('codex_snippets', JSON.stringify(updated));
  };

  // Download all snippets as zip
  const downloadAllSnippets = async () => {
    if (snippets.length === 0) return alert('No snippets to download!');
    const zip = new JSZip();
    snippets.forEach((snippet, idx) => {
      zip.file(`${snippet.filename || `snippet${idx + 1}`}.${snippet.lang}`, snippet.code);
    });
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'CodeX_All_Snippets.zip');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold my-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">
        📦 Your Saved Snippets
      </h1>

      <button
        onClick={downloadAllSnippets}
        className="mb-8 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full font-semibold hover:scale-105 transition"
      >
        ⬇️ Download All Snippets
      </button>

      {loading ? (
        <p className="text-xl animate-pulse">Loading snippets...</p>
      ) : snippets.length === 0 ? (
        <p className="text-xl text-gray-300">🚧 No snippets found. Start coding to save your work!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {snippets.map((snippet, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-[#1f2937] rounded-2xl p-5 shadow-xl flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  {langIcons[snippet.lang] || langIcons.default} {snippet.filename || `Snippet ${index + 1}`}
                </h2>
                <span className="text-sm text-gray-400 uppercase">{snippet.lang}</span>
              </div>
              <pre className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm h-40 overflow-y-auto mb-3">
                {snippet.code.slice(0, 300)}{snippet.code.length > 300 ? '... (truncated)' : ''}
              </pre>
              <div className="flex justify-between gap-2 mt-auto">
                <button
                  onClick={() => downloadSnippet(snippet)}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md transition"
                >
                  <FaFileDownload /> Download
                </button>
                <button
                  onClick={() => alert('Edit functionality coming soon!')}
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 px-3 py-2 rounded-md transition"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => deleteSnippet(index)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md transition"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
