import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  CheckCircle2,
  Circle,
  Clock,
  Search,
} from "lucide-react";
import sheetData from "../data/codexdsasheet.json"; // JSON file

const CodexSheet = () => {
  const [expanded, setExpanded] = useState(null);
  const [statuses, setStatuses] = useState({});
  const [search, setSearch] = useState("");

  // Load saved progress
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("sheet-statuses")) || {};
    setStatuses(saved);
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem("sheet-statuses", JSON.stringify(statuses));
  }, [statuses]);

  const toggleStatus = (id) => {
    setStatuses((prev) => ({
      ...prev,
      [id]:
        prev[id] === "solved"
          ? "unsolved"
          : prev[id] === "unsolved"
          ? "attempted"
          : "solved",
    }));
  };

  // Filter problems based on search
  const filteredData = Object.keys(sheetData).reduce((acc, topic) => {
    acc[topic] = sheetData[topic].filter((problem) =>
      problem.title.toLowerCase().includes(search.toLowerCase())
    );
    return acc;
  }, {});

  // Calculate progress for a topic
  const calcProgress = (problems) => {
    const total = problems.length;
    const solved = problems.filter((p) => statuses[p.id] === "solved").length;
    return Math.round((solved / total) * 100);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-9">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800  mt-5 dark:text-white">
        📘 Codex DSA Sheet
      </h1>

      {/* Search */}
      <div className="flex items-center mb-10 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3 shadow-md">
        <Search className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search problems..."
          className="bg-transparent w-full outline-none text-gray-700 dark:text-gray-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Topics */}
      <div className="space-y-6">
        {Object.keys(filteredData).map((topic, i) => {
          const progress = calcProgress(sheetData[topic]);
          return (
            <div
              key={i}
              className="rounded-2xl border shadow-md bg-white dark:bg-gray-900 overflow-hidden"
            >
              {/* Topic Header */}
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full flex justify-between items-center p-5 bg-gray-200 dark:bg-gray-800"
              >
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {topic}
                </span>
                <div className="flex items-center gap-4">
                  {/* Progress bar */}
                  <div className="w-32 bg-gray-300 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-green-500 h-2"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {progress}%
                  </span>

                  <motion.div
                    animate={{ rotate: expanded === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown />
                  </motion.div>
                </div>
              </button>

              {/* Problems List */}
              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    {filteredData[topic].length === 0 && (
                      <p className="p-4 text-gray-500">No problems found</p>
                    )}
                    <ul>
                      {filteredData[topic].map((problem) => (
                        <li
                          key={problem.id}
                          className="flex justify-between items-center p-4 border-b last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                        >
                          {/* Problem Info */}
                          <div>
                            <a
                              href={problem.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                            >
                              {problem.title}
                            </a>
                            <p className="text-sm text-gray-500">
                              {problem.difficulty} ·{" "}
                              {problem.tags?.join(", ") || "No tags"}
                            </p>
                          </div>

                          {/* Status button */}
                          <button
                            onClick={() => toggleStatus(problem.id)}
                            className={`ml-4 flex items-center px-4 py-1 rounded-full text-sm font-medium shadow transition ${
                              statuses[problem.id] === "solved"
                                ? "bg-green-100 text-green-700"
                                : statuses[problem.id] === "attempted"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {statuses[problem.id] === "solved" ? (
                              <CheckCircle2 className="mr-1 h-4 w-4" />
                            ) : statuses[problem.id] === "attempted" ? (
                              <Clock className="mr-1 h-4 w-4" />
                            ) : (
                              <Circle className="mr-1 h-4 w-4" />
                            )}
                            {statuses[problem.id]
                              ? statuses[problem.id]
                              : "unsolved"}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CodexSheet;
