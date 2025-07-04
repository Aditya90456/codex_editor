import React from 'react'
import { Link } from 'react-router-dom'
import { FaHtml5 } from 'react-icons/fa6'
import { CgCPlusPlus } from 'react-icons/cg'
import { motion } from 'framer-motion'
import Array from './Array'

function Home() {
  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white flex flex-col justify-center items-center relative">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="backdrop-blur-md bg-gray-800/60 border border-gray-700 shadow-2xl rounded-3xl p-8 md:p-12 text-center max-w-xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 120 }}
            className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
          >
            Welcome to CodeX
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-6"
          >
            Your go-to platform for Web Development & C++ coding.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/editor"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <FaHtml5 className="h-5 w-5" />
              Web Dev Editor
            </Link>

            <Link
              to="/cpp"
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <CgCPlusPlus className="h-5 w-5" />
              C++ Editor
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Array Component Section */}
      <div className="w-full bg-gray-900 flex justify-center items-center py-12">
        <Array />
      </div>
    </>
  )
}

export default Home
