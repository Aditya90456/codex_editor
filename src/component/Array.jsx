import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Array() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Glass Card */}
      <motion.div
        className="w-full max-w-4xl backdrop-blur-xl bg-gray-800/40 border border-gray-700 rounded-3xl shadow-2xl p-10 md:p-14 mt-12 md:mt-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text mb-6"
        >
          Array Problemset
        </motion.h1>

        <p className="text-gray-300 text-center text-lg leading-relaxed mb-8">
          Arrays are one of the most fundamental data structures in programming. 
          They allow you to store multiple values in a single variable and access them using an index.
        </p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center"
        >
          <Link
            to="/prob"
            className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Explore Problem Set
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full py-4 bg-gray-900/80 text-center border-t border-gray-700">
        <p className="text-sm text-gray-400">© 2025 CodeX. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Array;
