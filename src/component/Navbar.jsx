import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/cx.png";
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

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
      ? "relative text-cyan-400 font-bold after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r from-cyan-400 to-purple-500 after:rounded-full"
      : "relative hover:text-cyan-400 transition duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r from-cyan-400 to-purple-500 after:rounded-full hover:after:w-full after:transition-all after:duration-300";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/60 backdrop-blur-lg shadow-lg border-b border-gray-700 px-6 py-3 flex justify-between items-center text-white text-[16px] font-semibold">
      
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
              <span className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                  {username[0].toUpperCase()}
                </div>
                <span className="font-bold text-purple-400">{username}</span>
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-gray-900/90 backdrop-blur-md shadow-md py-4 flex flex-col gap-4 px-6"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
