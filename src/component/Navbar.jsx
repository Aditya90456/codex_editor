import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/cx.png';
import axios from 'axios';

function Navbar() {
  const [username, setUsername] = useState('Guest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setUsername('Guest');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(res.data.username || 'Guest');
      } catch (error) {
        console.error('Error fetching user:', error.response?.data || error.message);
        setUsername('Guest');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-800/60 backdrop-blur-lg shadow-lg border-b border-gray-700 text-white text-[16px] font-semibold px-6 py-3 flex justify-between items-center">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={Logo} alt="CodeX Logo" className="h-10 w-10 rounded-full border border-gray-600" />
        <span className="text-lg md:text-xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          CodeX Editor
        </span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/" className="hover:text-cyan-400 transition duration-300">Home</Link>
        <Link to="/editor" className="hover:text-cyan-400 transition duration-300">Web Dev Editor</Link>
        <Link to="/cpp" className="hover:text-cyan-400 transition duration-300">C++ Editor</Link>
        <Link to="/AI-Topic-Guide" className="hover:text-cyan-400 transition duration-300">DSA Guide</Link>
        <Link to="/mentorship" className="hover:text-cyan-400 transition duration-300">Mentorship AI Program </Link>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        {!loading && (
          username !== 'Guest' ? (
            <>
              <span className="hidden md:inline">Hi, <span className="font-bold text-purple-400">{username}</span></span>
              <Link to="/dashboard" className="hover:text-green-400 transition duration-300">Dashboard</Link>
              <Link to="/logout" className="hover:text-red-400 transition duration-300">Logout</Link>
            </>
          ) : (
            <>
              <span className="hidden md:inline">Hi, Guest</span>
              <Link to="/login" className="hover:text-green-400 transition duration-300">Login</Link>
              <Link to="/signup" className="hover:text-blue-400 transition duration-300">Sign Up</Link>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default Navbar;
