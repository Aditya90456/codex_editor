import React, { useState } from 'react';
import problems from './problems (1)';
function Prob() { 
  const [problem, setProblem] = useState(problems);  
  const [searchTerm, setSearchTerm] = useState('');
  


  const handleCheckboxChange = (index, field) => {
    const updatedProblems = [...problems];
    updatedProblems[index][field] = !updatedProblems[index][field];
    setProblems(updatedProblems);
  };

  const total = problems.length;
  const solved = problems.filter(p => p.solved).length;
  const progress = (solved / total) * 100;
  if (progress === 100) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4"> 
        <div className=" flex justify-center items-center">
          <p className='text-white text-3xl font-bold'>Congrats! You have solved all the problems!</p>
        </div>
      </div>
    
    )
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
        <h1 className="text-4xl font-bold text-white text-center mb-6">Codex DSA Problem Set</h1>

        {/* Progress Bar */}
        <div className="mb-8">
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

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
            >
              <h2 className="text-xl font-bold text-white mb-2">{problem.title}</h2>
              <a
                href={problem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline mb-2 inline-block"
              >
                View Problem on GFG
              </a>
              <div className="flex flex-wrap gap-2 mb-4">
                {problem.tags.map((tag, i) => (
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
                    checked={problem.solved}
                    onChange={() => handleCheckboxChange(index, 'solved')}
                    className="mr-2"
                  />
                  Solved
                </label>
                <label className="flex items-center text-gray-300">
                  <input
                    type="checkbox"
                    checked={problem.attempted}
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
