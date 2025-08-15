import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { FaPlay, FaSave, FaCode, FaDownload, FaBolt, FaRobot, FaMagic, FaList, FaRedo } from "react-icons/fa";
import axios from "axios";  

/**
 * PLAYGROUND.jsx — CP + 3 AI FEATURES
 * ------------------------------------------------------------
 * ✅ Competitive Programming workflow (stdin, fast I/O, reset, download)
 * ✅ Multi-language run (JS, Python, C++, Java) via your local backend
 * ✅ 3 AI features:
 * 1) Explain Code  2) AI Completion  3) Solve Problem (CP helper)
 *
 * HOW TO WIRE AI (pick ONE):
 * A) Backend proxy (recommended):
 * - Implement these POST endpoints and return { text }:
 * POST /api/ai/explain   { code, language }
 * POST /api/ai/complete  { code, language }
 * POST /api/ai/solve     { problem, language }
 * - In those handlers, call your provider (OpenAI, Gemini, etc.).
 *
 * B) Direct (NOT recommended on client): place your key in backend instead.
 *
 * RUNTIME ENDPOINTS (code execution):
 * javascript ->  http://localhost:5000/run/js   body: { code, stdin }
 * python     ->  http://localhost:5000/run/python  { code, stdin }
 * cpp        ->  http://localhost:5000/run         { code, stdin }
 * java       ->  http://localhost:5000/run/java    { code, stdin }
 */

