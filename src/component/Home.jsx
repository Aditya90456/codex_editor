import { motion, AnimatePresence, useViewportScroll, useTransform } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHtml5, FaPython, FaJsSquare, FaLaptopCode, FaBrain, FaUserCircle, FaEnvelope, FaMoon, FaSun, FaSearch, FaSignOutAlt, FaJava } from "react-icons/fa";
import { CgCPlusPlus } from "react-icons/cg";
import { AiFillRobot } from "react-icons/ai"; // New icon for AI/ML

function PremiumDashboard() {
  const [user, setUser] = useState("Guest");
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [searchQuery, setSearchQuery] = useState(""); // New: Search state

  const { scrollYProgress } = useViewportScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]); // Subtle parallax

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token || token === "undefined" || token === "null") {
      setUser("Guest");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.username || "Guest");
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser("Guest");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // Adjust to your login route
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
      color: "text-orange-300",
      title: "JavaScript Editor",
      description: "Quickly execute JavaScript code in real-time.",
      link: "/js",
    },
    {
      Icon: FaHtml5,
      color: "text-red-500",
      title: "Web Playground",
      description: "HTML/CSS/JS playground for frontend development.",
      link: "/editor",
    },
    // New: More Editor
    {
      Icon: FaJava,
      color: "text-blue-400",
      title: "Java Editor",
      description: "Compile and run Java code with ease.",
      link: "/java",
    },
  ];

  const roadmaps = [
    {
      Icon: FaBrain,
      color: "text-red-400",
      title: "DSA Roadmap",
      description: "Master DSA with structured learning and 300+ coding problems.",
      link: "/dsaroadmap",
    },
    {
      Icon: FaLaptopCode,
      color: "text-orange-400",
      title: "Development Zone",
      description: "Build frontend & backend projects using modern tech stacks.",
      link: "/developmentroadmap",
    },
    // New: More Roadmap
    {
      Icon: AiFillRobot,
      color: "text-purple-400",
      title: "AI/ML Zone",
      description: "Dive into AI and machine learning with hands-on projects.",
      link: "/airoadmap",
    },
  ];

  // Memoized filtered lists for performance
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-4xl"
        >
          🚀
        </motion.div>
        <span className="ml-4 text-lg">Loading your premium dashboard...</span>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen px-4 py-12 relative overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-100 text-gray-900"
      }`}
    >
      {/* Enhanced Particle Background with Colors */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(70)].map((_, i) => ( // More particles
          <motion.div
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              background: `radial-gradient(circle, ${Math.random() > 0.5 ? "#FF4500" : "#FF7518"}, transparent)`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Controls: Theme Toggle & Logout */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 transition"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <FaMoon className="text-white" /> : <FaSun className="text-yellow-500" />}
        </button>
        <button
          onClick={handleLogout}
          className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 transition"
          aria-label="Logout"
        >
          <FaSignOutAlt className="text-white" />
        </button>
      </div>

      {/* 🌟 Hero Header with Parallax */}
      <motion.div style={{ y: parallaxY }} className="text-center mt-12 mb-7">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent drop-shadow-lg"
        >
          🚀 CodeX Playground, {user}
        </motion.h1>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="inline-block px-4 py-1 mt-2 text-sm font-medium bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-full shadow-neon"
        >
          Premium Access ✨
        </motion.span>
      </motion.div>

      {/* 🔍 Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className={`flex items-center p-2 rounded-full border ${
          theme === "dark" ? "border-red-900 bg-gray-800/70" : "border-orange-200 bg-white/70"
        }`}>
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search editors or roadmaps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none"
            aria-label="Search"
          />
        </div>
      </div>

      {/* 📊 User Stats Section (New) */}
      <AnimatePresence>
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-8 drop-shadow-md">📊 Your Progress</h2>
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
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 69, 0, 0.3)" }}
                className={`p-4 rounded-2xl text-center ${
                  theme === "dark"
                    ? "bg-gray-800/70 backdrop-blur-lg border border-red-900"
                    : "bg-white/70 border border-orange-200"
                }`}
              >
                <stat.icon className="text-3xl mb-2 mx-auto text-orange-500" />
                <h3 className="text-xl font-semibold">{stat.value}</h3>
                <p className="text-sm opacity-80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </AnimatePresence>

      {/* 💻 Editors Section */}
      <AnimatePresence>
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8 drop-shadow-md">💻 CodeX Editors</h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate="visible"
          >
            {filteredEditors.map((editor) => (
              <motion.div
                key={editor.title}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 69, 0, 0.4)" }} // Enhanced glow
                className={`p-6 rounded-3xl shadow-lg text-center transition-all duration-300 relative overflow-hidden ${
                  theme === "dark"
                    ? "bg-gray-800/70 backdrop-blur-lg border border-red-900 hover:shadow-red-500/40"
                    : "bg-white/70 border border-orange-200 hover:shadow-orange-300/40"
                }`}
              >
                {/* Gradient Overlay for Beauty */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-red-900/10 pointer-events-none" />
                <editor.Icon className={`${editor.color} text-5xl mb-4 mx-auto`} />
                <h3 className="text-2xl font-semibold mb-2">{editor.title}</h3>
                <p className="text-sm mb-6 opacity-80">{editor.description}</p>
                <Link
                  to={editor.link}
                  tabIndex={0}
                  aria-label={`Open ${editor.title}`}
                  onClick={() => console.log(`Opened ${editor.title}`)}
                  className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium hover:from-red-700 hover:to-orange-600 transition-shadow hover:shadow-neon"
                >
                  Open {editor.title}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </AnimatePresence>

      {/* 🛠 Roadmap Section */}
      <AnimatePresence>
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8 drop-shadow-md">🛠 Explore Roadmaps</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto" // Adjusted for more items
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate="visible"
          >
            {filteredRoadmaps.map((roadmap) => (
              <motion.div
                key={roadmap.title}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 69, 0, 0.4)" }}
                className={`p-6 rounded-3xl shadow-lg text-center transition-all duration-300 relative overflow-hidden ${
                  theme === "dark"
                    ? "bg-gray-800/70 backdrop-blur-lg border border-red-900 hover:shadow-red-500/40"
                    : "bg-white/70 border border-orange-200 hover:shadow-orange-300/40"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-orange-900/10 pointer-events-none" />
                <roadmap.Icon className={`${roadmap.color} text-5xl mb-4 mx-auto`} />
                <h3 className="text-2xl font-semibold mb-2">{roadmap.title}</h3>
                <p className="text-sm mb-6 opacity-80">{roadmap.description}</p>
                <Link
                  to={roadmap.link}
                  tabIndex={0}
                  aria-label={`Start ${roadmap.title}`}
                  onClick={() => console.log(`Started ${roadmap.title}`)}
                  className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white hover:from-red-700 hover:to-orange-600 transition-shadow hover:shadow-neon"
                >
                  Start {roadmap.title}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </AnimatePresence>

      {/* 👤 About Me */}
      <AnimatePresence>
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255, 69, 0, 0.4)" }}
            className={`max-w-3xl mx-auto rounded-3xl shadow-lg p-8 text-center transition-all duration-300 relative overflow-hidden ${
              theme === "dark"
                ? "bg-gray-800/70 backdrop-blur-lg border border-red-900 hover:shadow-red-500/40"
                : "bg-white/70 border border-orange-200 hover:shadow-orange-300/40"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-red-900/10 pointer-events-none" />
            <FaUserCircle className="text-red-400 text-6xl mb-4 mx-auto" />
            <h2 className="text-3xl font-bold mb-2">Aditya Bakshi</h2>
            <p className="opacity-80 mb-4 text-sm">
              Full Stack Developer 🚀 | DSA Enthusiast 🧠 | Open Source Contributor 🌟
            </p>
            <p className="opacity-70 mb-6 text-xs">
              Passionate about building modern web apps and solving challenging coding problems.
            </p>
            <a
              href="mailto:adityabakshi1011@gmail.com"
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white hover:from-red-700 hover:to-orange-600 transition-shadow hover:shadow-neon"
            >
              <FaEnvelope className="mr-2" /> Contact Me
            </a>
          </motion.div>
        </motion.section>
      </AnimatePresence>

      {/* 📄 Footer */}
      <footer className="mt-6 text-center text-sm opacity-70">
        © 2025 CodeX by Aditya | Built with ❤️ and React
      </footer>
    </div>
  );
}

export default PremiumDashboard;