import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, ChevronDown, Clock, Sun, Moon, Search } from "lucide-react";
import sheetData from "../data/codexdsasheet.json"; // your JSON sheet

const STORAGE_KEY = "codex-sheet-status";
const THEME_KEY = "codex-sheet-theme";

export default function DsaSheetRoadmap() {
  const [dark, setDark] = useState(() => JSON.parse(localStorage.getItem(THEME_KEY)) || true);
  const [expanded, setExpanded] = useState(() => new Set());
  const [statuses, setStatuses] = useState(() => JSON.parse(localStorage.getItem(STORAGE_KEY)) || {});
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(THEME_KEY, JSON.stringify(dark));
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
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

  const toggleExpanded = (id) => {
    setExpanded((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const resetAll = () => setStatuses({});

  // Overall progress
  const overallProgress = useMemo(() => {
    const allSubs = Object.values(sheetData).flat();
    if (!allSubs.length) return 0;
    const done = allSubs.filter((s) => statuses[s.id] === "solved").length;
    return Math.round((done / allSubs.length) * 100);
  }, [statuses]);

  const perTopicProgress = (problems) => {
    if (!problems.length) return 0;
    const done = problems.filter((p) => statuses[p.id] === "solved").length;
    return Math.round((done / problems.length) * 100);
  };

  const filteredData = Object.keys(sheetData).reduce((acc, topic) => {
    acc[topic] = sheetData[topic].filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row mt-8 items-center justify-between mb-6 gap-4">
        <h1 className="text-4xl font-bold">📘 Codex DSA Sheet</h1>
        <div className="flex items-center gap-3">
          <div className="w-40">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Overall Progress</div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-cyan-500 transition-all"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <div className="text-[10px] mt-1 text-gray-600 dark:text-gray-400">{overallProgress}%</div>
          </div>
          <button
            onClick={() => setDark((d) => !d)}
            className="flex items-center gap-2 px-3 py-1 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="text-sm">{dark ? "Light" : "Dark"}</span>
          </button>
          <button
            onClick={resetAll}
            className="px-3 py-1 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex items-center gap-3 bg-gray-800 dark:bg-gray-700 rounded-3xl p-3">
          <Search className="text-gray-400" />
          <input
            type="text"
            placeholder="Search problems..."
            className="bg-transparent w-full outline-none text-gray-200 placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Topics */}
      <div className="max-w-5xl mx-auto relative pl-6 md:pl-10">
        <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700" />

        {Object.keys(filteredData).map((topic, idx) => {
          const progress = perTopicProgress(filteredData[topic]);
          return (
            <motion.div
              key={topic}
              className="relative mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <div className="absolute -left-1 md:-left-0.5 mt-2 w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow ring-4 ring-white dark:ring-gray-900" />
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 md:p-5 shadow hover:shadow-lg transition">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">{topic}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-cyan-500 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <button
                      onClick={() => toggleExpanded(topic)}
                      className="flex items-center gap-1 text-sm border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${expanded.has(topic) ? "rotate-180" : ""}`} />
                      {expanded.has(topic) ? "Collapse" : "Expand"}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expanded.has(topic) && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 space-y-2"
                    >
                      {filteredData[topic].length === 0 && (
                        <p className="text-gray-400">No problems found</p>
                      )}
                      {filteredData[topic].map((p) => (
                        <li
                          key={p.id}
                          className="flex justify-between items-center p-3 border-b border-gray-700 rounded-md hover:bg-gray-700 transition-all"
                        >
                          <div>
                            <a
                              href={p.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 font-semibold hover:underline"
                            >
                              {p.title}
                            </a>
                            <p className="text-xs text-gray-400 mt-1">
                              {p.difficulty} · {p.tags?.join(", ") || "No tags"}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleStatus(p.id)}
                            className={`ml-3 flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all ${
                              statuses[p.id] === "solved"
                                ? "bg-green-700/20 text-green-400 hover:bg-green-700/40"
                                : statuses[p.id] === "attempted"
                                ? "bg-yellow-700/20 text-yellow-400 hover:bg-yellow-700/40"
                                : "bg-gray-700/20 text-gray-400 hover:bg-gray-700/40"
                            }`}
                          >
                            {statuses[p.id] === "solved" ? (
                              <CheckCircle2 className="mr-1 w-4 h-4" />
                            ) : statuses[p.id] === "attempted" ? (
                              <Clock className="mr-1 w-4 h-4" />
                            ) : (
                              <Circle className="mr-1 w-4 h-4" />
                            )}
                            {statuses[p.id] || "unsolved"}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
