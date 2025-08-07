import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/cx.png";
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [username, setUsername] = useState("Guest");
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setUsername("Guest");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(res.data.username || "Guest");
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        setUsername("Guest");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const navLinkStyle = (path) =>
    location.pathname === path
      ? "text-cyan-400 font-bold"
      : "hover:text-cyan-400 transition duration-300";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800/60 backdrop-blur-lg shadow-lg border-b border-gray-700 px-6 py-3 flex justify-between items-center text-white text-[16px] font-semibold">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={Logo} alt="CodeX Logo" className="h-10 w-10 rounded-full border border-gray-600" />
        <span className="text-lg md:text-xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          CodeX Playground
        </span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/" className={navLinkStyle("/")}>Home</Link>
        <Link to="/editor" className={navLinkStyle("/editor")}>Web Dev Editor</Link>
        <Link to="/cpp" className={navLinkStyle("/cpp")}>C++ Editor</Link>
        <Link to="/python" className={navLinkStyle("/python")}>Python Editor</Link>
        <Link to="/js" className={navLinkStyle("/js")}>JS Editor</Link>
        <Link to="/AI-Topic-Guide" className={navLinkStyle("/AI-Topic-Guide")}>DSA Guide</Link>
        <Link to="/mentorship" className={navLinkStyle("/mentorship")}>Mentorship AI</Link>
      </div>

      {/* User Info */}
      <div className="hidden md:flex items-center gap-4">
        {!loading && (
          username !== "Guest" ? (
            <>
              <span>
                Hi, <span className="font-bold text-purple-400">{username}</span>
              </span>
              <Link to="/dashboard" className="hover:text-green-400 transition duration-300">Dashboard</Link>
              <Link to="/logout" className="hover:text-red-400 transition duration-300">Logout</Link>
            </>
          ) : (
            <>
              <span>Hi, Guest</span>
              <Link to="/login" className="hover:text-green-400 transition duration-300">Login</Link>
              <Link to="/signup" className="hover:text-blue-400 transition duration-300">Sign Up</Link>
            </>
          )
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="focus:outline-none">
          {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800/90 backdrop-blur-md shadow-md py-4 flex flex-col gap-4 px-6">
          <Link to="/" onClick={toggleMobileMenu} className={navLinkStyle("/")}>Home</Link>
          <Link to="/editor" onClick={toggleMobileMenu} className={navLinkStyle("/editor")}>Web Dev Editor</Link>
          <Link to="/cpp" onClick={toggleMobileMenu} className={navLinkStyle("/cpp")}>C++ Editor</Link>
          <Link to="/python" onClick={toggleMobileMenu} className={navLinkStyle("/python")}>Python Editor</Link>
          <Link to="/js" onClick={toggleMobileMenu} className={navLinkStyle("/js")}>JS Editor</Link>
          <Link to="/AI-Topic-Guide" onClick={toggleMobileMenu} className={navLinkStyle("/AI-Topic-Guide")}>DSA Guide</Link>
          <Link to="/mentorship" onClick={toggleMobileMenu} className={navLinkStyle("/mentorship")}>Mentorship AI</Link>

          {!loading && (
            username !== "Guest" ? (
              <>
                <Link to="/dashboard" onClick={toggleMobileMenu} className="hover:text-green-400">Dashboard</Link>
                <Link to="/logout" onClick={toggleMobileMenu} className="hover:text-red-400">Logout</Link>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMobileMenu} className="hover:text-green-400">Login</Link>
                <Link to="/signup" onClick={toggleMobileMenu} className="hover:text-blue-400">Sign Up</Link>
              </>
            )
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
