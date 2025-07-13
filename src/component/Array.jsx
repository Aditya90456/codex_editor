import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const problems = [
  { id: 1, title: 'Find the Largest Element', tags: ['Easy'], difficulty: 'Easy' },
  { id: 2, title: 'Rotate Array by K Steps', tags: ['Medium'], difficulty: 'Medium' },
  { id: 3, title: 'Kadane’s Algorithm', tags: ['Medium'], difficulty: 'Medium' },
  { id: 4, title: 'Merge Intervals', tags: ['Hard'], difficulty: 'Hard' },
  { id: 5, title: 'Subarray with Given Sum', tags: ['Easy'], difficulty: 'Easy' },
  { id: 6, title: 'Next Permutation', tags: ['Hard'], difficulty: 'Hard' },
];

function Array() {
  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white overflow-hidden py-12">
      {/* Decorative Background Blobs */}
      <div className="absolute -top-16 -left-16 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>

      {/* Glass Card */}
      <motion.div
        className="w-full max-w-4xl backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12 z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text mb-6"
        >
          📚 Array Problemset
        </motion.h1>

        <p className="text-gray-200 text-center text-lg leading-relaxed mb-8">
          Master arrays with these curated problems, ranging from beginner to advanced level.
        </p>

        {/* Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {problems.map((problem) => (
            <motion.div
              key={problem.id}
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-5 shadow-lg transition duration-300 cursor-pointer hover:bg-white/20"
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-2">
                {problem.title}
              </h3>
              <p className="text-gray-300 mb-2">
                Difficulty: <span className={`font-bold ${problem.difficulty === 'Hard' ? 'text-red-400' : problem.difficulty === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>{problem.difficulty}</span>
              </p>
              <div className="flex gap-2">
                {problem.tags.map((tag, index) => (
                  <span key={index} className="bg-white/20 px-3 py-1 rounded-full text-sm text-gray-200">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex justify-center mt-10"
        >
          <Link
            to="/prob"
            className="inline-flex items-center gap-2 bg-gradient-to-br from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-medium py-3 px-8 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            🚀 Explore All Problems
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 w-full py-4 bg-black/50 text-center border-t border-white/10">
        <p className="text-sm text-gray-400 tracking-wide">© 2025 CodeX. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Array;
