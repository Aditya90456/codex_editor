import React, { useState, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { Play, Bug, Upload, Terminal } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const CPP_TEMPLATE = `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    
    // 🚀 Write your code here

    return 0;
}
`;

const PYTHON_TEMPLATE = `# 🚀 Write your code here
def main():
    # your logic
    pass

if __name__ == "__main__":
    main()
`;

export default function CpEditor() {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(CPP_TEMPLATE);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [tab, setTab] = useState("input");
  const [loading, setLoading] = useState(false);

  // Load template on language change
  useEffect(() => {
    if (language === "cpp") setCode(CPP_TEMPLATE);
    else if (language === "python") setCode(PYTHON_TEMPLATE);
  }, [language]);

  // API call
  const executeCode = useCallback(
    async (action) => {
      setLoading(true);
      try {
        const endpoint = `http://localhost:5000/${action}`;
        const response = await axios.post(endpoint, {
          language,
          code,
          input,
        });
        setOutput(response.data.output || "⚡ No output received");
        setTab("output");
      } catch (error) {
        setOutput("⚠️ Error: " + (error.response?.data?.error || error.message));
        setTab("output");
      } finally {
        setLoading(false);
      }
    },
    [code, input, language]
  );

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-6xl mt-6 mb-4">
        <h1 className="text-2xl font-bold text-indigo-400 tracking-wide">
          ⚡ Code Playground
        </h1>

        <select
          className="bg-gray-900/70 text-white rounded-lg px-4 py-2 border border-gray-700 hover:border-indigo-500 transition focus:outline-none"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="cpp">C++</option>
          <option value="python">Python</option>
        </select>
      </div>

      {/* Editor */}
      <div className="relative w-full max-w-6xl h-[55vh] rounded-2xl overflow-hidden shadow-2xl border border-gray-800 mb-8 bg-gray-900/70 backdrop-blur-lg">
        <Editor
          height="100%"
          language={language === "cpp" ? "cpp" : "python"}
          value={code}
          onChange={(val) => setCode(val)}
          theme="vs-dark"
        />

        {/* Floating Action Bar */}
        <div className="absolute bottom-4 right-4 flex gap-3">
          <button
            onClick={() => executeCode("run")}
            disabled={loading}
            className="px-5 py-2 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg transition hover:scale-105 disabled:opacity-50"
          >
            <Play size={18} /> {loading ? "Running..." : "Run"}
          </button>
          <button
            onClick={() => executeCode("debug")}
            disabled={loading}
            className="px-5 py-2 flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 rounded-xl shadow-lg transition hover:scale-105 disabled:opacity-50"
          >
            <Bug size={18} /> Debug
          </button>
          <button
            onClick={() => executeCode("submit")}
            disabled={loading}
            className="px-5 py-2 flex items-center gap-2 bg-green-600 hover:bg-green-700 rounded-xl shadow-lg transition hover:scale-105 disabled:opacity-50"
          >
            <Upload size={18} /> Submit
          </button>
        </div>
      </div>

      {/* Input / Output Console */}
      <div className="w-full max-w-6xl bg-gray-900/80 rounded-2xl shadow-xl border border-gray-800 overflow-hidden">
        {/* Tab switcher */}
        <div className="flex relative border-b border-gray-700">
          {["input", "output"].map((t) => (
            <button
              key={t}
              className={`flex-1 py-3 text-center font-medium transition ${
                tab === t
                  ? "text-indigo-400"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setTab(t)}
            >
              {t === "input" ? "📝 Input" : "⚡ Output"}
            </button>
          ))}
          <motion.div
            layoutId="underline"
            className="absolute bottom-0 h-[2px] bg-indigo-500"
            initial={false}
            animate={{
              left: tab === "input" ? "0%" : "50%",
              width: "50%",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        </div>

        {/* Content */}
        <div className="p-4 h-44 overflow-auto font-mono text-sm">
          <AnimatePresence mode="wait">
            {tab === "input" ? (
              <motion.textarea
                key="input"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full p-3 rounded-lg bg-gray-950 text-white resize-none border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter custom input here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            ) : (
              <motion.pre
                key="output"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="text-green-400 whitespace-pre-wrap bg-black/70 p-3 rounded-lg border border-gray-700"
              >
                {loading ? "⏳ Processing..." : output || "⚡ Output will appear here"}
              </motion.pre>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
