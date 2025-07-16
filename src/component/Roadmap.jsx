import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCode, FaLaptopCode, FaBrain, FaCheckCircle } from 'react-icons/fa'

const roadmaps = [
  {
    id: 1,
    title: '📘 DSA Roadmap',
    description: 'Ace Data Structures & Algorithms step by step.',
    icon: <FaCode size={40} />,
    steps: [
      'Learn Arrays & Strings',
      'Master Linked Lists',
      'Solve Stacks & Queues',
      'Dive into Trees & Graphs',
      'Dynamic Programming',
      'Advanced Patterns',
    ],
  },
  {
    id: 2,
    title: '🌐 Web Development',
    description: 'Build modern websites and apps.',
    icon: <FaLaptopCode size={40} />,
    steps: [
      'HTML & CSS Basics',
      'JavaScript Essentials',
      'React for Frontend',
      'Node.js & Express Backend',
      'MongoDB Database',
      'Deploy Full-Stack App',
    ],
  },
  {
    id: 3,
    title: '🤖 Machine Learning',
    description: 'ML concepts with Python, Scikit-Learn, TensorFlow.',
    icon: <FaBrain size={40} />,
    steps: [
      'Python for ML',
      'Math & Statistics Basics',
      'Supervised Learning',
      'Unsupervised Learning',
      'Deep Learning Models',
      'Capstone Projects',
    ],
  },
]

function Roadmap() {
  const [selected, setSelected] = useState(null)
  const [completed, setCompleted] = useState({}) // Track completed steps

  const toggleStep = (roadmapId, stepIndex) => {
    const key = `${roadmapId}-${stepIndex}`
    setCompleted((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-8">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold">📈 Roadmap Development</h1>
        <p className="text-gray-300 mt-2">Track your coding journey step by step</p>
      </header>

      {!selected ? (
        // Roadmap Cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map((roadmap) => (
            <motion.div
              key={roadmap.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelected(roadmap)}
              className="p-6 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 cursor-pointer shadow-lg transition"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3">{roadmap.icon}</div>
                <h2 className="text-2xl font-bold mb-1">{roadmap.title}</h2>
                <p className="text-sm text-gray-100">{roadmap.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        // Selected Roadmap Timeline
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto p-6 bg-gray-800 rounded-xl shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6">{selected.title}</h2>
          <div className="relative border-l-4 border-green-500 pl-6 space-y-6">
            {selected.steps.map((step, index) => {
              const key = `${selected.id}-${index}`
              const isDone = completed[key]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <button
                    onClick={() => toggleStep(selected.id, index)}
                    className={`text-lg ${isDone ? 'text-green-400' : 'text-gray-400'}`}
                  >
                    {isDone ? <FaCheckCircle /> : <span className="w-4 h-4 border rounded-full inline-block"></span>}
                  </button>
                  <span className={`${isDone ? 'line-through text-green-300' : ''}`}>{step}</span>
                </motion.div>
              )
            })}
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-gray-700 rounded-full h-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    (Object.keys(completed).filter((k) => completed[k] && k.startsWith(selected.id)).length /
                      selected.steps.length) *
                    100
                  }%`,
                }}
                transition={{ duration: 0.7 }}
                className="h-4 bg-green-400 rounded-full"
              />
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Progress: {Object.keys(completed).filter((k) => completed[k] && k.startsWith(selected.id)).length}/
              {selected.steps.length}
            </p>
          </div>

          {/* Back Button */}
          <button
            onClick={() => setSelected(null)}
            className="mt-6 px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
          >
            🔙 Back to Roadmaps
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default Roadmap
