import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await Axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        alert('✅ Login successful!');
        window.location.href = "/dashboard"; // ✅ Redirect only after success
      } else {
        setError('Login failed!');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Server error');
      console.error('Login error:', error.response || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-gray-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.03 }}
        className="w-full max-w-md bg-black bg-opacity-10 backdrop-blur-md rounded-lg p-8 shadow-2xl"
      >
        <h2 className="text-3xl text-white font-semibold text-center mb-4">Welcome Back 👋</h2>
        <p className="text-gray-300 text-center mb-6">Login to access your dashboard</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="text-gray-300 block mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="text-gray-300 block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="mb-4 text-red-400 text-sm text-center">
              ❌ {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
