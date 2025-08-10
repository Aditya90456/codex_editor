import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaJava, FaPlay, FaTrash, FaSave, FaBug, FaMoon, FaSun } from "react-icons/fa";

export default function JavaEditor() {
  const [code, setCode] = useState(`public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n  }\n}`);
  const [output, setOutput] = useState("");
  const [theme, setTheme] = useState("dark");
  const [javaVersion, setJavaVersion] = useState("loading...");

  useEffect(() => {
    axios.get("/java/version")
      .then(res => setJavaVersion(res.data.version))
      .catch(() => setJavaVersion("unknown"));
  }, []);

  const runCode = async () => {
    try {
      const data=await axios.post('http://localhost:5000/run/java', { code });
     
      setOutput(data.data.output || "(no output)");
      

    } catch (error) {
      console.error("Error running code:", error);
      setOutput("Error running code. Please check the console for details.");
    } 
  };

  const clearCode = () => setCode("");
  const saveCode = () => setOutput("Code saved successfully!");

  return (
    <div className={`min-h-screen flex mt-9 flex-col items-center justify-center gap-8 transition-colors duration-500 ${theme === "dark" ? "bg-gradient-to-br from-gray-900 via-black to-gray-800" : "bg-gradient-to-br from-yellow-50 to-white"}`}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`flex flex-col items-center gap-5 px-8 py-6 rounded-2xl shadow-2xl border ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"}`}
      >
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-3 text-2xl font-bold">
            <FaJava className={`${theme === "dark" ? "text-orange-400" : "text-orange-600"}`} size={32} />
            <span className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>Java Playground </span>
          </div>
          <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Runtime: {javaVersion}
          </div>
        </div>

        <textarea
          className={`w-[650px] h-[280px] p-4 rounded-lg font-mono text-sm border resize-none focus:outline-none focus:ring-2 ${theme === "dark" ? "bg-black text-green-400 border-gray-700 focus:ring-blue-500" : "bg-gray-50 text-gray-800 border-gray-300 focus:ring-orange-400"}`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <div className="flex gap-4">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={`p-3 rounded-full shadow ${theme === "dark" ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-yellow-300 hover:bg-yellow-400 text-gray-900"}`}>
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={saveCode} className="p-3 bg-green-500 hover:bg-green-400 rounded-full text-white shadow">
            <FaSave />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={clearCode} className="p-3 bg-red-500 hover:bg-red-400 rounded-full text-white shadow">
            <FaTrash />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={runCode} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full text-white font-semibold shadow">
            <FaPlay /> Run
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`w-[650px] p-5 rounded-xl shadow-lg border ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"}`}
      >
        <div className={`flex items-center gap-2 mb-3 ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}>
          <FaBug /> Output
        </div>
        <pre className={`p-4 rounded-lg max-h-48 overflow-auto whitespace-pre-wrap ${theme === "dark" ? "bg-black text-green-400" : "bg-gray-50 text-gray-800"}`}>{output || "(no output)"}</pre>
      </motion.div>
    </div>
  );
}
