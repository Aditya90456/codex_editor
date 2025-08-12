import React, { useState, useEffect } from "react";
import { FaBolt, FaBrain, FaTrophy, FaCheckCircle, FaSpinner, FaBookOpen, FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";

// Main landing page component for the Codex DSA platform.
function CodexDSALanding() {
  return (
    <div className="relative bg-[#070914] text-gray-100 flex items-center justify-center p-4 md:p-8 font-inter overflow-hidden">
      {/* Dynamic background effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-transparent to-transparent opacity-20"></div>
      <div className="z-10 w-full max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <div className="mb-4">
              <span className="px-4 py-1.5 rounded-full bg-slate-800/60 text-sm font-semibold text-gray-300 backdrop-blur-sm border border-slate-700 shadow-xl">
                CODEX
              </span>
            </div>
            {/* Awesome Heading with Gradient and Shadow */}
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
              Level Up Your{" "}
              <span 
                className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent"
                style={{ textShadow: '2px 2px 8px rgba(128, 0, 128, 0.4)' }}
              >
                DSA Skills
              </span>
            </h1>
            <p className="max-w-xl mx-auto md:mx-0 text-lg text-gray-400 font-light mb-8">
              Start your DSA journey today — build confidence, solve problems, and ace
              interviews step by step. We’ll help you finish strong.
            </p>
            <h2 className="text-2xl font-bold text-white mb-6">
              Heading
            </h2>
            <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-6">
              <FeatureBadge
                icon={<FaBrain className="text-xl text-indigo-400" />}
                text="Curated Problems"
              />
              <FeatureBadge
                icon={<FaBolt className="text-xl text-cyan-400" />}
                text="5 Progressive Tiers"
              />
              <FeatureBadge
                icon={<FaTrophy className="text-xl text-yellow-400" />}
                text="Perfect for Beginners"
              />
            </div>
          </div>
          <div className="md:w-1/2 flex items-center justify-center p-8">
            <div
              className="w-full max-w-md h-72 rounded-3xl bg-gradient-to-br from-indigo-700 to-cyan-500 shadow-2xl transform rotate-3 transition-transform duration-500 ease-in-out"
            >
              <div className="w-full h-full p-6 flex flex-col justify-end items-start text-white">
                <span className="text-4xl font-bold">DSA Roadmap</span>
                <span className="text-sm font-medium mt-2 opacity-80">Your path to mastering data structures and algorithms.</span>
                <span className="mt-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/20">Learn More</span>
              </div>
            </div>
          </div>
        </div>
        <footer className="mt-20 text-gray-500 text-center text-xs">
          © 2025 CodeX by Aditya | DSA Powered by CodeX Playground
        </footer>
      </div>
    </div>
  );
}

// Reusable component for displaying a single feature.
function FeatureBadge({ icon, text }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 backdrop-blur-md shadow-lg text-center transform transition-all duration-300 ease-in-out hover:bg-slate-700/50 hover:scale-105">
      {icon}
      <span className="text-sm font-medium text-gray-300">{text}</span>
    </div>
  );
}

