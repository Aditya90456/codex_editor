import { Link } from "react-router-dom";
import { FaBolt, FaBrain, FaTrophy } from "react-icons/fa";

function CodexDSALanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f2c] via-[#0f172a] to-[#1e293b] text-white flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* 🌟 Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-pink-500 to-purple-700 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-20 blur-3xl"></div>

      {/* 🏷️ Top Badge */}
      <div className="mt-10 mb-4">
        <span className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-sm font-semibold shadow-lg">
          ✨ Premium DSA Builder
        </span>
      </div>

      {/* 📝 Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-center leading-tight mb-6">
        Level Up Your <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">DSA Skills</span><br />
        with the <span className="text-pink-400">280 Problem Sheet</span>
      </h1>

      {/* 🌟 Merged Subtext */}
      <p className="text-center max-w-2xl mb-8 text-lg bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent font-medium">
        Start your DSA journey today — build confidence, solve problems, and ace interviews step by step. We’ll help you finish strong.
      </p>

      {/* 🚀 Button */}
      <div className="flex justify-center mb-10">
        <Link
          to="/start"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium shadow-lg hover:from-pink-600 hover:to-purple-700 transition"
        >
          🚀 Start Solving Now
        </Link>
      </div>

      {/* 🏆 Features */}
      <div className="flex flex-wrap justify-center gap-6">
        <FeatureBadge icon={<FaBrain />} text="280+ Curated Problems" />
        <FeatureBadge icon={<FaBolt />} text="5 Progressive Tiers" />
        <FeatureBadge icon={<FaTrophy />} text="Perfect for Beginners" />
      </div>

      {/* 🔥 Footer */}
      <footer className="text-gray-500 mt-16 text-center text-sm">
        © 2025 CodeX by Aditya | DSA Powered by CodeX Playground 
      </footer>
    </div>
  );
}

function FeatureBadge({ icon, text }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md shadow text-gray-100">
      {icon}
      <span>{text}</span>
    </div>
  );
}

export default CodexDSALanding;
