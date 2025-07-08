import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState('Guest');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user info
        const userRes = await axios.get('http://localhost:5000/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        setUser(userRes.data.username || 'Guest');

        // Fetch dashboard progress
        const progressRes = await axios.get('http://localhost:5000/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
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

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-gray-200 border-opacity-10 mt-12"
      >
        <h1 className="text-5xl font-extrabold text-white text-center mb-10 tracking-wide">
          🚀 Welcome, <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">{user}</span>
        </h1>

        {loading ? (
          <p className="text-gray-300 text-center text-lg animate-pulse">Loading your dashboard...</p>
        ) : data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((item, index) => {
              // 🔥 Fallbacks and progress calculation
              const solved = parseInt(item.solved) || 0;
              const total = parseInt(item.total) || 1; // avoid division by 0
              let progressPercent = Math.round((solved / total) * 100);

              // If API gives percentage directly (fallback)
              if (item.percentage !== undefined) {
                progressPercent = Math.min(parseInt(item.percentage), 100);
              }

              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 bg-opacity-60 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300"
                >
                  <h2 className="text-2xl font-semibold text-white mb-3">{item.title}</h2>
                  <p className="text-gray-300 mb-4">{item.description || 'No description available.'}</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 text-sm">{progressPercent}% completed</p>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400 text-center italic">
            🚧 No problems found. Start solving to see progress!
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default Dashboard;
