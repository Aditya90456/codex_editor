import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import axios from "axios";
import { FaHtml5, FaPython, FaJsSquare, FaLaptopCode, FaBrain, FaUserCircle, FaEnvelope, FaMoon, FaSun, FaSearch, FaSignOutAlt, FaJava } from "react-icons/fa";
import { CgCPlusPlus } from "react-icons/cg";
import { AiFillRobot } from "react-icons/ai"; // New icon for AI/ML

// Dummy component to simulate Link from react-router-dom
const Link = ({ to, children, ...props }) => (
  <a href={to} {...props}>
    {children}
  </a>
);

function PremiumDashboard() {
  const [user, setUser] = useState("Guest");
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [searchQuery, setSearchQuery] = useState("");

  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]); // Subtle parallax

  // Dummy useEffect to simulate data fetching without a real API
  useEffect(() => {
    // Simulating a fetch delay
    const timer = setTimeout(() => {
      setLoading(false);
      // In a real app, you would fetch and set the user here
      // For this example, we'll keep it as "Guest"
      console.log("Dashboard loaded, user is 'Guest'");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLogout = () => {
    // In a real app, this would clear authentication and redirect
    console.log("Logged out.");
    // window.location.href = "/login"; // Dummy redirection
  };

  const editors = [
    {
      Icon: CgCPlusPlus,
      color: "text-red-400",
      title: "C++ Editor",
      description: "Write, compile & debug C++ code online instantly.",
      link: "/cpp",
    },
    {
      Icon: FaPython,
      color: "text-orange-400",
      title: "Python Editor",
      description: "Run Python scripts with zero setup in the browser.",
      link: "/python",
    },
    {
      Icon: FaJsSquare,
      color: "text-yellow-400",
      title: "JavaScript Editor",
      description: "Quickly execute JavaScript code in real-time.",
      link: "/js",
    },
    {
      Icon: FaHtml5,
      color: "text-blue-500",
      title: "Web Playground",
      description: "HTML/CSS/JS playground for frontend development.",
      link: "/editor",
    },
    {
      Icon: FaJava,
      color: "text-pink-400",
      title: "Java Editor",
      description: "Compile and run Java code with ease.",
      link: "/java",
    },
  ];

  const roadmaps = [
    {
      Icon: FaBrain,
      color: "text-purple-400",
      title: "DSA Roadmap",
      description: "Master DSA with structured learning and 300+ coding problems.",
      link: "/start",
    },
    {
      Icon: FaLaptopCode,
      color: "text-cyan-400",
      title: "Development Zone",
      description: "Build frontend & backend projects using modern tech stacks.",
      link: "/developmentroadmap",
    },
    {
      Icon: AiFillRobot,
      color: "text-green-400",
      title: "AI/ML Zone",
      description: "Dive into AI and machine learning with hands-on projects.",
      link: "/airoadmap",
    },
  ];

  const filteredEditors = useMemo(
    () => editors.filter((e) => e.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  const filteredRoadmaps = useMemo(
    () => roadmaps.filter((r) => r.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#070914] text-white font-sans">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="text-6xl text-purple-400"
        >
          <AiFillRobot />
        </motion.div>
        <span className="mt-6 text-xl text-gray-400 tracking-wide">Loading your premium dashboard...</span>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen px-4 py-12 relative overflow-hidden font-sans transition-colors duration-500 ${
        theme === "dark"
          ? "bg-[#070914] text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <AnimatePresence>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-30"
              style={{
                background: `radial-gradient(circle, ${Math.random() > 0.5 ? "#6366F1" : "#A855F7"}, transparent)`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 8 + 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Controls: Theme Toggle & Logout */}
        <div className="absolute top-4 right-4 flex space-x-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${
              theme === "dark"
                ? "bg-slate-800 hover:bg-slate-700 text-yellow-300"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={handleLogout}
            className={`p-2 rounded-full transition-all duration-300 ${
              theme === "dark"
                ? "bg-slate-800 hover:bg-slate-700 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
            aria-label="Logout"
          >
            <FaSignOutAlt />
          </button>
        </div>

        {/* 🌟 Hero Header with Parallax */}
        <motion.div style={{ y: parallaxY }} className="text-center mt-12 mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent drop-shadow-lg"
          >
            🚀 Welcome back, {user}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="inline-block px-4 py-1.5 mt-4 text-sm font-semibold bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full shadow-lg"
          >
            Premium Access ✨
          </motion.p>
        </motion.div>

        {/* 🔍 Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className={`flex items-center p-3 rounded-full shadow-xl transition-colors duration-300 backdrop-blur-lg ${
            theme === "dark" ? "bg-slate-800/60 border border-slate-700" : "bg-white/60 border border-gray-300"
          }`}>
            <FaSearch className={`ml-2 text-xl ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
            <input
              type="text"
              placeholder="Search editors or roadmaps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full ml-4 bg-transparent outline-none placeholder:text-gray-500 text-lg ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              aria-label="Search"
            />
          </div>
        </div>

        {/* 📊 User Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">📊 Your Progress</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: "Problems Solved", value: "0", icon: FaBrain },
              { label: "Projects Built", value: "0", icon: FaLaptopCode },
              { label: "Hours Coded", value: "0", icon: FaUserCircle },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(74, 222, 128, 0.4)" }}
                className={`p-6 rounded-2xl text-center shadow-xl backdrop-blur-lg transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-slate-800/60 border border-slate-700"
                    : "bg-white/60 border border-gray-300"
                }`}
              >
                <stat.icon className={`text-4xl mb-3 mx-auto ${theme === "dark" ? "text-cyan-400" : "text-blue-500"}`} />
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 💻 Editors Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg">💻 CodeX Editors</h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate="visible"
          >
            {filteredEditors.map((editor) => (
              <motion.div
                key={editor.title}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(236, 72, 153, 0.5)" }}
                className={`p-6 rounded-3xl shadow-xl text-center transition-all duration-300 relative overflow-hidden backdrop-blur-lg ${
                  theme === "dark"
                    ? "bg-slate-800/60 border border-slate-700"
                    : "bg-white/60 border border-gray-300"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-900/10 pointer-events-none" />
                <editor.Icon className={`${editor.color} text-5xl mb-4 mx-auto`} />
                <h3 className="text-xl font-bold mb-2">{editor.title}</h3>
                <p className={`text-sm mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{editor.description}</p>
                <Link
                  to={editor.link}
                  tabIndex={0}
                  aria-label={`Open ${editor.title}`}
                  className="inline-block px-6 py-3 rounded-full text-white font-medium shadow-lg transition-all duration-300
                  bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl"
                >
                  Open Editor
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* 🛠 Roadmap Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent drop-shadow-lg">🛠 Explore Roadmaps</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate="visible"
          >
            {filteredRoadmaps.map((roadmap) => (
              <motion.div
                key={roadmap.title}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(52, 211, 153, 0.5)" }}
                className={`p-6 rounded-3xl shadow-xl text-center transition-all duration-300 relative overflow-hidden backdrop-blur-lg ${
                  theme === "dark"
                    ? "bg-slate-800/60 border border-slate-700"
                    : "bg-white/60 border border-gray-300"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-teal-900/10 pointer-events-none" />
                <roadmap.Icon className={`${roadmap.color} text-5xl mb-4 mx-auto`} />
                <h3 className="text-xl font-bold mb-2">{roadmap.title}</h3>
                <p className={`text-sm mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{roadmap.description}</p>
                <Link
                  to={roadmap.link}
                  tabIndex={0}
                  aria-label={`Start ${roadmap.title}`}
                  className="inline-block px-6 py-3 rounded-full text-white font-medium shadow-lg transition-all duration-300
                  bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 hover:shadow-xl"
                >
                  Start Roadmap
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* 👤 About Me */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(251, 191, 36, 0.5)" }}
            className={`max-w-3xl mx-auto rounded-3xl shadow-xl p-8 text-center transition-all duration-300 relative overflow-hidden backdrop-blur-lg ${
              theme === "dark"
                ? "bg-slate-800/60 border border-slate-700"
                : "bg-white/60 border border-gray-300"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-yellow-900/10 pointer-events-none" />
            <FaUserCircle className="text-yellow-400 text-6xl mb-4 mx-auto" />
            <h2 className="text-3xl font-bold mb-2">Aditya Bakshi</h2>
            <p className={`mb-4 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Full Stack Developer 🚀 | DSA Enthusiast 🧠 | Open Source Contributor 🌟
            </p>
            <p className={`mb-6 text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-700"}`}>
              Passionate about building modern web apps and solving challenging coding problems.
            </p>
            <a
              href="mailto:adityabakshi1011@gmail.com"
              className="inline-flex items-center px-6 py-3 rounded-full text-white font-medium shadow-lg transition-all duration-300
              bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 hover:shadow-xl"
            >
              <FaEnvelope className="mr-2" /> Contact Me
            </a>
          </motion.div>
        </motion.section>

        {/* 📄 Footer */}
        <footer className="mt-6 text-center text-sm text-gray-500">
          © 2025 CodeX by Aditya | Built with ❤️ and React
        </footer>
      </div>
    </div>
  );
}

// A simple wrapper to make the component runnable within the environment
export default function App() {
  return <PremiumDashboard />;
}
