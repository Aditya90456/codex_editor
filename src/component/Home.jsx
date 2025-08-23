import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHtml5, FaPython, FaJsSquare, FaLaptopCode, FaBrain,
  FaSun, FaMoon, FaSearch, FaJava
} from "react-icons/fa";
import { CgCPlusPlus } from "react-icons/cg";
import { AiFillRobot } from "react-icons/ai";

// Custom Link (replace with react-router-dom Link if needed)
const Link = ({ to, children, ...props }) => (
  <a href={to} {...props}>{children}</a>
);

// Badge component
const CountBadge = ({ count, label }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/20">
    <span className="opacity-80">{label}</span>
    <span className="px-2 py-0.5 rounded-full bg-white/20">{count}</span>
  </div>
);

// Feature card
const FeatureCard = ({ icon: Icon, title, description, link, color, buttonText, theme }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    whileHover={{ y: -6, scale: 1.02 }}
    className={`group relative p-6 rounded-3xl transition-all duration-300 overflow-hidden backdrop-blur-lg border
      ${theme === "dark" ? "bg-slate-900/60 border-slate-700/70" : "bg-white/70 border-gray-200"}
    `}
  >
    <div className="pointer-events-none absolute -inset-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
      style={{
        background: `radial-gradient(600px 200px at 50% -10%, ${color.glow} 0%, transparent 60%)`
      }} />

    <div className="relative z-10">
      <Icon className={`${color.icon} text-5xl mb-4`} />
      <h3 className="text-xl font-bold mb-2 tracking-tight">{title}</h3>
      <p className={`text-sm mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{description}</p>
      <Link
        to={link}
        className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-white font-medium shadow-lg transition-all duration-300 ${color.button}`}
      >
        {buttonText}
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </Link>
    </div>
  </motion.div>
);

