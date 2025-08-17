import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Trophy, CheckCircle2, Circle, ChevronDown, Sun, Moon } from "lucide-react";

/**
 * Fancy Interactive Developer Roadmap (Timeline View)
 * - Pure React + Tailwind + Framer Motion (no UI libs)
 * - Vertical timeline with expandable stages
 * - Per-stage checklist with progress
 * - Overall progress bar
 * - Dark/Light toggle
 * - LocalStorage persistence
 */

const INITIAL_STAGES = [
  {
    id: "stage-1",
    title: "Foundations",
    desc: "Absolute basics: web, JS, and Git.",
    accent: "from-sky-500 to-cyan-500",
    topics: [
      { id: "t1", text: "Computer Basics & CLI", done: false },
      { id: "t2", text: "Git & GitHub", done: false },
      { id: "t3", text: "HTML & CSS", done: false },
      { id: "t4", text: "JavaScript Fundamentals", done: false },
    ],
    projects: [
      { id: "p1", text: "Portfolio Website" },
      { id: "p2", text: "To‑Do List (LocalStorage)" },
    ],
  },
  {
    id: "stage-2",
    title: "Frontend Core",
    desc: "Frameworks, APIs, styling.",
    accent: "from-fuchsia-500 to-violet-500",
    topics: [
      { id: "t5", text: "Modern JS (ES6+, async)", done: false },
      { id: "t6", text: "React + Hooks", done: false },
      { id: "t7", text: "TailwindCSS", done: false },
      { id: "t8", text: "API calls & error handling", done: false },
    ],
    projects: [
      { id: "p3", text: "Weather App (Open API)" },
      { id: "p4", text: "Movies Search (debounce)" },
    ],
  },
  {
    id: "stage-3",
    title: "Backend & Auth",
    desc: "APIs, DB, authentication.",
    accent: "from-amber-500 to-orange-500",
    topics: [
      { id: "t9", text: "Node.js & Express", done: false },
      { id: "t10", text: "MongoDB/SQL basics", done: false },
      { id: "t11", text: "Auth (JWT, sessions)", done: false },
      { id: "t12", text: "Validation & security basics", done: false },
    ],
    projects: [
      { id: "p5", text: "Blog API (CRUD)" },
      { id: "p6", text: "Auth Starter (JWT)" },
    ],
  },
  {
    id: "stage-4",
    title: "Full‑Stack & Ops",
    desc: "Deploy, test, and scale.",
    accent: "from-emerald-500 to-teal-500",
    topics: [
      { id: "t13", text: "Connect FE + BE", done: false },
      { id: "t14", text: "Testing (Jest/Cypress)", done: false },
      { id: "t15", text: "Deployment (Vercel/Render)", done: false },
      { id: "t16", text: "Basics of caching & queues", done: false },
    ],
    projects: [
      { id: "p7", text: "Chat App (WebSockets)" },
      { id: "p8", text: "Mini E‑commerce" },
    ],
  },
];

const STORAGE_KEY = "fancy-roadmap-v1";
const THEME_KEY = "fancy-roadmap-theme";

function usePersistedState() {
  const [stages, setStages] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : INITIAL_STAGES;
    } catch {
      return INITIAL_STAGES;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stages)); } catch {}
  }, [stages]);
  return [stages, setStages];
}

function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      const raw = localStorage.getItem(THEME_KEY);
      return raw ? JSON.parse(raw) : false;
    } catch { return false; }
  });
  useEffect(() => {
    try { localStorage.setItem(THEME_KEY, JSON.stringify(dark)); } catch {}
  }, [dark]);
  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);
  return [dark, setDark];
}

function StageProgress({ topics }) {
  const value = useMemo(() => {
    if (!topics?.length) return 0;
    const done = topics.filter(t => t.done).length;
    return Math.round((done / topics.length) * 100);
  }, [topics]);
  return (
    <div className="w-full">
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="text-xs mt-1 text-gray-600 dark:text-gray-300">{value}% complete</div>
    </div>
  );
}

