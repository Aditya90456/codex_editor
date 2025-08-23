import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Send,
  Bot,
  Loader2,
  Briefcase,
  Code,
  Layers,
  User,
} from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function AgentAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("general");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const agents = [
    {
      id: "general",
      name: "General Mentor",
      desc: "Ask me anything, I’ll guide you.",
      icon: <User size={24} />,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "dsa",
      name: "DSA Mentor",
      desc: "Solve coding, DSA, and problem-solving doubts.",
      icon: <Code size={24} />,
      color: "from-green-500 to-green-600",
    },
    {
      id: "career",
      name: "Career Coach",
      desc: "Get advice on jobs, internships, resumes.",
      icon: <Briefcase size={24} />,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      id: "system",
      name: "System Design Mentor",
      desc: "Understand scalable system design & patterns.",
      icon: <Layers size={24} />,
      color: "from-purple-500 to-purple-600",
    },
  ];

  // Send Message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        "http://localhost:5000/ai",
        { prompt: input, agent: selectedAgent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiReply = res.data.reply?.trim() || "⚠️ No response";
      const aiMsg = { sender: agents.find((a) => a.id === selectedAgent).name, text: aiReply };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorText = "❌ AI error: " + (err.response?.data?.message || err.message);
      const errorMsg = { sender: "MentorAI", text: errorText };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Left Panel: Agent Selector */}
      <div className="w-1/4 border-r border-gray-700 p-4 flex flex-col space-y-4 bg-gray-800/70 backdrop-blur-lg">
        <h2 className="text-xl font-bold mb-2">Choose Your Mentor</h2>
        {agents.map((agent) => (
          <button
            key={agent.id}
            onClick={() => {
              setSelectedAgent(agent.id);
              setMessages([{ sender: agent.name, text: `👋 Hi! I’m your ${agent.name}. How can I help you today?` }]);
            }}
            className={`flex items-center gap-3 p-3 rounded-xl shadow-md text-left transition bg-gradient-to-r ${
              selectedAgent === agent.id
                ? `${agent.color} text-white`
                : "from-gray-800 to-gray-700 text-gray-300 hover:from-gray-700 hover:to-gray-600"
            }`}
          >
            <div>{agent.icon}</div>
            <div>
              <h3 className="font-semibold">{agent.name}</h3>
              <p className="text-sm opacity-80">{agent.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Right Panel: Chat */}
      <div className="flex-1 flex flex-col bg-gray-900/70">
        {/* Chat Window */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-2xl max-w-[70%] shadow-md ${
                msg.sender === "You"
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 ml-auto"
                  : "bg-gradient-to-r from-gray-700 to-gray-600 mr-auto"
              }`}
            >
              <p className="font-bold text-sm">{msg.sender}</p>
              <p className="text-base">{msg.text}</p>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-700 mr-auto p-3 rounded-2xl flex items-center gap-2"
            >
              <Loader2 className="animate-spin" />
              <span>Thinking...</span>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700 flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask your ${agents.find((a) => a.id === selectedAgent).name}...`}
            className="flex-1 bg-gray-800/70 rounded-xl px-4 py-2 outline-none"
          />
          <button
            onClick={sendMessage}
            className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition"
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}