export default function EditorsAndRoadmaps() {
  const [user, setUser] = useState("Aditya Bakshi");
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    const dymicuser = localStorage.getItem("user");
    if (dymicuser) {
      setLoading(false);
      setUser(dymicuser);
    }
  }, []);

  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));

  // Data
  const editors = [
    { Icon: FaLaptopCode, color: { icon: "text-emerald-400", button: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700", glow: "rgba(16,185,129,0.25)" }, title: "Playground Editor", description: "Multi-language coding playground for experimenting and learning.", link: "/playground" },
    { Icon: CgCPlusPlus, color: { icon: "text-rose-400", button: "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700", glow: "rgba(244,63,94,0.28)" }, title: "C++ Editor", description: "Write, compile & debug C++ code instantly.", link: "/cpp" },
    { Icon: FaPython, color: { icon: "text-amber-400", button: "bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700", glow: "rgba(245,158,11,0.28)" }, title: "Python Editor", description: "Run Python scripts with zero setup in the browser.", link: "/python" },
    { Icon: FaJsSquare, color: { icon: "text-yellow-300", button: "bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700", glow: "rgba(250,204,21,0.24)" }, title: "JavaScript Editor", description: "Quickly execute JavaScript code in real-time.", link: "/js" },
    { Icon: FaHtml5, color: { icon: "text-sky-400", button: "bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700", glow: "rgba(56,189,248,0.28)" }, title: "Web Playground", description: "HTML/CSS/JS playground for frontend development.", link: "/editor" },
    { Icon: FaJava, color: { icon: "text-fuchsia-400", button: "bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700", glow: "rgba(217,70,239,0.25)" }, title: "Java Editor", description: "Compile and run Java code with ease.", link: "/java" }
  ];

  const roadmaps = [
    { Icon: FaBrain, color: { icon: "text-violet-400", button: "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700", glow: "rgba(139,92,246,0.30)" }, title: "DSA Roadmap", description: "Master DSA with structured learning and 300+ problems.", link: "/start" },
    { Icon: FaLaptopCode, color: { icon: "text-cyan-400", button: "bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700", glow: "rgba(34,211,238,0.30)" }, title: "Development Zone", description: "Build frontend & backend projects using modern stacks.", link: "/developmentroadmap" },
    { Icon: AiFillRobot, color: { icon: "text-green-400", button: "bg-gradient-to-r from-green-600 to-lime-600 hover:from-green-700 hover:to-lime-700", glow: "rgba(34,197,94,0.28)" }, title: "AI/ML Zone", description: "Dive into AI and machine learning with projects.", link: "/airoadmap" }
  ];

  const searchLower = search.toLowerCase();
  const filteredEditors = useMemo(() => editors.filter((e) => e.title.toLowerCase().includes(searchLower)), [searchLower]);
  const filteredRoadmaps = useMemo(() => roadmaps.filter((r) => r.title.toLowerCase().includes(searchLower)), [searchLower]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#070914] text-white">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }} className="text-6xl text-purple-400">
          <AiFillRobot />
        </motion.div>
        <span className="mt-6 text-xl text-gray-400">Loading your premium space…</span>
      </div>
    );
  }

  const bgBase = theme === "dark" ? "bg-[#070914] text-white" : "bg-gray-50 text-gray-900";

  return (
    <div className={`min-h-screen ${bgBase} relative overflow-hidden`}>
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-30">
        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-full shadow-lg border ${theme === "dark"
            ? "bg-slate-900/80 border-slate-700 text-yellow-300"
            : "bg-white/90 border-gray-200 text-gray-700"}`}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* HERO */}
      <section className="relative pt-20 pb-16">
        {/* Animated background blobs */}
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl bg-purple-500/40 animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full blur-3xl bg-cyan-500/40 animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Welcome to Codex Playground
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Your one-stop solution for coding editors, roadmaps, and DSA practice.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Hi <span className="font-semibold">{user}</span>, explore our editors and roadmaps to enhance your coding skills!
          </p>

          {/* Search + Tabs */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className={`flex items-center gap-3 p-2 rounded-2xl border shadow-lg ${theme === "dark" ? "bg-slate-900/70 border-slate-700" : "bg-white border-gray-200"}`}>
              <FaSearch className={`ml-3 text-xl ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search editors or roadmaps…"
                className={`flex-1 bg-transparent outline-none text-lg py-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              />
            </div>

            <div className="flex justify-center gap-3 mt-6">
              {[
                { id: "all", label: "All" },
                { id: "editors", label: "Editors" },
                { id: "roadmaps", label: "Roadmaps" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    tab === t.id
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-md"
                      : theme === "dark"
                        ? "bg-white/5 text-gray-300 hover:bg-white/10"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-3">
              <CountBadge count={filteredEditors.length} label="Editors" />
              <CountBadge count={filteredRoadmaps.length} label="Roadmaps" />
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <AnimatePresence mode="wait">
          {(tab === "all" || tab === "editors") && (
            <motion.section
              key="editors"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="mb-16"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  💻 Code Editors
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredEditors.length ? (
                  filteredEditors.map((e) => (
                    <FeatureCard key={e.title} icon={e.Icon} title={e.title} description={e.description} link={e.link} color={e.color} buttonText="Open Editor" theme={theme} />
                  ))
                ) : (
                  <div className="col-span-full text-center opacity-70">No editors match your search.</div>
                )}
              </div>
            </motion.section>
          )}

          {(tab === "all" || tab === "roadmaps") && (
            <motion.section
              key="roadmaps"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  🗺 Roadmaps
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {filteredRoadmaps.length ? (
                  filteredRoadmaps.map((r) => (
                    <FeatureCard key={r.title} icon={r.Icon} title={r.title} description={r.description} link={r.link} color={r.color} buttonText="Start Roadmap" theme={theme} />
                  ))
                ) : (
                  <div className="col-span-full text-center opacity-70">No roadmaps match your search.</div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* DSA SHEET */}
      <section className="px-6 max-w-5xl mx-auto mb-20">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`p-8 rounded-3xl shadow-xl border overflow-hidden relative ${theme === "dark" ? "bg-gradient-to-r from-pink-600/80 to-purple-600/80 border-pink-400/30" : "bg-gradient-to-r from-pink-300 to-purple-300 border-pink-200"}`}
        >
          <h2 className="text-2xl font-bold text-white">📑 DSA Sheet</h2>
          <p className="mt-2 text-white/90">Solve 280+ problems (Striver + Babbar) with tracking support.</p>
          <Link to="/dsasheet" className="mt-4 inline-block px-5 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition">
            Open Sheet →
          </Link>
        </motion.div>
      </section>
            {/* MENTORSHIP SECTION */}
      <section className="px-6 max-w-5xl mx-auto mb-20">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className={`p-8 rounded-3xl shadow-xl border flex flex-col md:flex-row items-center gap-6 text-center md:text-left
            ${theme === "dark"
              ? "bg-gradient-to-r from-indigo-600/80 to-purple-600/80 border-indigo-400/30"
              : "bg-gradient-to-r from-indigo-300 to-purple-300 border-indigo-200"}`}
        >
          {/* Avatar / Image */}
          <img
            src="https://avatars.githubusercontent.com/u/90456?v=4" // replace with your actual photo
            alt="Aditya Bakshi"
            className="w-28 h-28 rounded-full border-4 border-white/30 shadow-lg object-cover"
          />

          {/* Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">👨‍🏫 My Mentorship</h2>
            <p className="mt-2 text-white/90">
              I guide students in DSA, Development, and Open Source.  
              Book a mentorship call with me to accelerate your journey.
            </p>

            <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                to="https://preplaced.in/profile/aditya-bakshi"
                className="px-5 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition"
              >
                View Profile →
              </Link> 
            </div>
          </div>
        </motion.div>
      </section>

        {/* Mentor with AI * */}
      <section className="px-6 max-w-5xl mx-auto mb-20">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className={`p-8 rounded-3xl shadow-xl border flex flex-col md:flex-row items-center gap-6 text-center md:text-left
            ${theme === "dark"
              ? "bg-gradient-to-r from-green-600/80 to-teal-600/80 border-green-400/30"
              : "bg-gradient-to-r from-green-300 to-teal-300 border-green-200"}`}
        >
          {/* Avatar / Image */}
          <AiFillRobot className="w-28 h-28 text-white/90" />

          {/* Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">🤖 Get Agents AI</h2>
            <p className="mt-2 text-white/90">           
              An AI-powered coding mentor available 24/7 to assist you with coding problems, project ideas, and learning resources.
             </p>
          </div>

            <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                to="/mentorship-ai"
                className="px-5 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition"
              >
                Agents AI →
              </Link> 
            </div>
        </motion.div>
      </section>
      {/* FOOTER */}
      <footer className={`border-t ${theme === "dark" ? "border-white/10" : "border-black/10"} py-8 text-center text-sm`}>
        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
          © {new Date().getFullYear()} Codex Playground — All editors & roadmaps in one place.
        </span>
      </footer>
    </div>
  );
}
