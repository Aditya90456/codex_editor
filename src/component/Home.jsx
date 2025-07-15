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
        <h1 className="text-3xl font-semibold animate-pulse">Loading...</h1>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-white text-gray-800">
      {/* 🏠 Hero Section */}
      <section className="flex flex-col justify-center items-center text-center py-20 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold mb-4"
        >
          Welcome {user ? user : 'to CodeX'}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mb-6"
        >
          Build. Compile. Debug. Track your DSA journey in one place.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex space-x-4"
        >
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/editor"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
          >
            Try Editor
          </Link>
        </motion.div>
      </section>

      {/* ✨ Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Explore Our Editors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              Icon={FaHtml5}
              color="text-orange-500"
              title="Web Dev"
              description="HTML, CSS, JS playground to build and test UI instantly."
              link="/editor"
            />
            <FeatureCard
              Icon={CgCPlusPlus}
              color="text-blue-500"
              title="C++"
              description="Write, compile, and debug C++ code effortlessly."
              link="/cpp"
            />
            <FeatureCard
              Icon={FaPython}
              color="text-yellow-500"
              title="Python"
              description="Run Python scripts and see results instantly."
              link="/python"
            />
            <FeatureCard
              Icon={FaJsSquare}
              color="text-yellow-400"
              title="JavaScript"
              description="Execute JavaScript code in a browser-based environment."
              link="/js"
            />
          </div>
        </div>
      </section>

      {/* 📚 Roadmap */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            🛠 Your Roadmap
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RoadmapCard
              title="Frontend"
              steps={['HTML/CSS', 'JavaScript', 'React.js', 'TailwindCSS']}
            />
            <RoadmapCard
              title="Backend"
              steps={['Node.js', 'Express.js', 'MongoDB', 'JWT Auth']}
            />
            <RoadmapCard
              title="Full Stack"
              steps={['Integrate Frontend & Backend', 'Deploy', 'Optimize']}
            />
          </div>
        </div>
      </section>

      {/* 📚 Array Sheet */}
      <Array />
    </div>
  )
}

function FeatureCard({ Icon, color, title, description, link }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition"
    >
      <Icon className={`${color} text-4xl mb-4`} />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to={link}
        className="inline-block mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Launch
      </Link>
    </motion.div>
  )
}

function RoadmapCard({ title, steps }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition"
    >
      <h3 className="text-lg font-semibold text-blue-600 mb-3">{title}</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ul>
    </motion.div>
  )
}

export default Home
