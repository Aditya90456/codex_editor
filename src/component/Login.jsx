import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      const token = res.data.token;
      if (token) {
        localStorage.setItem('authToken', token); // ✅ Store the token
        console.log('Token stored ✅:', token);

        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        console.error('Login failed: No token received ❌');
      }
    } catch (err) {
      console.error('Login error ❌:', err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-black bg-opacity-30 backdrop-blur-md rounded-lg p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 rounded-lg bg-gray-800 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-lg bg-gray-800 text-white"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;