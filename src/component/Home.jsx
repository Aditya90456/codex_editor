import { motion } from "framer-motion";
import { useState , useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHtml5, FaPython, FaJsSquare, FaLaptopCode, FaBrain, FaUserCircle, FaEnvelope } from "react-icons/fa";
import { CgCPlusPlus } from "react-icons/cg";

function PremiumDashboard() {
  const  [user, setUser] = useState()
  const [loading, setLoading] = useState(true);
  // Fetch user data from API 
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setUser('Guest');
      setLoading(false);
      return;
    }
    const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user',{
        headers: { Authorization: `Bearer ${token}`,
      },
      }); // Adjust the endpoint as needed
      setUser(response.data.username || "Guest");
    } catch (error) {   
      console.error("Error fetching user data:", error);
      setUser('Guest');
    } finally {
      setLoading(false);
    }

  }
    fetchUserData();
  }, []);
  
  const editors = [
    {
      Icon: CgCPlusPlus,
      color: "text-blue-500",
      title: "C++ Editor",
      description: "Write, compile & debug C++ code online instantly.",
      link: "/cpp",
    },
    {
      Icon: FaPython,
      color: "text-yellow-500",
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
      color: "text-orange-500",
      title: "Web Playground",
      description: "HTML/CSS/JS playground for frontend development.",
      link: "/editor",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 px-4 py-12">
      {/* 🌟 Header */}
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent text-center mb-12">
        🚀 CodeX Playground {user}
      </h1>

      {/* 💻 Editors Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          💻 CodeX Editors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {editors.map((editor, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="p-6 bg-white/50 backdrop-blur-lg border border-blue-100 rounded-3xl shadow-xl text-center"
            >
              <editor.Icon className={`${editor.color} text-5xl mb-4 mx-auto`} />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{editor.title}</h3>
              <p className="text-gray-600 mb-6">{editor.description}</p>
              <Link
                to={editor.link}
                className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:from-blue-600 hover:to-cyan-600 transition"
              >
                Open {editor.title}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🛠 Roadmap & Development Cards */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          🛠 Explore Roadmaps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* DSA Roadmap Card */}
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="p-6 bg-white/50 backdrop-blur-lg border border-blue-100 rounded-3xl shadow-xl text-center"
          >
            <FaBrain className="text-blue-500 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">DSA Roadmap</h3>
            <p className="text-gray-600 mb-6">
              Master DSA with structured learning and 300+ coding problems.
            </p>
            <Link
              to="/dsaroadmap"
              className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:from-blue-600 hover:to-cyan-600 transition"
            >
              Start DSA
            </Link>
          </motion.div>

          {/* Development Zone Card */}
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-6 bg-white/50 backdrop-blur-lg border border-blue-100 rounded-3xl shadow-xl text-center"
          >
            <FaLaptopCode className="text-blue-500 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Development Zone</h3>
            <p className="text-gray-600 mb-6">
              Build frontend & backend projects using modern tech stacks.
            </p>
            <Link
              to="/developmentroadmap"
              className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:from-blue-600 hover:to-cyan-600 transition"
            >
              Start Building
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 👤 About Me */}
      <section className="mb-12">
        <motion.div
          whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(59, 130, 246, 0.3)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto bg-white/50 backdrop-blur-lg border border-blue-100 rounded-3xl shadow-xl p-8 text-center"
        >
          <FaUserCircle className="text-blue-500 text-6xl mb-4 mx-auto" />
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
            Aditya Bakshi
          </h2>
          <p className="text-gray-600 mb-4">
            Full Stack Developer 🚀 | DSA Enthusiast 🧠 | Open Source Contributor 🌟
          </p>
          <p className="text-gray-500 mb-6">
            Passionate about building modern web apps and solving challenging coding problems. Currently working on full-stack projects and contributing to open source.
          </p>
          <a
            href="mailto:adityabakshi1011@gmail.com"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow hover:from-blue-600 hover:to-cyan-600 transition duration-300"
          >
            <FaEnvelope className="mr-2" /> Contact Me
          </a>
        </motion.div>
      </section>

      {/* 📄 Footer */}
      <footer className="text-gray-500 mt-6 text-center">
        © 2025 CodeX by Aditya | Built with ❤️ and React
      </footer>
    </div>
  );
}

export default PremiumDashboard;
