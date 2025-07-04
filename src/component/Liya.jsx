import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

const articles = [
  {
    title: 'Hashing in Data Structures',
    description: 'A comprehensive guide to Hashing in Data Structures with examples and applications.',
    tags: ['DSA', 'Hashing', 'GeeksforGeeks'],
    link: 'https://www.geeksforgeeks.org/dsa/hashing-data-structure/',
  },
  {
    title: 'Arrays in C++',
    description: 'Learn about arrays in C++ and how to use them effectively.',
    tags: ['C++', 'Arrays', 'Programming'],
    link: 'https://www.geeksforgeeks.org/arrays-in-c-cpp/',
  },
  {
    title: 'Dynamic Programming Basics',
    description: 'Get started with Dynamic Programming concepts and solve problems efficiently.',
    tags: ['DSA', 'Dynamic Programming'],
    link: 'https://www.geeksforgeeks.org/dynamic-programming/',
  },
  // 👉 Repeat for all 250 articles
];

function Liya() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-8">
      <div className="w-full max-w-7xl bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center text-white mb-6">
          🚀 DSA Articles on GeeksforGeeks
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-xl p-4 shadow-md hover:shadow-green-400/40 hover:scale-105 transition duration-300"
            >
              <h2 className="text-lg font-bold text-white mb-2 truncate">{article.title}</h2>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                {article.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-3">
                {article.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-green-500 text-black text-xs font-semibold py-0.5 px-2 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                Read Article <FiExternalLink className="ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Liya;
