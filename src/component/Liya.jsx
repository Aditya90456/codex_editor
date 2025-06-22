import React from 'react';
import { Link } from 'react-router-dom';

const topics = [
  {
    title: 'Arrays',
    description: 'Learn about arrays and solve problems.',
    link: '/https://www.geeksforgeeks.org/array-data-structure/',
    gfgLink: 'https://www.geeksforgeeks.org/array-data-structure/',
    progress: 0,
  },
  {
    title: 'Linked Lists',
    description: 'Understand linked lists and their applications.',
    link: '/https://www.geeksforgeeks.org/linked-list-data-structure/',
    gfgLink: 'https://www.geeksforgeeks.org/linked-list-data-structure/',
    gfgLink: 'https://www.geeksforgeeks.org/data-structures/linked-list/',
    progress: 0,
  },
  {
    title: 'Stacks',
    description: 'Master stack operations and solve problems.',
    link: '/https://www.geeksforgeeks.org/stack-data-structure/',
    gfgLink: 'https://www.geeksforgeeks.org/stack-data-structure/',
    progress: 0,
  },
];

function Liya() {
  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-6xl bg-black bg-opacity-30 backdrop-blur-md rounded-lg p-8 shadow-2xl mt-10">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Explore Topics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.length > 0 ? (
            topics.map((topic, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
              >
                <h2 className="text-xl font-bold text-white mb-2">{topic.title}</h2>
                <p className="text-sm text-gray-300 mb-4">{topic.description}</p>
                <div className="flex items-center mb-4">
                  <a
                    href={topic.gfgLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    Solve Problems on GFG
                  </a>
                  {topic.link && (
                    <Link
                      to={topic.link}
                      className="text-blue-400 hover:underline ml-4"
                    >
                      {topic.title} Tutorial
                    </Link>
                  )}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${topic.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Progress: {topic.progress}%
                </p>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-gray-300 text-center text-lg mb-4">
                No topics available at the moment. Please check back later!
              </p>
              <Link
                to="/"
                className="text-blue-500 hover:text-blue-700 transition-colors text-lg font-medium"
              >
                Back to Homepage
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Liya;