export default function FancyRoadmap() {
  const [stages, setStages] = usePersistedState();
  const [expanded, setExpanded] = useState(() => new Set(stages.map(s => s.id)));
  const [dark, setDark] = useTheme();

  const overall = useMemo(() => {
    const all = stages.flatMap(s => s.topics);
    if (!all.length) return 0;
    const done = all.filter(t => t.done).length;
    return Math.round((done / all.length) * 100);
  }, [stages]);

  const toggleTopic = (sid, tid) => {
    setStages(prev => prev.map(s =>
      s.id === sid ? { ...s, topics: s.topics.map(t => t.id === tid ? { ...t, done: !t.done } : t) } : s
    ));
  };

  const toggleExpanded = (sid) => {
    setExpanded(prev => {
      const n = new Set(prev);
      n.has(sid) ? n.delete(sid) : n.add(sid);
      return n;
    });
  };

  return (
    <div className="min-h-screen mt-11 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Rocket className="w-6 h-6" />
          <h1 className="text-2xl font-bold tracking-tight">Developer Journey</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-44">
            <div className="text-xs mb-1 text-gray-600 dark:text-gray-300">Overall Progress</div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-fuchsia-500 to-violet-500" style={{ width: `${overall}%` }} />
            </div>
            <div className="text-[10px] mt-1 text-gray-600 dark:text-gray-300">{overall}%</div>
          </div>
          <button
            onClick={() => setDark(v => !v)}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 backdrop-blur hover:bg-white dark:hover:bg-gray-900 transition"
            title="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="text-sm">{dark ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="relative pl-6 md:pl-10">
          {/* vertical line */}
          <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

          {stages.map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="relative mb-6"
            >
              {/* Node */}
              <div className="absolute -left-1 md:-left-0.5 mt-2">
                <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${s.accent} shadow ring-4 ring-white dark:ring-gray-900`} />
              </div>

              {/* Card */}
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-4 md:p-5 shadow hover:shadow-lg transition">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                      <span>{s.title}</span>
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{s.desc}</p>
                  </div>
                  <button
                    onClick={() => toggleExpanded(s.id)}
                    className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-700 px-2.5 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <ChevronDown className={`w-4 h-4 transition ${expanded.has(s.id) ? 'rotate-180' : ''}`} />
                    {expanded.has(s.id) ? 'Collapse' : 'Expand'}
                  </button>
                </div>

                {/* per-stage progress */}
                <div className="mt-3">
                  <StageProgress topics={s.topics} />
                </div>

                <AnimatePresence initial={false}>
                  {expanded.has(s.id) && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-4 grid md:grid-cols-2 gap-4"
                    >
                      {/* Topics */}
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Topics</h3>
                        <ul className="space-y-2">
                          {s.topics.map(t => (
                            <li key={t.id} className="flex items-center gap-2">
                              <button
                                onClick={() => toggleTopic(s.id, t.id)}
                                className="inline-flex items-center justify-center w-5 h-5 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                                aria-label={t.done ? 'Mark incomplete' : 'Mark complete'}
                              >
                                {t.done ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                ) : (
                                  <Circle className="w-4 h-4 text-gray-400" />
                                )}
                              </button>
                              <span className={t.done ? 'line-through text-gray-500' : ''}>{t.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Projects */}
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Projects</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                          {s.projects.map(p => (
                            <li key={p.id}>{p.text}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}

          {/* Capstone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -left-1 md:-left-0.5 mt-2">
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-600 shadow ring-4 ring-white dark:ring-gray-900" />
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur p-5 shadow">
              <div className="flex items-center gap-2 text-lg md:text-xl font-semibold">
                <Trophy className="w-5 h-5 text-amber-500" />
                Capstone Projects
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Bring everything together with real‑world builds.</p>
              <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm">
                <a className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition" href="https://github.com/vercel/commerce" target="_blank" rel="noreferrer">Next.js Commerce – Full‑stack e‑commerce</a>
                <a className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition" href="https://github.com/socketio/chat-example" target="_blank" rel="noreferrer">Real‑time Chat – Socket.io</a>
                <a className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition" href="https://github.com/stripe-samples/nextjs-subscription-payments" target="_blank" rel="noreferrer">SaaS Subscriptions – Stripe + Next.js</a>
                <a className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition" href="https://github.com/tailwindtoolbox/Kanban-Board" target="_blank" rel="noreferrer">Kanban Project Manager – Drag & Drop</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
