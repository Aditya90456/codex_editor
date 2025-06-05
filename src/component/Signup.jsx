import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Login from './Login';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('❌ Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/signup', {
        username,
        password,
        confirmPassword, // ✅ must match backend
      });

      if (res.data.success) {
        setMessage('✅ User registered successfully!');
      } else {
        setMessage(`❌ ${res.data.message}`);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Server error';
      setMessage(`❌ ${msg}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <motion.div
        className="w-full max-w-md bg-black bg-opacity-20 backdrop-blur-md rounded-lg p-8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.03 }}
      >
        <h2 className="text-3xl text-white font-semibold text-center mb-4">Create an Account</h2>
        <p className="text-gray-300 text-center mb-6">Sign up to access your dashboard</p>

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

          <div className="mb-4">
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

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="text-gray-300 block mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {message && (
            <div
              className={`mb-4 text-sm text-center ${
                message.startsWith('✅') ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={()=>{
            window.location.href = "/login";
            }}
          >
            Sign Up
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Signup;
