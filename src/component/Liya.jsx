import React, { useState, useEffect } from "react";
import articlesData from "../data/articlesData"; // your full sheet data
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";
import { FaCheckCircle, FaPlay } from "react-icons/fa";

export default function DSASheet() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [progress, setProgress] = useState(() => {
    return JSON.parse(localStorage.getItem("progress")) || {};
  });
  const [activeLang, setActiveLang] = useState("cpp");

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(progress));
  }, [progress]);

  const toggleDone = (topic, id) => {
    const updated = { ...progress };
    if (!updated[topic]) updated[topic] = {};
    updated[topic][id] = !updated[topic][id];
    setProgress(updated);
  };

  const calcProgress = (topic) => {
    if (!articlesData[topic]) return 0;
    const total = articlesData[topic].length;
    const done = Object.values(progress[topic] || {}).filter(Boolean).length;
    return Math.round((done / total) * 100);
  };

  const runCode = async (code, lang) => {
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language: lang }),
      });
      const result = await res.json();
      alert(result.output || "No output");
    } catch (err) {
      alert("Error running code");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-lg p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">📘 DSA Full Sheet</h2>
        {Object.keys(articlesData).map((topic) => (
          <div key={topic} className="mb-4">
            <button
              className="w-full flex justify-between items-center text-left font-semibold"
              onClick={() => setSelectedTopic(topic)}
            >
              {topic} ({calcProgress(topic)}%)
            </button>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: selectedTopic === topic ? "auto" : 0 }}
              className="overflow-hidden ml-2 mt-2"
            >
              {articlesData[topic].map((article) => (
                <div
                  key={article.id}
                  className="flex items-center gap-2 mb-2 cursor-pointer"
                  onClick={() => setSelectedArticle({ ...article, topic })}
                >
                  <input
                    type="checkbox"
                    checked={progress[topic]?.[article.id] || false}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleDone(topic, article.id);
                    }}
                  />
                  <span>{article.title}</span>
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Article + Editor */}
      <div className="flex-1 p-6 overflow-y-auto">
        {selectedArticle ? (
          <div>
            <h2 className="text-2xl font-bold mb-2">{selectedArticle.title}</h2>
            <ReactMarkdown className="prose">
              {selectedArticle.content}
            </ReactMarkdown>
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
              onClick={() =>
                toggleDone(selectedArticle.topic, selectedArticle.id)
              }
            >
              <FaCheckCircle />
              Mark as Done
            </button>

            {/* Code Editor */}
            <div className="mt-6">
              <div className="flex gap-2 mb-2">
                {["cpp", "java", "python", "javascript"].map((lang) => (
                  <button
                    key={lang}
                    className={`px-3 py-1 rounded ${
                      activeLang === lang ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => setActiveLang(lang)}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
              <Editor
                height="300px"
                language={activeLang}
                theme="vs-dark"
                value={selectedArticle.snippets?.[activeLang] || ""}
                onChange={() => {}}
              />
              <button
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
                onClick={() =>
                  runCode(selectedArticle.snippets?.[activeLang], activeLang)
                }
              >
                <FaPlay /> Run Code
              </button>
            </div>
          </div>
        ) : (
          <p>Select an article from the sidebar</p>
        )}
      </div>
    </div>
  );
}
