import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHtml5, FaPython, FaJsSquare, FaMap } from 'react-icons/fa'
import { CgCPlusPlus } from 'react-icons/cg'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

function CodexLanding() {
  const particlesInit = async (main) => {
    await loadFull(main)
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      {/* 🌀 Background Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 50 },
            size: { value: 3 },
            move: { enable: true, speed: 1.5 },
            links: { enable: true, color: '#ffffff', distance: 150 },
            opacity: { value: 0.4 },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* 🌟 Hero */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center py-20 space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent"
        >
          👨‍💻 Welcome to CodeX Playground
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl"
        >
          Run C++, Python, JavaScript, build resumes & level up your career.
        </motion.p>
      </div>

      {/* 💻 Editors Grid */}
      <section className="relative z-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          <EditorCard
            Icon={CgCPlusPlus}
            color="text-blue-400"
            title="C++ Editor"
            description="Write, compile and debug C++ code online."
            link="/cpp"
          />
          <EditorCard
            Icon={FaPython}
            color="text-yellow-400"
            title="Python Editor"
            description="Run Python scripts directly in your browser."
            link="/python"
          />
          <EditorCard
            Icon={FaJsSquare}
            color="text-yellow-300"
            title="JavaScript Editor"
            description="Test and execute JavaScript on the fly."
            link="/js"
          />
          <EditorCard
            Icon={FaHtml5}
            color="text-orange-400"
            title="Web Playground"
            description="HTML/CSS/JS playground for frontend dev."
            link="/editor"
          />
        </div>
      </section>

      {/* 📄 Resume Builder Section */}
      

      {/* 🛠 Development Roadmaps Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            🛠 Development Roadmaps
          </motion.h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
            Follow structured paths to master Frontend, Backend, Full-Stack, and DSA like a pro.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roadmaps.map((roadmap, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="p-6 bg-gradient-to-br from-blue-700 to-indigo-900 rounded-xl shadow-lg"
              >
                <div className="flex flex-col items-center text-center">
                  <FaMap size={50} className="text-green-300 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{roadmap.title}</h3>
                  <p className="text-gray-300 mb-4">{roadmap.description}</p>
                  <Link
                    to="/roadmap"
                    className="px-4 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition"
                  >
                    View Roadmap
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📄 Footer */}
      <footer className="relative z-10 py-4 text-center text-gray-400">
        © 2025 CodeX by Aditya | All editors & tools powered by CodeX Engine
      </footer>
    </div>
  )
}

const roadmaps = [
  { title: 'Frontend Roadmap', description: 'HTML, CSS, JS, React, Tailwind' },
  { title: 'Backend Roadmap', description: 'Node.js, Express, MongoDB, APIs' },
  { title: 'Full-Stack Roadmap', description: 'Combine frontend & backend mastery' },
  { title: 'DSA Roadmap', description: 'Ace Data Structures & Algorithms step by step' },
]

function EditorCard({ Icon, color, title, description, link }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="p-6 bg-white rounded-xl shadow-lg flex flex-col items-center text-center text-gray-800"
    >
      <Icon className={`${color} text-5xl mb-3`} />
      <h2 className="text-2xl font-bold mb-1">{title}</h2>
      <p className="text-sm mb-4">{description}</p>
      <Link
        to={link}
        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded hover:from-purple-600 hover:to-pink-600 transition"
      >
        Open {title}
      </Link>
    </motion.div>
  )
}

export default CodexLanding
                                                                                                