import React from 'react';

const articles = [
  {
    title: 'Understanding Arrays in JavaScript',
    description: 'Learn the basics of arrays and their operations in JavaScript.',
    tags: ['JavaScript', 'Arrays', 'Programming'],
    link: 'https://www.geeksforgeeks.org/dsa/array-data-structure-guide/',
  },
  {
    title: 'Introduction to Dynamic Programming',
    description: 'A beginner-friendly guide to dynamic programming concepts.',
    tags: ['Dynamic Programming', 'Algorithms'],
    link: 'https://www.geeksforgeeks.org/dsa/introduction-to-dynamic-programming/',
  },
  {
    title: 'Sorting Algorithms Explained',
    description: 'Understand various sorting algorithms with examples.',
    tags: ['Sorting', 'Algorithms', 'Data Structures'],
    link: 'https://www.geeksforgeeks.org/dsa/sorting-algorithms-explained/',
  },
];

function Liya() {
  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-6xl bg-black bg-opacity-30 backdrop-blur-md rounded-lg p-8 shadow-2xl mt-10">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Explore GFG Articles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
              >
                <h2 className="text-xl font-bold text-white mb-2">{article.title}</h2>
                <p className="text-sm text-gray-300 mb-4">{article.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-xs font-medium py-1 px-2 rounded-full text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Read Article on GFG
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-300 text-center">No articles available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Liya;