export default function Playground() {
  // ---------- State ----------
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [stdin, setStdin] = useState("");
  const [loading, setLoading] = useState(false);

  // AI state
  const [aiTab, setAiTab] = useState("explain"); // explain | complete | solve
  const [aiLoading, setAiLoading] = useState(false);
  const [aiText, setAiText] = useState("");
  const [problemText, setProblemText] = useState("");

  const editorRef = useRef(null);

  // ---------- Snippets & Endpoints ----------
  const codeSnippets = useMemo(
    () => ({
      javascript: `// Fast I/O not required in JS\nconst main = () => {\n  const fs = require('fs');\n  const input = fs.readFileSync(0,'utf8').trim().split(/\\n+/);\n  // parse input here\n  console.log('Hello, CodeX!');\n};\n// main(); (uncomment when running with Node if allowed by backend)\nconsole.log('Hello, CodeX!');`,
      python: `# Write your Python code here\n# Example: read stdin as lines\n# import sys\n# data = sys.stdin.read().strip().split()\nprint("Hello, CodeX!")`,
      cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){\n  ios::sync_with_stdio(false);\n  cin.tie(nullptr);\n  // your CP code here; read from stdin normally\n  cout << "Hello, CodeX!\\n";\n  return 0;\n}`,
      java: `import java.io.*;\nimport java.util.*;\npublic class Main {\n  public static void main(String[] args) throws Exception {\n    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n    // String s = br.readLine();\n    System.out.println("Hello, CodeX!");\n  }\n}`,
    }),
    []
  );

  const runEndpoints = useMemo(
    () => ({  

      javascript: "http://localhost:5000/run/js",
      python: "http://localhost:5000/run/python",
      cpp: "http://localhost:5000/run",
      java: "http://localhost:5000/run/java",
    }),
    []
  );

  // init code for default language
  useEffect(() => {
    setCode(codeSnippets[language]);
  }, [language, codeSnippets]);

  // ---------- Helpers ----------
  const downloadCode = () => {
    const ext = language === "python" ? "py" : language === "cpp" ? "cpp" : language === "java" ? "java" : "js";
    const blob = new Blob([code], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `solution.${ext}`;
    link.click();
  };

  const saveCode = () => {
    const snippets = JSON.parse(localStorage.getItem("snippets") || "[]");
    snippets.push({ id: Date.now(), language, code, savedAt: new Date().toLocaleString() });
    localStorage.setItem("snippets", JSON.stringify(snippets));
    setOutput(`✅ Code saved at ${new Date().toLocaleTimeString()}`);
  };

  const resetCode = () => {
    setCode(codeSnippets[language] || "");
    setOutput("");
    setStdin("");
  };

  const attachEditor = (editor) => {
    editorRef.current = editor;
  };

  // ---------- Run Code ----------
  const runCode = async () => {
    setLoading(true);
    setOutput("▶ Running Code...\n──────────────────────────────");
    try {
      const url = runEndpoints[language];
      const payload = { code, stdin };
      const res = await axios.post(url, payload);
      const result = res.data || {}; 
      if(runEndpoints[language] === "http://localhost:5000/run/js") {
        // For JS, we expect a direct eval resultxxxxxxx
        const evalResult=eval(code);
        setOutput(evalResult || '✅ Code executed successfully');
      }

 

      if (result.error) setOutput(`❌ Error:\n${result.error}`);
      else if (result.timeout) setOutput("⏱️ Execution timed out.");
      else setOutput(`${result.output ?? ""}\n──────────────────────────────\n✅ Execution Completed`);
    } catch (err) {
      setOutput(`❌ Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // ---------- AI Calls (via backend proxy) ----------
  const callAI = useCallback(async (prompt) => {
  try {
      const token = localStorage.getItem('authToken');
      const res = await axios.post(
        'http://localhost:5000/ai',
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiReply = res.data.reply.trim();
      const aiMsg = { text: aiReply, sender: 'ai', time: new Date().toLocaleTimeString() };
       setAiText(aiReply);
      return aiReply; // Return the AI reply text
    } catch (err) {
      const errorText = '❌ Gemini API error: ' + (err.response?.data?.message || err.message);
      const errorMsg = { text: errorText, sender: 'ai', time: new Date().toLocaleTimeString() };
      setAiText(errorText);
      throw new Error(errorText); // Throw error to be caught in UI
    }             
  }, []);

  const onExplain = async () => {
    setAiLoading(true);
    setAiText("");
    try {
      const prompt = `Explain the following ${language} code:\n\`\`\`${language}\n${code}\n\`\`\``;
      const text = await callAI(prompt);
      setAiText(text);
    } catch (e) {
      setAiText(`❌ ${e.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  const onComplete = async () => {
    setAiLoading(true);
    setAiText("");
    try {
      const prompt = `Complete the following ${language} code. Only provide the code to complete the snippet, no extra explanations:\n\`\`\`${language}\n${code}\n\`\`\``;
      const text = await callAI(prompt);
      setAiText(text);
    } catch (e) {
      setAiText(`❌ ${e.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  const onSolve = async () => {
    if (!problemText.trim()) {
      setAiText("Paste a problem statement first.");
      setAiTab("solve");
      return;
    }
    setAiLoading(true);
    setAiText("");
    try {
      const prompt = `Solve the following competitive programming problem. Provide a detailed explanation of the approach, the time and space complexity, and the complete code in ${language}.\nProblem:\n\`\`\`\n${problemText}\n\`\`\``;
      const text = await callAI(prompt);
      setAiText(text);
    } catch (e) {
      setAiText(`❌ ${e.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  const applyCompletionToEditor = () => {
    if (!aiText.trim()) return;
    setCode((prev) => prev + (prev.endsWith("\n") ? "" : "\n") + aiText);
  };

  const applySolvedCode = () => {
    const match = aiText.match(/```[a-zA-Z]*\n([\s\S]*?)```/);
    const extracted = match ? match[1] : aiText;
    setCode(extracted);
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen w-full mt-10 bg-slate-900 text-slate-200 flex flex-col items-center p-6 gap-6 font-sans">
      <header className="w-full max-w-7xl flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
          <FaCode /> Codex Playground
        </h1>
        <div className="flex items-center gap-3 flex-wrap">
          <select
            className="p-2 rounded-md bg-slate-800 text-slate-200 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              setCode(codeSnippets[e.target.value]);
            }}
          >
            {Object.keys(codeSnippets).map((lang) => (
              <option key={lang} value={lang}>{lang.toUpperCase()}</option>
            ))}
          </select>
          <button onClick={resetCode} className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-medium">
            <FaRedo /> Reset
          </button>
          <button onClick={downloadCode} className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm font-medium">
            <FaDownload /> Download
          </button>
          <button onClick={saveCode} className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-2 text-sm font-medium">
            <FaSave /> Save
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <section className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Code Editor */}
        <div className="h-[70vh] lg:col-span-2 border border-slate-700 rounded-xl overflow-hidden shadow-xl">
          <Editor
            height="100%"
            language={language}
            value={code}
            theme="vs-dark"
            onChange={(value) => setCode(value ?? "")}
            onMount={attachEditor}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              wordWrap: "on",
              automaticLayout: true,
              fontFamily: "Fira Code, monospace",
            }}
          />
        </div>

        {/* AI Panel */}
        <div className="lg:col-span-1 border border-slate-700 rounded-xl p-5 flex flex-col gap-5 shadow-xl bg-slate-800/50">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <button
                className={`px-3 py-2 rounded-md transition-colors font-medium flex items-center gap-2 ${aiTab === 'explain' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                onClick={() => setAiTab('explain')}
              >
                <FaRobot /> Explain
              </button>
              <button
                className={`px-3 py-2 rounded-md transition-colors font-medium flex items-center gap-2 ${aiTab === 'complete' ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                onClick={() => setAiTab('complete')}
              >
                <FaMagic /> Complete
              </button>
              <button
                className={`px-3 py-2 rounded-md transition-colors font-medium flex items-center gap-2 ${aiTab === 'solve' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                onClick={() => setAiTab('solve')}
              >
                <FaList /> Solve
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            {aiTab === 'solve' && (
              <textarea
                className="w-full flex-shrink-0 h-28 p-3 rounded-md bg-slate-800 text-slate-200 border border-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
                placeholder="Paste problem statement here…"
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
              />
            )}
            <div className="w-full flex justify-end">
              {aiTab === 'explain' && (
                <button onClick={onExplain} disabled={aiLoading} className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                  <FaRobot /> {aiLoading ? 'Explaining…' : 'Explain Code'}
                </button>
              )}
              {aiTab === 'complete' && (
                <div className="flex gap-2">
                  <button onClick={onComplete} disabled={aiLoading} className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                    <FaMagic /> {aiLoading ? 'Thinking…' : 'Get Suggestion'}
                  </button>
                  <button onClick={applyCompletionToEditor} className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors text-sm font-medium">Apply</button>
                </div>
              )}
              {aiTab === 'solve' && (
                <div className="flex gap-2">
                  <button onClick={onSolve} disabled={aiLoading} className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                    <FaBolt /> {aiLoading ? 'Solving…' : 'Solve'}
                  </button>
                  <button onClick={applySolvedCode} className="px-4 py-2 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors text-sm font-medium">Use Code</button>
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto bg-slate-800/60 border border-slate-700 rounded-md p-4 mt-2 whitespace-pre-wrap text-sm text-slate-300 leading-relaxed custom-scrollbar">
              {aiText ? (
                aiText
              ) : (
                <p className="text-slate-500 italic">
                  {aiTab === 'explain' && 'Click "Explain Code" to get a step-by-step explanation of your current file.'}
                  {aiTab === 'complete' && 'Click "Get Suggestion" to receive an AI completion. Then press "Apply" to insert it into the editor.'}
                  {aiTab === 'solve' && 'Paste a CP problem, press "Solve" to get an approach + code + complexity, then "Use Code" to replace the editor.'}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Input and Output Panels */}
      <section className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <label className="text-lg font-semibold text-slate-300">Custom Input (stdin)</label>
          <textarea
            className="w-full h-32 p-4 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors resize-none"
            placeholder="Paste your test case input here…"
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
          />
          <button
            onClick={runCode}
            className="bg-green-600 px-6 py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            <FaPlay /> {loading ? "Running…" : "Run Code"}
          </button>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 min-h-[14rem] overflow-y-auto shadow-xl custom-scrollbar">
          <h2 className="text-lg font-semibold mb-3">Output</h2>
          <pre className="whitespace-pre-wrap text-sm text-slate-300 leading-relaxed">{output}</pre>
        </div>
      </section>
      <footer className="w-full max-w-7xl text-center text-slate-500 mt-6">
        <p className="text-sm">Powered by CodexPlayground 2025 © Aditya Bakshi</p>
      </footer>
    </div>
  );
}
