import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHtml5, FaPython, FaJsSquare } from 'react-icons/fa'
import { CgCPlusPlus } from 'react-icons/cg'
import { motion } from 'framer-motion'
import axios from 'axios'
import Array from './Array'

function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) {
          setLoading(false)
          return
        }

        const res = await axios.get('http://localhost:5000/api/me', {
          headers: { Authorization: `Bearer ${token}` },
        })

        setUser(res.data.username || 'Guest')
      } catch (err) {
        console.error('User not logged in:', err.message)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-gray-900 text-white">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    )
  }

  return (
    <>
      {/* 🌟 Hero Section */}
      <div className="relative w-full min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        {/* 🎨 Floating Blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-yellow-400 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-8"
        >
          🚀 Welcome {user ? `${user}` : 'to CodeX'}
        </motion.h1>

        {user && (
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            You're <span className="text-green-400 font-bold">{user.progress}%</span> done with your DSA journey.
          </p>
        )}

        {/* 🎯 Editor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 w-full max-w-6xl">
          {/* 🌐 Web Dev */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl"
          >
            <FaHtml5 className="text-orange-400 text-5xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Web Dev Editor</h3>
            <p className="text-gray-300 mb-4">
              Build and test HTML, CSS, and JS projects directly in your browser.
            </p>
            <Link
              to="/editor"
              className="mt-auto bg-gradient-to-br from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300"
            >
              Launch
            </Link>
          </motion.div>

          {/* 💻 C++ */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl"
          >
            <CgCPlusPlus className="text-blue-400 text-5xl mb-4" />
            <h3 className="text-xl font-bold mb-2">C++ Editor</h3>
            <p className="text-gray-300 mb-4">
              Compile and run C++ code with ease and lightning speed.
            </p>
            <Link
              to="/cpp"
              className="mt-auto bg-gradient-to-br from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300"
            >
              Launch
            </Link>
          </motion.div>

          {/* 🐍 Python */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl"
          >
            <FaPython className="text-yellow-400 text-5xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Python Editor</h3>
            <p className="text-gray-300 mb-4">
              Write, execute, and debug Python scripts right in your browser.
            </p>
            <Link
              to="/python"
              className="mt-auto bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300"
            >
              Launch
            </Link>
          </motion.div>

          {/* ⚡ JavaScript */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl"
          >
            <FaJsSquare className="text-yellow-300 text-5xl mb-4" />
            <h3 className="text-xl font-bold mb-2">JavaScript Editor</h3>
            <p className="text-gray-300 mb-4">
              Run JavaScript code in a powerful browser-based environment.
            </p>
            <Link
              to="/js"
              className="mt-auto bg-gradient-to-br from-green-300 to-yellow-400 hover:from-green-400 hover:to-yellow-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300"
            >
              Launch
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 🚀 Roadmap Section */}
      <div className="w-full bg-gradient-to-br from-[#1f1f2e] via-[#28293d] to-[#1a1a2f] py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            🚀 Roadmap to Web Development
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Frontend */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-[#27293d] rounded-2xl p-6 text-white shadow-lg border border-gray-700"
            >
              <h3 className="text-2xl font-bold text-cyan-400 mb-3">🎨 Frontend</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>HTML & CSS Basics</li>
                <li>JavaScript ES6+</li>
                <li>React.js & Hooks</li>
                <li>TailwindCSS / SCSS</li>
                <li>Responsive Design</li>
              </ul>
            </motion.div>

            {/* Backend */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-[#27293d] rounded-2xl p-6 text-white shadow-lg border border-gray-700"
            >
              <h3 className="text-2xl font-bold text-green-400 mb-3">🛠️ Backend</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Node.js Basics</li>
                <li>Express.js API Development</li>
                <li>MongoDB & Mongoose</li>
                <li>Authentication (JWT)</li>
                <li>REST APIs & Middleware</li>
              </ul>
            </motion.div>

            {/* Full Stack */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-[#27293d] rounded-2xl p-6 text-white shadow-lg border border-gray-700"
            >
              <h3 className="text-2xl font-bold text-purple-400 mb-3">🌐 Full Stack</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Frontend + Backend Integration</li>
                <li>Deployments (Vercel, Render)</li>
                <li>Version Control (Git & GitHub)</li>
                <li>WebSocket / Real-time Apps</li>
                <li>Performance Optimization</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 📚 Array Problemset */}
      <Array />
    </>
  )
}

export default Home
