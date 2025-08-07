import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHtml5, FaPython, FaJsSquare, FaLaptopCode, FaBrain, FaUserCircle, FaEnvelope } from "react-icons/fa";
import { CgCPlusPlus } from "react-icons/cg";

function PremiumDashboard() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-12 text-white">
      {/* 🌟 Header */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent text-center mb-12"
      >
        🚀 CodeX Playground {user}
      </motion.h1>

      {/* 💻 Editors Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-200 mb-8">
          💻 CodeX Editors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {editors.map((editor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="p-6 bg-gray-800/50 backdrop-blur-lg border border-red-900 rounded-3xl shadow-md text-center hover:shadow-red-500/20 transition"
            >
              <editor.Icon className={`${editor.color} text-5xl mb-4 mx-auto`} />
              <h3 className="text-2xl font-semibold text-white mb-2">{editor.title}</h3>
              <p className="text-gray-400 mb-6 text-sm">{editor.description}</p>
              <Link
                to={editor.link}
                className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium hover:from-red-700 hover:to-orange-600 transition"
              >
                Open {editor.title}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🛠 Roadmap Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-200 mb-8">
          🛠 Explore Roadmaps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* DSA Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.03 }}
            className="p-6 bg-gray-800/50 backdrop-blur-lg border border-red-900 rounded-3xl shadow-md text-center hover:shadow-red-500/20 transition"
          >
            <FaBrain className="text-red-400 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-white mb-2">DSA Roadmap</h3>
            <p className="text-gray-400 mb-6 text-sm">
              Master DSA with structured learning and 300+ coding problems.
            </p>
            <Link
              to="/dsaroadmap"
              className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white hover:from-red-700 hover:to-orange-600 transition"
            >
              Start DSA
            </Link>
          </motion.div>

          {/* Development Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            className="p-6 bg-gray-800/50 backdrop-blur-lg border border-red-900 rounded-3xl shadow-md text-center hover:shadow-red-500/20 transition"
          >
            <FaLaptopCode className="text-orange-400 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-white mb-2">Development Zone</h3>
            <p className="text-gray-400 mb-6 text-sm">
              Build frontend & backend projects using modern tech stacks.
            </p>
            <Link
              to="/developmentroadmap"
              className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white hover:from-red-700 hover:to-orange-600 transition"
            >
              Start Building
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 👤 About Me */}
      <section className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          className="max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-lg border border-red-900 rounded-3xl shadow-md p-8 text-center hover:shadow-red-500/20 transition"
        >
          <FaUserCircle className="text-red-400 text-6xl mb-4 mx-auto" />
          <h2 className="text-3xl font-bold text-white mb-2">Aditya Bakshi</h2>
          <p className="text-gray-400 mb-4 text-sm">
            Full Stack Developer 🚀 | DSA Enthusiast 🧠 | Open Source Contributor 🌟
          </p>
          <p className="text-gray-500 mb-6 text-xs">
            Passionate about building modern web apps and solving challenging coding problems.
          </p>
          <a
            href="mailto:adityabakshi1011@gmail.com"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-full hover:from-red-700 hover:to-orange-600 transition"
          >
            <FaEnvelope className="mr-2" /> Contact Me
          </a>
        </motion.div>
      </section>

      {/* 📄 Footer */}
      <footer className="text-gray-500 mt-6 text-center text-sm">
        © 2025 CodeX by Aditya | Built with ❤️ and React
      </footer>
    </div>
  );
}

export default PremiumDashboard;
