import React, { useState } from 'react';
import axios from 'axios';
import problems from './problems (1)'; // Your local problems array

function Prob() {
  const [problem, setProblem] = useState(problems);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCheckboxChange = async (index, field) => {
    const updatedProblems = [...problem];
    updatedProblems[index][field] = !updatedProblems[index][field];
    setProblem(updatedProblems);

    try {
      await axios.put('http://localhost:5000/update-problem-status', {
        problemTitle: updatedProblems[index].title,
        solved: updatedProblems[index].solved,
        attempted: updatedProblems[index].attempted,
      });

      console.log('✅ Data updated successfully');
    } catch (error) {
      console.error('❌ Error saving data:', error);
    }
  };

  const total = problem.length;
  const solved = problem.filter((p) => p.solved).length;
  const progress = total > 0 ? (solved / total) * 100 : 0;

  const filteredProblems = problem.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (progress === 100 && total > 0) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
        <p className="text-white text-3xl font-bold mt-20">🎉 Congrats! You solved all the problems!</p>
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
        <p className="text-white text-lg">No problems available. Please add some problems.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-6xl bg-black bg-opacity-30 backdrop-blur-md rounded-lg p-8 shadow-2xl mt-10">

        {/* Title */}
        <h1 className="text-4xl font-bold text-white text-center mb-6">
          Codex DSA Problem Set
        </h1>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-white mb-1 text-sm">
            <span>Solved: {solved} / {total}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search problems by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-600 bg-gray-900 text-white placeholder-gray-400"
          />
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProblems.map((p, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
            >
              <h2 className="text-xl font-bold text-white mb-2">{p.title}</h2>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline mb-2 inline-block"
              >
                View Problem on GFG
              </a>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-700 text-xs font-medium py-1 px-2 rounded-full text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center text-gray-300">
                  <input
                    type="checkbox"
                    checked={p.solved}
                    onChange={() => handleCheckboxChange(index, 'solved')}
                    className="mr-2"
                  />
                  Solved
                </label>
                <label className="flex items-center text-gray-300">
                  <input
                    type="checkbox"
                    checked={p.attempted}
                    onChange={() => handleCheckboxChange(index, 'attempted')}
                    className="mr-2"
                  />
                  Attempted
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Prob;
