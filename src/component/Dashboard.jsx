import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { motion } from 'framer-motion';
import { FaFileDownload, FaTrash, FaCode } from 'react-icons/fa';
import { SiPython, SiJavascript, SiCplusplus } from 'react-icons/si';

const langIcons = {
  python: <SiPython className="text-green-400 text-2xl" />,
  javascript: <SiJavascript className="text-yellow-400 text-2xl" />,
  cpp: <SiCplusplus className="text-blue-400 text-2xl" />,
  default: <FaCode className="text-gray-400 text-2xl" />
};

function Dashboard() {
  const [data, setData] = useState([]);
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    username: 'Guest',
    email: '',
    joined: '',
    streak: 0,
  });

  // Fetch user info & progress from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get('http://localhost:5000/user', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        setUser({
          username: userRes.data.username || 'Guest',
          email: userRes.data.email || 'Not Provided',
          joined: userRes.data.joined || 'Unknown',
          streak: userRes.data.streak || 0,
        });

        const progressRes = await axios.get('http://localhost:5000/dashboard', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        setData(progressRes.data.problems || []);
      } catch (error) {
        console.error('❌ Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Load saved snippets from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('codex_snippets') || '[]');
    setSnippets(saved);
  }, []);

  // 📥 Download all snippets as ZIP
  const downloadAllSnippets = async () => {
    if (snippets.length === 0) {
      alert('No saved snippets to download!');
      return;
    }
    const zip = new JSZip();
    snippets.forEach((snippet, idx) => {
      const ext = snippet.lang === 'python' ? '.py' : snippet.lang === 'javascript' ? '.js' : '.txt';
      zip.file(`${snippet.filename || `snippet${idx + 1}`}${ext}`, snippet.code);
    });
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'CodeX_Snippets.zip');
  };

  // 📥 Download single snippet
  const downloadSnippet = (snippet) => {
    const ext = snippet.lang === 'python' ? '.py' : snippet.lang === 'javascript' ? '.js' : '.txt';
    const blob = new Blob([snippet.code], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${snippet.filename || 'snippet'}${ext}`);
  };

  // 🗑️ Delete a snippet
  const deleteSnippet = (index) => {
    const updated = [...snippets];
    updated.splice(index, 1);
    setSnippets(updated);
    localStorage.setItem('codex_snippets', JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-5xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl p-8 mt-10 shadow-xl relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
            <h1 className="text-4xl font-bold tracking-tight mb-1">
              Welcome, <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-red-500">{user.username}</span>
            </h1>
            <p className="text-lg text-gray-100">📧 {user.email}</p>
            <p className="text-md text-gray-200 mt-1">📅 Joined: {user.joined}</p>
            <p className="text-md text-green-300 mt-1">🔥 Streak: {user.streak} days</p>
          </div>
        </div>

        {/* 📥 Download All Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={downloadAllSnippets}
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full text-white font-bold hover:scale-105 transition transform shadow-lg"
          >
            ⬇️ Download My Snippets
          </button>
        </div>
      </motion.div>

      {/* Snippets Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-full max-w-6xl mt-10 p-6"
      >
        <h2 className="text-3xl font-bold mb-4">💾 Saved Snippets</h2>
        {snippets.length === 0 ? (
          <p className="text-lg text-gray-300">🚧 No snippets found. Start coding to save your work!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {snippets.map((snippet, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="bg-[#1f2937] rounded-2xl p-5 shadow-lg flex flex-col justify-between"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    {langIcons[snippet.lang] || langIcons.default} {snippet.filename || `Snippet ${index + 1}`}
                  </h3>
                  <span className="text-xs text-gray-400 uppercase">{snippet.lang}</span>
                </div>
                <pre className="bg-gray-800 text-gray-200 p-3 rounded-md text-sm h-32 overflow-y-auto mb-3">
                  {snippet.code.slice(0, 300)}{snippet.code.length > 300 ? '... (truncated)' : ''}
                </pre>
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => downloadSnippet(snippet)}
                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md transition"
                  >
                    <FaFileDownload /> Download
                  </button>
                  <button
                    onClick={() => deleteSnippet(index)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md transition"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Dashboard;
