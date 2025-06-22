import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Array() {
  return (
    <div className="flex absolute top-[109%] w-full h-full flex-col items-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <motion.div
        className="w-full max-w-4xl bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-10 shadow-2xl mt-[22%]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold text-white text-center mb-8">Array Problemset</h1>
        <p className="text-gray-300 text-center text-lg mb-8">
          Arrays are one of the most fundamental data structures in programming. They allow you to store multiple values in a single variable and access them using an index.
        </p>
        <div className="flex justify-center items-center mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="ml-4"
          >
            <Link
              to="/prob"
              className="text-white hover:text-gray-400 bg-blue-500 hover:bg-blue-600 font-bold py-3 px-6 rounded-full transition-all duration-300"
            >
              Problem Set
            </Link>
          </motion.div>
        </div>
      </motion.div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gray-900 flex justify-center items-center">
        <p className="text-white text-sm">© 2025 CodeX. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Array;