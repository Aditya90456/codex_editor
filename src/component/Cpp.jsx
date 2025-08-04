import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function CppEditor() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const [dryRunSteps, setDryRunSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [variables, setVariables] = useState({});
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const intervalRef = useRef(null);
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const decorationIdsRef = useRef([]);

  useEffect(() => {
    setCode(`#include <iostream>
using namespace std;

int main() {
    int s = 0;
    for (int i = 1; i <= 3; i++) {
        s += i;
        if (i < 2) {
            cout << "i is less than 2\\n";
        }
    }
    if (s > 5) {
        cout << "Sum is greater than 5";
    }
    return 0;
}`);
  }, []);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  const highlightLine = (lineNumber) => {
    if (!editorRef.current || !monacoRef.current) return;
    decorationIdsRef.current = editorRef.current.deltaDecorations(
      decorationIdsRef.current,
      [
        {
          range: new monacoRef.current.Range(lineNumber, 1, lineNumber, 1),
          options: { isWholeLine: true, className: "highlightLine" },
        },
      ]
    );
  };

  const addBBox = (text) => {
    return `\n┌───────────────────────────┐
│ ${text}
└───────────────────────────┘`;
  };

  const explainLineLogic = (code, lineNumber) => {
    const lines = code.split("\n");
    const line = lines[lineNumber - 1]?.trim() || "";

    if (line.startsWith("for (int i")) return `Outer loop starts: i will iterate based on its condition.`;
    if (line.includes("i < 2")) return addBBox(`🟥 [Condition Highlight] i < 2 is TRUE`);
    if (line.includes("s > 5")) return addBBox(`🟥 [Condition Highlight] s > 5 is TRUE`);
    if (line.includes("cout"))
      return `Printing: ${line.replace(/cout\s*<<\s*/g, "").replace(/<<\s*endl;/g, "").trim()}`;
    if (line.includes("return")) return `Program ends.`;

    return `Executing: ${line}`;
  };

  // ▶ Run
  const runCode = async () => {
    setLoading(true);
    setOutput("▶ Running Code...\n──────────────────────────────");
    try {
      const res = await axios.post("http://localhost:5000/run", { code });
      setOutput((prev) => `${prev}\n${res.data.output}\n──────────────────────────────\n✅ Execution Completed`);
    } catch (err) {
      setOutput((prev) => `${prev}\n❌ Error: ${err.message}`);
    }
    setLoading(false);
  };

  // 💾 Save
  const saveCode = () => {
    const snippets = JSON.parse(localStorage.getItem("codex_snippets") || "[]");
    snippets.push({ code, lang: "cpp", filename: `snippet_${Date.now()}.cpp` });
    localStorage.setItem("codex_snippets", JSON.stringify(snippets));
    setOutput("💾 Code Saved\n──────────────────────────────\n✅ Code stored locally");
  };

  // 🪛 Debug
  const debugCode = async () => {
    setLoading(true);
    setOutput("🪛 Debugging Code...\n──────────────────────────────");
    try {
      const res = await axios.post("http://localhost:5000/debug", { code });
      setOutput((prev) => `${prev}\n${res.data.output}\n──────────────────────────────\n✅ Debugging Completed`);
    } catch (err) {
      setOutput((prev) => `${prev}\n❌ Debug Error: ${err.message}`);
    }
    setLoading(false);
  };

  // 📊 Analyze
  const analyzeCode = async () => {
    setLoading(true);
    setOutput("📊 Analyzing Code...\n──────────────────────────────");
    try {
      const res = await axios.post("http://localhost:5000/analyze", { code });
      setOutput((prev) => `${prev}\n🕒 Time: ${res.data.timeComplexity}\n📦 Space: ${res.data.spaceComplexity}\n──────────────────────────────\n✅ Analysis Completed`);
    } catch (err) {
      setOutput((prev) => `${prev}\n❌ Analysis Error: ${err.message}`);
    }
    setLoading(false);
  };

  // 🧩 Dry Run
  const dryRunCode = async () => {
    setLoading(true);
    setVariables({});
    setCurrentStep(0);
    setIsPlaying(false);
    clearInterval(intervalRef.current);

    setOutput("🧩 Dry Run Started\n──────────────────────────────");

    try {
      const res = await axios.post("http://localhost:5000/dryrun", { code });
      const steps = res.data.steps || [];
      if (!steps.length) {
        setOutput("⚠ No dry run steps");
        setIsPanelOpen(false);
        setLoading(false);
        return;
      }
      setDryRunSteps(steps);
      setIsPanelOpen(true);
      const first = steps[0];
      if (first?.changed) setVariables(first.changed);
      if (first?.line) {
        highlightLine(first.line);
        setOutput((prev) => `${prev}\n➡ Line ${first.line}: ${explainLineLogic(code, first.line)}`);
      }
    } catch (err) {
      setOutput("❌ Dry Run Error: " + err.message);
    }
    setLoading(false);
  };

  const goToStep = (index) => {
    if (index < 0 || index >= dryRunSteps.length) return;
    setCurrentStep(index);
    const step = dryRunSteps[index];
    if (step?.changed) setVariables(step.changed);
    if (step?.line) {
      highlightLine(step.line);
      setOutput((prev) => `${prev}\n➡ Line ${step.line}: ${explainLineLogic(code, step.line)}`);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          const next = prev + 1;
          if (next < dryRunSteps.length) {
            goToStep(next);
            return next;
          } else {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            setOutput((prev) => `${prev}\n──────────────────────────────\n✅ Dry Run Completed`);
            return prev;
          }
        });
      }, 1500);
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col bg-[#f9f9f9] text-black">
      <div className="flex justify-between items-center px-6 py-3 bg-white border-b border-gray-300 shadow mt-12">
        <h1 className="text-xl font-bold text-blue-500">⚡ Codex C++ Playground</h1>
        <div className="flex space-x-3">
          <button onClick={runCode} disabled={loading} className="px-4 py-2 rounded-lg bg-green-500 text-white">▶ Run</button>
          <button onClick={saveCode} className="px-4 py-2 rounded-lg bg-blue-500 text-white">💾 Save</button>
          <button onClick={debugCode} disabled={loading} className="px-4 py-2 rounded-lg bg-yellow-500 text-white">🪛 Debug</button>
          <button onClick={analyzeCode} disabled={loading} className="px-4 py-2 rounded-lg bg-purple-500 text-white">📊 Analyze</button>
          <button onClick={dryRunCode} disabled={loading} className="px-4 py-2 rounded-lg bg-pink-500 text-white">
            🧩 {isPanelOpen ? "Hide Dry Run" : "Dry Run"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 border-r border-gray-300">
          <Editor
            height="100%"
            language="cpp"
            value={code}
            onChange={(v) => setCode(v || "")}
            theme="vs-dark"
            onMount={handleEditorDidMount}
          />
          <div className="bg-black p-4 text-green-300 font-mono h-40 overflow-y-auto border-t border-gray-300">
            <pre>{output}</pre>
          </div>
        </div>
<AnimatePresence>
  {isPanelOpen && dryRunSteps.length > 0 && (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 80 }}
      className="w-[420px] bg-white border-l border-gray-300 p-4 overflow-y-auto fixed right-0 top-12 bottom-0 shadow-lg z-50"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-blue-600 font-bold">
          🧠 Dry Run (Step {currentStep + 1}/{dryRunSteps.length})
        </h3>
        <button onClick={() => setIsPanelOpen(false)} className="text-red-500">
          ✖
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mb-4">
        <button 
          onClick={dryRunCode} 
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          🔄 Rerun
        </button>
        <button 
          onClick={() => {
            const allSteps = dryRunSteps
              .map((s, i) => `Step ${i + 1}: Line ${s.line} - ${JSON.stringify(s.changed)}`)
              .join("\n");
            navigator.clipboard.writeText(allSteps);
          }} 
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          📋 Copy
        </button>
        <button 
          onClick={() => {
            const allSteps = dryRunSteps
              .map((s, i) => `Step ${i + 1}: Line ${s.line} - ${JSON.stringify(s.changed)}`)
              .join("\n");
            const blob = new Blob([allSteps], { type: "text/plain" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "dryrun_output.txt";
            link.click();
          }} 
          className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          ⬇ Download
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{
            width: `${((currentStep + 1) / dryRunSteps.length) * 100}%`,
          }}
        ></div>
      </div>

      {/* Controls */}
      <div className="flex justify-between mb-4">
        <button
          onClick={() => goToStep(currentStep - 1)}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          ◀ Prev
        </button>
        <button
          onClick={togglePlay}
          className={`px-3 py-1 rounded ${
            isPlaying ? "bg-red-400" : "bg-green-400"
          } text-white`}
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
        <button
          onClick={() => goToStep(currentStep + 1)}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          Next ▶
        </button>
      </div>

      {/* Condition Check */}
      {dryRunSteps[currentStep]?.conditions?.length > 0 && (
        <div className="mt-4">
          <h4 className="font-bold text-gray-700 mb-2">📝 Condition Check</h4>
          <div className="bg-gray-50 border border-gray-300 p-3 rounded-lg text-sm">
            {dryRunSteps[currentStep].conditions.map((c, idx) => (
              <div
                key={idx}
                className={`mb-1 ${
                  c.result ? "text-green-600" : "text-red-600"
                }`}
              >
                {c.expr} ➡ {c.result ? "✅ TRUE" : "❌ FALSE"}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Variables */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {Object.entries(variables).map(([name, value]) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div
              className="w-28 h-20 rounded-lg border-2 shadow-lg flex flex-col justify-center items-center"
              style={{
                borderColor: dryRunSteps[currentStep]?.changed?.[name]
                  ? "#f59e0b"
                  : "#3b82f6",
              }}
            >
              <span className="font-bold text-blue-700">{name}</span>
              <span className="text-green-700">{value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Output */}
      {dryRunSteps[currentStep]?.cout && (
        <div className="mt-4">
          <h4 className="font-bold text-gray-700 mb-2">💻 Output</h4>
          <div className="bg-black text-green-400 p-3 rounded-lg font-mono h-20 overflow-y-auto">
            {dryRunSteps[currentStep].cout}
          </div>
        </div>
      )}

      {/* Explanation */}
      <div className="mt-6">
        <h4 className="font-bold text-gray-700 mb-2">📖 Explanation</h4>
        <div className="bg-yellow-50 text-gray-800 p-3 rounded-lg border border-yellow-300 h-24 overflow-y-auto text-sm">
          {(() => {
            const step = dryRunSteps[currentStep];
            if (step.conditions?.length > 0) {
              const cond = step.conditions[0];
              return `Checked ${cond.expr}. ${
                cond.result ? "TRUE ✅" : "FALSE ❌"
              }.`;
            }
            if (step.changed) {
              return `Updated variables: ${Object.entries(step.changed)
                .map(([k, v]) => `${k}=${v}`)
                .join(", ")}`;
            }
            return "No specific change in this step.";
          })()}
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>


      </div>

      <div className="bg-gray-100 text-center text-gray-600 py-2 border-t border-gray-300">
        Codex Playground © 2025
      </div>

      <style>{`
        .highlightLine {
          background: rgba(255, 215, 0, 0.2) !important;
          border-left: 3px solid #f59e0b;
        }
      `}</style>
    </div>
  );
}
