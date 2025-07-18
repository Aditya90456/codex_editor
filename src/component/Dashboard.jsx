import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { motion } from 'framer-motion';

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    username: 'Guest',
    email: '',
    joined: '',
    streak: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get('http://localhost:5000/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setUser({
          username: userRes.data.username || 'Guest',
          email: userRes.data.email || 'Not Provided',
          joined: userRes.data.joined || 'Unknown',
          streak: userRes.data.streak || 0,
        });

        const progressRes = await axios.get('http://localhost:5000/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setData(progressRes.data.problems || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 📥 Download All Snippets
  const downloadAllSnippets = async () => {
    const savedSnippets = JSON.parse(localStorage.getItem('codex_snippets') || '[]');

    if (savedSnippets.length === 0) {
      alert('No saved snippets to download!');
      return;
    }

    const zip = new JSZip();
    savedSnippets.forEach((snippet, idx) => {
      const ext = snippet.lang === 'python' ? '.py' : snippet.lang === 'javascript' ? '.js' : '.txt';
      zip.file(`${snippet.filename || `snippet${idx + 1}`}${ext}`, snippet.code);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'CodeX_Snippets.zip');
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

        {/* 📥 Download Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={downloadAllSnippets}
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full text-white font-bold hover:scale-105 transition transform shadow-lg"
          >
            ⬇️ Download My Snippets
          </button>
        </div>
      </motion.div>

      {/* Dashboard Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="w-full max-w-6xl mt-10 p-6"
      >
        {loading ? (
          <p className="text-xl text-center animate-pulse">Loading your dashboard...</p>
        ) : data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((item, index) => {
              const solved = parseInt(item.solved) || 0;
              const total = parseInt(item.total) || 1;
              let progressPercent = Math.round((solved / total) * 100);
              if (item.percentage !== undefined) {
                progressPercent = Math.min(parseInt(item.percentage), 100);
              }

              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,255,255,0.3)' }}
                  className="bg-[#1f2937] bg-opacity-70 backdrop-blur-lg rounded-2xl p-5 border border-gray-600 shadow-lg"
                >
                  <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
                  <p className="text-gray-300 mb-4">{item.description || 'No description available.'}</p>
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 text-sm">{progressPercent}% completed</p>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center mt-10">
            <p className="text-xl text-gray-300 mb-4">🚧 No problems found. Start solving to see progress!</p>
            <button className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full text-white font-bold hover:scale-105 transition transform">
              Start Solving
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Dashboard;
