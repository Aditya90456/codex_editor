import React from "react";
import { Link } from "react-router-dom";
import { FaBolt, FaBrain, FaTrophy, FaChevronRight } from "react-icons/fa";

// Main landing page component for the Codex DSA platform.
// This design features a clean, two-column layout for a modern,
// professional aesthetic. It is fully responsive and uses Tailwind CSS.
function CodexDSALanding() {
  return (
    // Main container with a dark background and full-screen height.
    <div className="relative min-h-screen bg-[#0c0d12] text-gray-100 flex items-center justify-center p-4 md:p-8 overflow-hidden font-inter">
      
      {/* Subtle background glow effect for visual depth */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-500 rounded-full opacity-5 blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>

      {/* Main content container, centered and responsive */}
      <div className="z-10 w-full max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Column: Text Content and CTA */}
          <div className="md:w-1/2 text-center md:text-left">
            
            {/* Top badge */}
            <div className="mb-4">
              <span className="px-4 py-1.5 rounded-full bg-gray-800 text-sm font-semibold text-gray-300 border border-gray-700 shadow-xl">
                CODEX
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
              Level Up Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                DSA Skills
              </span>
            </h1>

            {/* Subtitle/Description */}
            <p className="max-w-xl mx-auto md:mx-0 text-lg text-gray-400 font-light mb-8">
              Start your DSA journey today — build confidence, solve problems, and ace
              interviews step by step. We’ll help you finish strong.
            </p>

            {/* The heading element */}
            <h2 className="text-2xl font-bold text-white mb-6">
              heading
            </h2>

            {/* Feature badges section */}
            <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-6">
              <FeatureBadge
                icon={<FaBrain className="text-xl text-purple-400" />}
                text="Curated Problems"
              />
              <FeatureBadge
                icon={<FaBolt className="text-xl text-blue-400" />}
                text="5 Progressive Tiers"
              />
              <FeatureBadge
                icon={<FaTrophy className="text-xl text-yellow-400" />}
                text="Perfect for Beginners"
              />
            </div>
          </div>

          {/* Right Column: Visual Element */}
          <div className="md:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md h-72 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 ease-in-out">
              <div className="w-full h-full p-6 flex flex-col justify-end items-start text-white">
                <span className="text-4xl font-bold">DSA Roadmap</span>
                <span className="text-sm font-medium mt-2 opacity-80">Your path to mastering data structures and algorithms.</span>
                <span className="mt-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/20">Learn More</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-gray-500 text-center text-xs">
          © 2025 CodeX by Aditya | DSA Powered by CodeX Playground
        </footer>
      </div>
    </div>
  );
}

// Reusable component for displaying a single feature.
// It is now a more compact, horizontal badge.
function FeatureBadge({ icon, text }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 backdrop-blur-md shadow-lg text-center transform transition-all duration-300 ease-in-out hover:bg-gray-700/50 hover:scale-105">
      {icon}
      <span className="text-sm font-medium text-gray-300">{text}</span>
    </div>
  );
}

// Export the main component for use in other parts of the application.
export default CodexDSALanding;
