import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { FaPlay, FaSave, FaTrash } from "react-icons/fa";

export default function PythonEditorWithRun() {
  const [code, setCode] = useState(`# Write your Python code here\nprint("Hello, CodeX!")`);
  const [filename, setFilename] = useState("snippet.py");
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // Run code on server
  const runCode = async () => {
    setLoading(true);
    setOutput("Running...");
    try {
      const res = await fetch("http://localhost:5000/run/python", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, stdin }),
      });
      const data = await res.json();
      // backend returns { output, error, timeout }
      if (data.error) {
        setOutput(`❌ Error:\n${data.error}`);
      } else if (data.timeout) {
        setOutput("⏱️ Execution timed out.");
      } else {
        setOutput(String(data.output ?? ""));
      }
    } catch (err) {
      setOutput(`❌ Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Keyboard shortcut: Ctrl/Cmd+Enter to run
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        runCode();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [code, stdin]);

  const clearCode = () => {
    setCode("");
    setOutput("");
  };

  const saveCode = () => {
    const snippets = JSON.parse(localStorage.getItem("python_snippets") || "[]");
    snippets.push({ id: Date.now(), filename, code, savedAt: new Date().toLocaleString() });
    localStorage.setItem("python_snippets", JSON.stringify(snippets));
    setOutput(`✅ Saved as "${filename}"`);
  };

  return (
    <div className="min-h-screen w-full mt-9 p-6 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <input
          type="text"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          placeholder="filename (e.g., main.py)"
          className="p-2 rounded bg-gray-800 border border-gray-600"
        />
        <button onClick={runCode} disabled={loading} className="px-4 py-2 rounded bg-green-500 hover:bg-green-600">
          <FaPlay style={{ marginRight: 8 }} /> {loading ? "Running..." : "Run (Ctrl+Enter)"}
        </button>
        <button onClick={saveCode} className="px-3 py-2 rounded bg-indigo-500 hover:bg-indigo-600"><FaSave /></button>
        <button onClick={clearCode} className="px-3 py-2 rounded bg-red-500 hover:bg-red-600"><FaTrash /></button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 12 }}>
        <div>
          <Editor
            height="60vh"
            language="python"
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{ fontSize: 14, minimap: { enabled: false }, automaticLayout: true }}
          />

          <div style={{ marginTop: 8 }}>
            <label style={{ display: "block", marginBottom: 6 }}>Custom stdin (optional)</label>
            <textarea
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              rows={4}
              style={{ width: "100%", fontFamily: "monospace", padding: 8, borderRadius: 6 }}
            />
          </div>
        </div>

        <div>
          <div style={{ background: "#0b1220", padding: 12, borderRadius: 8, minHeight: 180 }}>
            <div style={{ fontSize: 14, marginBottom: 6 }}>Output</div>
            <pre style={{ whiteSpace: "pre-wrap", color: "#d1f1c6" }}>{output || "No output yet. Click Run."}</pre>
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 13, color: "#ccc", marginBottom: 6 }}>Tips</div>
            <ul style={{ color: "#ddd", fontSize: 13 }}>
              <li>Ctrl/Cmd + Enter to run</li>
              <li>Server must be running at <code>http://localhost:5000</code></li>
              <li>Use small inputs; untrusted code should be sandboxed in production</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
