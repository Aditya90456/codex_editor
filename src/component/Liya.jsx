import React from 'react';
import { Link } from 'react-router-dom';

function Liya() {
  const topics = [
    {
      title: 'Arrays',
      description: 'Learn about arrays, their operations, and common problems like Two Sum and Subarray Sum.',
      link: '/arrays',
    },
    {
      title: 'Linked Lists',
      description: 'Understand singly and doubly linked lists, and solve problems like reversing a linked list.',
      link: '/linked-lists',
    },
    {
      title: 'Stacks and Queues',
      description: 'Explore stack and queue operations, and solve problems like Next Greater Element.',
      link: '/stacks-queues',
    },
    {
      title: 'Binary Trees',
      description: 'Learn about binary trees, traversals, and problems like Lowest Common Ancestor.',
      link: '/binary-trees',
    },
    {
      title: 'Graphs',
      description: 'Understand graph representations, BFS, DFS, and problems like Shortest Path.',
      link: '/graphs',
    },
    {
      title: 'Dynamic Programming',
      description: 'Master DP concepts like memoization and tabulation, and solve problems like Longest Common Subsequence.',
      link: '/dynamic-programming',
    },
  ];

  return (
    <div className="w-full h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="w-full h-16 bg-gray-800 flex items-center justify-center mb-6">
        <Link to='/' className='w-16 h-16 text-weight-bold text-white flex items-center justify-center rounded-full hover:bg-gray-700 transition duration-300'>Home</Link>
        <h1 className="text-3xl font-bold">DSA Topic Guide</h1>
      </div>

      {/* Topics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
          >
            <h2 className="text-xl font-bold mb-2">{topic.title}</h2>
            <p className="text-sm mb-4">{topic.description}</p>
            <a
              href={topic.link}
              className="text-blue-400 hover:underline"
            >
                Explore {topic.title}
            </a>
            {
                topic.link === '/arrays' && (
                    <Link to='/array-tutorial' className="text-blue-400 hover:underline ml-2"> Array Tutorial </Link>
                )
                
            }
            {
                topic.link === '/linked-lists' && ( 
                    <Link to='/linked-list-tutorial' className="text-blue-400 hover:underline ml-2"> Linked List Tutorial </Link>
                )
            }
            {
                topic.link === '/stacks-queues' && ( 
                    <Link to='/stack-queue-tutorial' className="text-blue-400 hover:underline ml-2"> Stack and Queue Tutorial </Link>
                )
            }
            {
                topic.link === '/binary-trees' && ( 
                    <Link to='/binary-tree-tutorial' className="text-blue-400 hover:underline ml-2"> Binary Tree Tutorial </Link>
                )
            }
            {
                topic.link === '/graphs' && ( 
                    <Link to='/graph-tutorial' className="text-blue-400 hover:underline ml-2"> Graph Tutorial </Link>
                )
            }
            {
                topic.link === '/dynamic-programming' && ( 
                    <Link to='/dynamic-programming-tutorial' className="text-blue-400 hover:underline ml-2"> Dynamic Programming Tutorial </Link>
                )
            }
          </div> 
        ))}
      </div>
    </div>
  );
}

export default Liya;