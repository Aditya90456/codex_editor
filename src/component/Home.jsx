import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaHtml5, FaPython, FaJsSquare, FaLaptopCode, FaBrain, FaUserCircle, FaEnvelope, FaMoon, FaSun, FaSearch, FaSignOutAlt, FaJava } from "react-icons/fa";
import { CgCPlusPlus } from "react-icons/cg";
import { AiFillRobot } from "react-icons/ai";

// Dummy Link component (replace with react-router-dom's Link if available)
const Link = ({ to, children, ...props }) => (
  <a href={to} {...props}>
    {children}
  </a>
);

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, link, color, buttonText, theme }) => (
  <motion.div
    className={`p-6 rounded-3xl shadow-xl text-center transition-all duration-300 relative overflow-hidden backdrop-blur-lg ${
      theme === "dark" ? "bg-slate-800/60 border border-slate-700" : "bg-white/60 border border-gray-300"
    }`}
    whileHover={{ scale: 1.05, boxShadow: `0 0 25px ${color.hoverShadow}` }}
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-900/10 pointer-events-none" />
    <Icon className={`${color.icon} text-5xl mb-4 mx-auto`} />
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className={`text-sm mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{description}</p>
    <Link
      to={link}
      className={`inline-block px-6 py-3 rounded-full text-white font-medium shadow-lg transition-all duration-300 ${color.buttonGradient}`}
    >
      {buttonText}
    </Link>
  </motion.div>
);

function PremiumDashboard() {
  const [user, setUser] = useState("Aditya Bakshi");
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [searchQuery, setSearchQuery] = useState("");

  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  const editors = [
    {
      Icon: FaLaptopCode,
      color: { icon: "text-green-400", buttonGradient: "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl", hoverShadow: "rgba(34, 197, 94, 0.5)" },
      title: "Playground Editor",
      description: "Multi-language coding playground for experimenting and learning.",
      link: "/playground",
    },
    {
      Icon: CgCPlusPlus,
      color: { icon: "text-red-400", buttonGradient: "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 hover:shadow-xl", hoverShadow: "rgba(239, 68, 68, 0.5)" },
      title: "C++ Editor",
      description: "Write, compile & debug C++ code online instantly.",
      link: "/cpp",
    },
    {
      Icon: FaPython,
      color: { icon: "text-orange-400", buttonGradient: "bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 hover:shadow-xl", hoverShadow: "rgba(251, 191, 36, 0.5)" },
      title: "Python Editor",
      description: "Run Python scripts with zero setup in the browser.",
      link: "/python",
    },
    {
      Icon: FaJsSquare,
      color: { icon: "text-yellow-400", buttonGradient: "bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 hover:shadow-xl", hoverShadow: "rgba(252, 211, 77, 0.5)" },
      title: "JavaScript Editor",
      description: "Quickly execute JavaScript code in real-time.",
      link: "/js",
    },
    {
      Icon: FaHtml5,
      color: { icon: "text-blue-500", buttonGradient: "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl", hoverShadow: "rgba(59, 130, 246, 0.5)" },
      title: "Web Playground",
      description: "HTML/CSS/JS playground for frontend development.",
      link: "/editor",
    },
    {
      Icon: FaJava,
      color: { icon: "text-pink-400", buttonGradient: "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 hover:shadow-xl", hoverShadow: "rgba(236, 72, 153, 0.5)" },
      title: "Java Editor",
      description: "Compile and run Java code with ease.",
      link: "/java",
    },
  ];

  const roadmaps = [
    {
      Icon: FaBrain,
      color: { icon: "text-purple-400", buttonGradient: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl", hoverShadow: "rgba(168, 85, 247, 0.5)" },
      title: "DSA Roadmap",
      description: "Master DSA with structured learning and 300+ coding problems.",
      link: "/start",
    },
    {
      Icon: FaLaptopCode,
      color: { icon: "text-cyan-400", buttonGradient: "bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 hover:shadow-xl", hoverShadow: "rgba(34, 211, 238, 0.5)" },
      title: "Development Zone",
      description: "Build frontend & backend projects using modern tech stacks.",
      link: "/developmentroadmap",
    },
    {
      Icon: AiFillRobot,
      color: { icon: "text-green-400", buttonGradient: "bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700 hover:shadow-xl", hoverShadow: "rgba(34, 197, 94, 0.5)" },
      title: "AI/ML Zone",
      description: "Dive into AI and machine learning with hands-on projects.",
      link: "/airoadmap",
    },
  ];

  const allFeatures = [
    ...editors.map(e => ({ ...e, type: "editor", buttonText: "Open Editor" })),
    ...roadmaps.map(r => ({ ...r, type: "roadmap", buttonText: "Start Roadmap" })),
  ];

  const filteredFeatures = useMemo(
    () => allFeatures.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#070914] text-white">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="text-6xl text-purple-400">
          <AiFillRobot />
        </motion.div>
        <span className="mt-6 text-xl text-gray-400">Loading your premium dashboard...</span>
      </div>
    );
  }

  return (
    <div className={`min-h-screen px-4 py-12 relative overflow-hidden font-sans transition-colors duration-500 ${theme === "dark" ? "bg-[#070914] text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <AnimatePresence>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-30"
              style={{
                background: `radial-gradient(circle, ${Math.random() > 0.5 ? "#6366F1" : "#A855F7"}, transparent)`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -50, 0], opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
              transition={{ duration: Math.random() * 8 + 6, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4 flex space-x-3">
          <button onClick={toggleTheme} className={`p-2 rounded-full ${theme === "dark" ? "bg-slate-800 text-yellow-300" : "bg-gray-200 text-gray-700"}`}>
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Hero */}
        <motion.div style={{ y: parallaxY }} className="text-center mt-12 mb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">🚀 Welcome back, {user}</h1>
          <p className="mt-4 inline-block px-4 py-1 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full">Premium Access ✨</p>
        </motion.div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className={`flex items-center p-3 rounded-full shadow-xl backdrop-blur-lg ${theme === "dark" ? "bg-slate-800/60" : "bg-white/60"}`}>
            <FaSearch className={`ml-2 text-xl ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
            <input
              type="text"
              placeholder="Search editors or roadmaps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full ml-4 bg-transparent outline-none text-lg ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            />
          </div>
        </div>

        {/* Features */}
        <motion.section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">💻 All Features</h2>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredFeatures.length > 0 ? filteredFeatures.map((item) => (
              <FeatureCard key={item.title} icon={item.Icon} title={item.title} description={item.description} link={item.link} color={item.color} buttonText={item.buttonText} theme={theme} />
            )) : <div className="col-span-full text-center text-gray-400">No matching features found.</div>}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}

export default function App() {
  return <PremiumDashboard />;
}
