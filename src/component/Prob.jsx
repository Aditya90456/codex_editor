import React from 'react';
import { Link } from 'react-router-dom';

function Prob() {
  const problems = [
    { id: 1, title: 'Two Sum', difficulty: 'Easy', tags: ['Array', 'HashMap'] },
    { id: 2, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', tags: ['String', 'Sliding Window'] },
    { id: 3, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', tags: ['Array', 'Binary Search'] },
  ];

  return (
    <div className="w-full h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="w-full h-16 bg-gray-800 flex items-center justify-between px-6 mb-4">
        <h1 className="text-2xl font-bold">Problem Set</h1>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Add Problem
        </button>
      </div>

      {/* Problem List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map((problem) => (
          <div
            key={problem.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"

          >
            <h2 className="text-xl font-bold mb-2">{problem.title}</h2>
            <p className={`text-sm font-semibold mb-2 ${
              problem.difficulty === 'Easy'
                ? 'text-green-400'
                : problem.difficulty === 'Medium'
                ? 'text-yellow-400'
                : 'text-red-400'
            }`}>
              {problem.title === 'Two Sum' ? (
                <Link to="/two-sum" className="text-blue-400 hover:underline">
                  View Problem
                </Link>
              ) : problem.title === 'Longest Substring Without Repeating Characters' ? (
                <Link to="/longest-substring" className="text-blue-400 hover:underline">
                  View Problem
                </Link>
              ) : problem.title === 'Median of Two Sorted Arrays' ? (
                <Link to="/median-of-two-sorted-arrays" className="text-blue-400 hover:underline">
                  View Problem
                </Link>
              ) : (
                <span>No link available</span>
              )}
              Difficulty: {problem.difficulty}
            </p>
            <div className="flex flex-wrap gap-2">
              {problem.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-xs font-medium py-1 px-2 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Prob;