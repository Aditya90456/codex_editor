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
            Authorization: `Bearer ${token}`
          }
        });

        setUsername(res.data.username || 'Guest');
      } catch (error) {
        console.error('Error fetching user:', error);
        setUsername('Guest');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="text-white text-[16px] font-bold bg-gray-800 w-full h-16 flex flex-row justify-between items-center px-4 shadow-md">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={Logo} alt="CodeX Logo" className="h-10 w-10" />
        <span>CodeX Editor</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/editor" className="hover:text-gray-400">Web Dev Editor</Link>
        <Link to="/cpp" className="hover:text-gray-400">C++ Editor</Link>
        <Link to="/AI-Topic-Guide" className="hover:text-gray-400">DSA Topic Guide</Link>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        {!loading && (
          username !== 'Guest' ? (
            <>
              <span>Welcome, {username}</span>
              <Link to="/dashboard" className="hover:text-gray-400">Dashboard</Link>
              <Link to="/logout" className="hover:text-gray-400">Logout</Link>
            </>
          ) : (
            <>
              <span>Welcome, Guest</span>
              <Link to="/login" className="hover:text-gray-400">Login</Link>
              <Link to="/signup" className="hover:text-gray-400">Sign Up</Link>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default Navbar;