const initialStages = [
  {
    title: "Foundation",
    topics: [
      { name: "Arrays", estimatedDays: 7, resources: { TUF: "https://takeuforward.org/arrays/arrays-a2z-dsa-sheet/", LeetCode: "https://leetcode.com/tag/array/", GFG: "https://www.geeksforgeeks.org/array-data-structure/" }, status: "not-started" },
      { name: "Strings", estimatedDays: 5, resources: { TUF: "https://takeuforward.org/strings/strings-a2z-dsa-sheet/", LeetCode: "https://leetcode.com/tag/string/", GFG: "https://www.geeksforgeeks.org/string-data-structure/" }, status: "not-started" },
      { name: "Basic Math", estimatedDays: 4, resources: { TUF: "https://takeuforward.org/maths/basic-maths-a2z-dsa-sheet/", LeetCode: "https://leetcode.com/problemset/all/?topicSlugs=math", GFG: "https://www.geeksforgeeks.org/mathematical-programming-for-interviews/" }, status: "not-started" },
    ],
    startDate: "",
    endDate: "",
  },
  {
    title: "Core DSA",
    topics: [
      { name: "Linked Lists", estimatedDays: 6, resources: { TUF: "https://takeuforward.org/linked-list/linked-list-a2z-dsa-sheet/", LeetCode: "https://leetcode.com/tag/linked-list/", GFG: "https://www.geeksforgeeks.org/data-structures/linked-list/" }, status: "not-started" },
      { name: "Stacks & Queues", estimatedDays: 5, resources: { TUF: "https://takeuforward.org/stack-queue/stack-queue-a2z-dsa-sheet/", LeetCode: "https://leetcode.com/tag/stack/", GFG: "https://www.geeksforgeeks.org/stack-data-structure/" }, status: "not-started" },
      { name: "Recursion", estimatedDays: 8, resources: { TUF: "https://takeuforward.org/recursion/recursion-a2z-dsa-sheet/", LeetCode: "https://leetcode.com/explore/learn/card/recursion-i/", GFG: "https://www.geeksforgeeks.org/introduction-to-recursion-2/" }, status: "not-started" },
      { name: "Sorting & Searching", estimatedDays: 7, resources: { TUF: "https://takeuforward.org/sorting-searching/sorting-searching-a2z-dsa-sheet/", LeetCode: "https://leetcode.com/problem-list/sort/", GFG: "https://www.geeksforgeeks.org/sorting-algorithms/" }, status: "not-started" },
      { name: "Trees & BST", estimatedDays: 10, resources: { TUF: "https://takeuforward.org/binary-tree/binary-tree-a2z-dsa-sheet/", LeetCode: "https://leetcode.com/tag/tree/", GFG: "https://www.geeksforgeeks.org/binary-tree-data-structure/" }, status: "not-started" },
      { name: "Hashing", estimatedDays: 4, resources: { TUF: "https://takeuforward.org/hashing/hashing-a2z-dsa-sheet/", LeetCode: "https://leetcode.com/tag/hash-table/", GFG: "https://www.geeksforgeeks.org/hashing-data-structure/" }, status: "not-started" },
      { name: "Graphs", estimatedDays: 12, resources: { TUF: "https://takeuforward.org/graph/graph-a2z-dsa-sheet/", LeetCode: "https://leetcode.com/tag/graph/", GFG: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" }, status: "not-started" },
    ],
    startDate: "",
    endDate: "",
  },
  {
    title: "Advanced",
    topics: [
      { name: "Dynamic Programming", estimatedDays: 15, resources: { TUF: "https://takeuforward.org/dynamic-programming/dynamic-programming-a2z-dsa-sheet/", LeetCode: "https://leetcode.com/tag/dynamic-programming/", GFG: "https://www.geeksforgeeks.org/dynamic-programming/" }, status: "not-started" },
      { name: "Tries", estimatedDays: 5, resources: { TUF: "https://takeuforward.org/tries/tries-a2z-dsa-sheet/", LeetCode: "https://leetcode.com/tag/trie/", GFG: "https://www.geeksforgeeks.org/trie-data-structure/" }, status: "not-started" },
      { name: "Segment Trees", estimatedDays: 8, resources: { TUF: "https://takeuforward.org/segment-tree/segment-tree-a2z-dsa-sheet/", LeetCode: "https://leetcode.com/tag/segment-tree/", GFG: "https://www.geeksforgeeks.org/segment-tree-data-structure-and-algorithms/" }, status: "not-started" },
      { name: "Advanced Graph Algorithms", estimatedDays: 10, resources: { TUF: "https://takeuforward.org/graph/advanced-graph-algorithms/", LeetCode: "https://leetcode.com/tag/shortest-path/", GFG: "https://www.geeksforgeeks.org/advanced-graph-algorithms/" }, status: "not-started" },
    ],
    startDate: "",
    endDate: "",
  },
];

// DSA Roadmap component that displays the structured learning path.
function DSARoadmap() {
  const [stages, setStages] = useState(initialStages);
  const [open, setOpen] = useState(null);
  const [notes, setNotes] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Load progress and notes from local storage on component mount
  useEffect(() => {
    console.log("Attempting to load data from local storage...");
    try {
      const savedStages = localStorage.getItem('dsa-roadmap-progress');
      const savedNotes = localStorage.getItem('dsa-roadmap-notes');

      if (savedStages) {
        setStages(JSON.parse(savedStages));
        console.log("Successfully loaded stages from local storage.");
      }
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
        console.log("Successfully loaded notes from local storage.");
      }
      if (!savedStages && !savedNotes) {
        console.log("No data found in local storage. Using initial state.");
      }
    } catch (e) {
      console.error("Failed to load progress from local storage:", e);
      // Clear invalid data and reset to initial state
      localStorage.removeItem('dsa-roadmap-progress');
      localStorage.removeItem('dsa-roadmap-notes');
      setStages(initialStages);
      setNotes({});
    }
  }, []);

  // Save progress and notes to local storage whenever they change
  useEffect(() => {
    console.log("Saving data to local storage...");
    try {
      localStorage.setItem('dsa-roadmap-progress', JSON.stringify(stages));
      localStorage.setItem('dsa-roadmap-notes', JSON.stringify(notes));
    } catch (e) {
      console.error("Failed to save progress to local storage:", e);
    }
  }, [stages, notes]);

  const getTotalProgress = () => {
    const allTopics = stages.flatMap(s => s.topics);
    if (allTopics.length === 0) return 0;
    const completed = allTopics.filter(t => t.status === 'completed').length;
    return Math.round((completed / allTopics.length) * 100);
  };

  const getTotalEstimatedDays = () => {
    return stages.reduce((total, stage) =>
      total + stage.topics.reduce((stageTotal, topic) => stageTotal + topic.estimatedDays, 0), 0
    );
  };

  const getStageStatus = (topics) => {
    const total = topics.length;
    const done = topics.filter((t) => t.status === "completed").length;
    if (done === total) return "completed";
    if (done > 0) return "in-progress";
    return "not-started";
  };

  const updateTopicStatus = (si, ti, newStatus) => {
    const copy = JSON.parse(JSON.stringify(stages));
    copy[si].topics[ti].status = newStatus;
    setStages(copy);
  };

  const updateDate = (si, field, value) => {
    const copy = JSON.parse(JSON.stringify(stages));
    copy[si][field] = value;
    setStages(copy);
  };

  const updateNotes = (stageIndex, topicIndex, noteText) => {
    const key = `${stageIndex}-${topicIndex}`;
    setNotes(prev => ({
      ...prev,
      [key]: noteText
    }));
  };
  
  const handleClearAll = () => {
    setShowModal(true);
  };

  const confirmClearAll = () => {
    localStorage.removeItem('dsa-roadmap-progress');
    localStorage.removeItem('dsa-roadmap-notes');
    setStages(initialStages);
    setNotes({});
    setShowModal(false);
    console.log("All progress and notes have been cleared.");
  };

  const StatusBadge = ({ status }) => {
    let colorClass, text;
    switch (status) {
      case "not-started":
        colorClass = "bg-rose-500/10 text-rose-400 border border-rose-500/30";
        text = "Not Started";
        break;
      case "in-progress":
        colorClass = "bg-amber-500/10 text-amber-400 border border-amber-500/30";
        text = "In Progress";
        break;
      case "completed":
        colorClass = "bg-green-500/10 text-green-400 border border-green-500/30";
        text = "Completed";
        break;
      default:
        colorClass = "bg-gray-500/10 text-gray-400 border border-gray-500/30";
        text = "Unknown";
    }
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colorClass}`}>
        {text}
      </span>
    );
  };

  const ProgressCircle = ({ progress }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
  
    return (
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-gray-700"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="64"
            cy="64"
          />
          <circle
            className="text-cyan-500"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="64"
            cy="64"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className="absolute text-white text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500">
          {progress}%
        </div>
      </div>
    );
  };
  
  const OverallProgress = () => {
    const totalProgress = getTotalProgress();
    const totalDays = getTotalEstimatedDays();
    const completedTopics = stages.flatMap(s => s.topics).filter(t => t.status === 'completed').length;
    const totalTopics = stages.flatMap(s => s.topics).length;

    return (
      <div className="bg-slate-800/60 rounded-2xl p-6 md:p-8 text-white mb-8 shadow-2xl border border-slate-700/50 backdrop-blur-lg">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)' }}>Your Learning Journey</h2>
            <p className="text-sm md:text-base text-gray-400 opacity-90">
              {completedTopics}/{totalTopics} topics completed • ~{totalDays} days estimated
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <ProgressCircle progress={totalProgress} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#070914] text-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 
          className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-pink-400 to-blue-500 bg-clip-text text-transparent mb-8"
          style={{ textShadow: '2px 2px 8px rgba(128, 0, 128, 0.4)' }}
        >
            DSA Roadmap
        </h1>

        <OverallProgress />

        <div className="space-y-6">
          {stages.map((stage, si) => {
            const done = stage.topics.filter((t) => t.status === "completed").length;
            const progress = Math.round((done / stage.topics.length) * 100);
            const status = getStageStatus(stage.topics);
            
            return (
              <div
                key={si}
                className="bg-slate-800/60 rounded-2xl shadow-lg border border-slate-700/50 overflow-hidden transition-transform duration-300 ease-in-out hover:scale-[1.01] backdrop-blur-lg"
              >
                <div 
                  className="p-6 cursor-pointer flex items-center justify-between hover:bg-slate-700/50 transition-colors duration-200"
                  onClick={() => setOpen(open === si ? null : si)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-slate-700/50 rounded-full text-lg font-bold text-cyan-400 border border-slate-600">
                      {si + 1}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-200">{stage.title}</h2>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm text-gray-400">{progress}% Progress</span>
                        <StatusBadge status={status} />
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-200 transition-transform duration-300 transform">
                    {open === si ? <FaChevronUp className="rotate-180" /> : <FaChevronDown />}
                  </button>
                </div>

                {open === si && (
                  <div className="p-6 border-t border-slate-700 bg-slate-900/40">
                    <div className="mb-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                            <label className="text-sm font-medium text-gray-400">
                                Start Date:
                                <input
                                    type="date"
                                    value={stage.startDate || ""}
                                    onChange={(e) => updateDate(si, "startDate", e.target.value)}
                                    className="ml-2 bg-slate-800/60 text-gray-100 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </label>
                            <label className="text-sm font-medium text-gray-400">
                                End Date:
                                <input
                                    type="date"
                                    value={stage.endDate || ""}
                                    onChange={(e) => updateDate(si, "endDate", e.target.value)}
                                    className="ml-2 bg-slate-800/60 text-gray-100 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </label>
                        </div>
                        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-300 ease-out"
                                style={{
                                    width: `${progress}%`,
                                    background: progress === 100
                                        ? "linear-gradient(to right, #10b981, #34d399)" // Green for 100%
                                        : progress > 0
                                        ? "linear-gradient(to right, #f59e0b, #fbbf24)" // Amber for in progress
                                        : "linear-gradient(to right, #ef4444, #f87171)" // Red for not started
                                }}
                            />
                        </div>
                    </div>

                    <ul className="space-y-4">
                      {stage.topics.map((topic, ti) => (
                        <li key={ti} className="p-4 bg-slate-800/60 rounded-lg border border-slate-700/50 hover:bg-slate-700/50 transition-colors shadow-inner backdrop-blur-lg">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-3">
                                <span className="text-lg font-semibold text-gray-200">{topic.name}</span>
                                <span className="text-xs text-gray-400 bg-slate-700/50 px-2 py-1 rounded-full">~{topic.estimatedDays} days</span>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {Object.entries(topic.resources).map(([label, url]) => (
                                  <a
                                    key={label}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
                                  >
                                    {label}
                                  </a>
                                ))}
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                                {topic.status === "completed" && <FaCheckCircle className="text-green-500 text-2xl" />}
                                {topic.status === "in-progress" && <FaSpinner className="text-amber-500 text-2xl animate-spin" />}
                                {topic.status === "not-started" && <FaBookOpen className="text-blue-500 text-2xl" />}
                            </div>
                          </div>

                          <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Your Notes
                            </label>
                            <textarea
                                placeholder="Add your notes here..."
                                value={notes[`${si}-${ti}`] || ''}
                                onChange={(e) => updateNotes(si, ti, e.target.value)}
                                className="w-full min-h-[60px] p-3 text-sm rounded-lg bg-slate-800/60 border border-slate-700 text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <select
                                value={topic.status}
                                onChange={(e) => updateTopicStatus(si, ti, e.target.value)}
                                className="bg-slate-800/60 text-gray-200 text-sm py-2 px-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="not-started">Not Started</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            <span className="text-xs text-gray-500 uppercase">{topic.status.replace("-", " ")}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap justify-end gap-3">
                        <button
                            onClick={() => {
                                const copy = JSON.parse(JSON.stringify(stages));
                                copy[si].topics = copy[si].topics.map((t) => ({ ...t, status: "completed" }));
                                setStages(copy);
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
                        >
                            Mark All Done
                        </button>
                        <button
                            onClick={() => {
                                const copy = JSON.parse(JSON.stringify(stages));
                                copy[si].topics = copy[si].topics.map((t) => ({ ...t, status: "not-started" }));
                                setStages(copy);
                            }}
                            className="px-4 py-2 text-sm font-medium text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition"
                        >
                            Reset
                        </button>
                        <button
                            onClick={handleClearAll}
                            className="px-4 py-2 text-sm font-medium text-red-400 border border-red-400 rounded-lg hover:bg-red-900/20 transition"
                        >
                            Clear All
                        </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-2xl w-full max-w-sm text-center backdrop-blur-lg">
              <div className="flex justify-end">
                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-300">
                    <FaTimes />
                </button>
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent mb-2" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)' }}>Are you sure?</h3>
              <p className="text-sm text-gray-400 mb-6">
                This will clear all of your progress and notes. This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmClearAll}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="text-gray-500 text-center mt-12 text-sm">
            <p className="mb-1">Your progress is automatically saved locally in your browser.</p>
            <p>© 2025 CodeX by Aditya | All rights reserved</p>
        </footer>
      </div>
    </div>
  );
}

// The App component is now simplified to directly render the main content.
export default function App() {
    return (
        <div>
            <CodexDSALanding />
            <DSARoadmap />
        </div>
    );
}
