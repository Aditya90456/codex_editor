import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, CheckCircle2, Circle, ChevronDown, Download, Search, ChevronRight } from "lucide-react";

/**
 * DSA Roadmap – Dark Only, Fancy, Collapsible, Sidebar, Search, Export
 * - Pure React + Tailwind + Framer Motion
 * - Dark-only neon look
 * - Collapsible sections with per-topic + overall progress
 * - Subtopic checkboxes (persisted via localStorage)
 * - Left sidebar for quick navigation + per-topic progress
 * - Search to filter subtopics (live highlight)
 * - Export JSON of your progress
 */

// ---------- Roadmap Data (Topics + Subtopics) ----------
const INITIAL_TOPICS = [
  {
    id: "arrays",
    title: "Arrays",
    level: "Basics",
    desc: "Traversal, two pointers, prefix/suffix tricks, sliding window.",
    accent: "from-sky-500 to-cyan-500",
    subs: [
      { id: "a1", text: "Reverse array / rotate array", link: "#", done: false },
      { id: "a2", text: "Max subarray (Kadane)", link: "#", done: false },
      { id: "a3", text: "Two-sum / Two pointers", link: "#", done: false },
      { id: "a4", text: "Sliding window (fixed/variable)", link: "#", done: false },
    ],
  },
  {
    id: "strings",
    title: "Strings",
    level: "Core",
    desc: "Hashing, frequency maps, two pointers, substring patterns.",
    accent: "from-fuchsia-500 to-violet-500",
    subs: [
      { id: "s1", text: "Anagram / frequency counter", link: "#", done: false },
      { id: "s2", text: "Longest substring (sliding window)", link: "#", done: false },
      { id: "s3", text: "String hashing (basic)", link: "#", done: false },
      { id: "s4", text: "KMP / Z (choose one)", link: "#", done: false },
    ],
  },
  {
    id: "recursion",
    title: "Recursion & Backtracking",
    level: "Core",
    desc: "Base/recursive cases, state, pruning, order of choices.",
    accent: "from-amber-500 to-orange-500",
    subs: [
      { id: "r1", text: "Subset/Permutation generation", link: "#", done: false },
      { id: "r2", text: "N-Queens / Sudoku (choose one)", link: "#", done: false },
      { id: "r3", text: "Combination Sum patterns", link: "#", done: false },
      { id: "r4", text: "Backtracking with constraints", link: "#", done: false },
    ],
  },
  {
    id: "binary-search",
    title: "Binary Search",
    level: "Core",
    desc: "On arrays & on answers (min x such that …).",
    accent: "from-emerald-500 to-teal-500",
    subs: [
      { id: "b1", text: "Classic lower/upper bound", link: "#", done: false },
      { id: "b2", text: "Search in rotated sorted array", link: "#", done: false },
      { id: "b3", text: "Binary search on answer (capacity, time)", link: "#", done: false },
      { id: "b4", text: "Peak / bitonic / valleys", link: "#", done: false },
    ],
  },
  {
    id: "linked-list",
    title: "Linked List",
    level: "Core",
    desc: "Two pointers, reversing, merge, cycle detection.",
    accent: "from-blue-500 to-indigo-500",
    subs: [
      { id: "l1", text: "Reverse LL (iterative/recursive)", link: "#", done: false },
      { id: "l2", text: "Middle / kth from end (fast/slow)", link: "#", done: false },
      { id: "l3", text: "Cycle detect + entry (Floyd)", link: "#", done: false },
      { id: "l4", text: "Merge two & merge k lists", link: "#", done: false },
    ],
  },
  {
    id: "stack-queue",
    title: "Stack & Queue",
    level: "Core",
    desc: "Monotonic stack, deque, parentheses, LRU basics.",
    accent: "from-rose-500 to-pink-500",
    subs: [
      { id: "sq1", text: "Valid parentheses / next greater", link: "#", done: false },
      { id: "sq2", text: "Monotonic stack (histogram)", link: "#", done: false },
      { id: "sq3", text: "Sliding window max (deque)", link: "#", done: false },
      { id: "sq4", text: "LRU cache idea", link: "#", done: false },
    ],
  },
  {
    id: "trees",
    title: "Binary Trees",
    level: "Core → Advanced",
    desc: "Traversals, DFS/BFS, LCA, diameter, DP on trees.",
    accent: "from-lime-500 to-green-600",
    subs: [
      { id: "t1", text: "Traversals (pre/in/post, level)", link: "#", done: false },
      { id: "t2", text: "Tree views / boundary", link: "#", done: false },
      { id: "t3", text: "LCA / diameter", link: "#", done: false },
      { id: "t4", text: "BST ops & properties", link: "#", done: false },
    ],
  },
  {
    id: "graphs",
    title: "Graphs",
    level: "Advanced",
    desc: "Adjacency, BFS/DFS, shortest paths, MST, topo sort.",
    accent: "from-cyan-500 to-sky-600",
    subs: [
      { id: "g1", text: "BFS/DFS (grid & general)", link: "#", done: false },
      { id: "g2", text: "Topo sort / cycle detect (DAG)", link: "#", done: false },
      { id: "g3", text: "Dijkstra / 0-1 BFS", link: "#", done: false },
      { id: "g4", text: "MST (Kruskal/Prim)", link: "#", done: false },
    ],
  },
  {
    id: "dp",
    title: "Dynamic Programming",
    level: "Advanced",
    desc: "1D/2D DP, knapsack, LIS, grid DP, optimization.",
    accent: "from-purple-500 to-fuchsia-600",
    subs: [
      { id: "d1", text: "1D DP patterns (climb stairs)", link: "#", done: false },
      { id: "d2", text: "0/1 knapsack / subset sum", link: "#", done: false },
      { id: "d3", text: "LIS / patience intuition", link: "#", done: false },
      { id: "d4", text: "Grid DP (paths/coins)", link: "#", done: false },
    ],
  },
];

const STORAGE_KEY = "dsa-roadmap-v2-dark";

// ---------- Hooks ----------
function usePersistedTopics() {
  const [topics, setTopics] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : INITIAL_TOPICS;
    } catch {
      return INITIAL_TOPICS;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(topics)); } catch {}
  }, [topics]);
  return [topics, setTopics];
}

// ---------- Utilities ----------
const calcOverall = (topics) => {
  const all = topics.flatMap(t => t.subs);
  if (!all.length) return 0;
  const done = all.filter(s => s.done).length;
  return Math.round((done / all.length) * 100);
};

const calcTopic = (subs) => {
  if (!subs?.length) return 0;
  const d = subs.filter(s => s.done).length;
  return Math.round((d / subs.length) * 100);
};

function highlight(text, q) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-cyan-300">{text.slice(idx, idx + q.length)}</span>
      {text.slice(idx + q.length)}
    </>
  );
}

// ---------- Small UI ----------
function Bar({ value }) {
  return (
    <div className="w-full">
      <div className="h-2 bg-[#161b22] rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-violet-500 transition-all" style={{ width: `${value}%` }} />
      </div>
      <div className="text-[11px] mt-1 text-gray-400">{value}%</div>
    </div>
  );
}

// ---------- Main Component ----------
export default function DSARoadmapDark() {
  const [topics, setTopics] = usePersistedTopics();
  const [expanded, setExpanded] = useState(() => new Set(topics.map(t => t.id)));
  const [query, setQuery] = useState("");

  const overall = useMemo(() => calcOverall(topics), [topics]);

  const toggleSub = (tid, sid) => {
    setTopics(prev => prev.map(t =>
      t.id === tid ? { ...t, subs: t.subs.map(s => s.id === sid ? { ...s, done: !s.done } : s) } : t
    ));
  };

  const toggleExpanded = (tid) => {
    setExpanded(prev => {
      const n = new Set(prev);
      n.has(tid) ? n.delete(tid) : n.add(tid);
      return n;
    });
  };

  const setAllInTopic = (tid, value) => {
    setTopics(prev => prev.map(t =>
      t.id === tid ? { ...t, subs: t.subs.map(s => ({ ...s, done: value })) } : t
    ));
  };

  const resetAll = () => setTopics(INITIAL_TOPICS);

  const exportJSON = () => {
    const data = topics.map(t => ({
      id: t.id,
      title: t.title,
      progress: calcTopic(t.subs),
      completed: t.subs.filter(s => s.done).map(s => s.text),
      remaining: t.subs.filter(s => !s.done).map(s => s.text),
    }));
    const blob = new Blob([JSON.stringify({ overall, topics: data }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dsa-progress.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter by query: a topic is shown if any sub matches or query empty
  const filteredTopics = useMemo(() => {
    if (!query.trim()) return topics;
    const q = query.trim().toLowerCase();
    return topics
      .map(t => ({
        ...t,
        subs: t.subs.filter(s => s.text.toLowerCase().includes(q))
      }))
      .filter(t => t.subs.length > 0);
  }, [topics, query]);

  return (
    <div className="min-h-screen bg-[#0d1117] mt- 8 text-gray-200">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 border-b border-white/5 bg-[#0d1117]/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <h1 className="text-lg md:text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
            DSA Roadmap
          </h1>
          <div className="hidden md:flex items-center gap-3 ml-auto w-[320px]">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search subtopics…"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0b1220]/70 border border-white/10 outline-none focus:ring-2 ring-cyan-500/40 text-sm"
              />
            </div>
            <button
              onClick={exportJSON}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm"
              title="Export progress as JSON"
            >
              <Download className="w-4 h-4" /> Export
            </button>
            <button
              onClick={resetAll}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm"
              title="Reset all progress"
            >
              Reset
            </button> 
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="md:sticky md:top-16 h-max rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <div className="text-xs uppercase tracking-wider text-gray-400 px-2 mb-2">Topics</div>
          <nav className="space-y-1">
            {topics.map(t => (
              <a key={t.id} href={`#${t.id}`} className="group flex items-center justify-between gap-2 px-3 py-2 rounded-xl hover:bg-white/[0.06] transition">
                <span className="truncate text-sm">{t.title}</span>
                <span className="text-[10px] text-gray-400 group-hover:text-cyan-300">{calcTopic(t.subs)}%</span>
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Timeline */}
        <main>
          {/* Overall */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 mb-6">
            <div className="text-xs text-gray-400 mb-1">Overall Progress</div>
            <Bar value={overall} />
          </div>

          <div className="relative pl-6 md:pl-10">
            {/* vertical line */}
            <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            {filteredTopics.map((t, idx) => (
              <motion.section
                id={t.id}
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="relative mb-6 scroll-mt-24"
              >
                {/* Node */}
                <div className="absolute -left-1 md:-left-0.5 mt-2">
                  <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${t.accent} shadow ring-4 ring-[#0d1117]`} />
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-4 md:p-5 shadow hover:shadow-[0_0_0_2px_rgba(56,189,248,0.25)] transition">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                        <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">{t.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">{t.level}</span>
                      </h2>
                      <p className="text-sm text-gray-400 mt-1">{t.desc}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAllInTopic(t.id, true)}
                        className="text-xs px-2 py-1 rounded-lg border border-white/10 hover:bg-white/10"
                      >
                        Mark all
                      </button>
                      <button
                        onClick={() => setAllInTopic(t.id, false)}
                        className="text-xs px-2 py-1 rounded-lg border border-white/10 hover:bg-white/10"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => toggleExpanded(t.id)}
                        className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-sm hover:bg-white/10"
                      >
                        <ChevronDown className={`w-4 h-4 transition ${expanded.has(t.id) ? 'rotate-180' : ''}`} />
                        {expanded.has(t.id) ? 'Collapse' : 'Expand'}
                      </button>
                    </div>
                  </div>

                  {/* per-topic progress */}
                  <div className="mt-3">
                    <Bar value={calcTopic(t.subs)} />
                  </div>

                  <AnimatePresence initial={false}>
                    {expanded.has(t.id) && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-4"
                      >
                        <ul className="space-y-2">
                          {t.subs.map(s => (
                            <li key={s.id} className="flex items-center gap-2">
                              <button
                                onClick={() => toggleSub(t.id, s.id)}
                                className="inline-flex items-center justify-center w-5 h-5 rounded-md border border-white/15 hover:bg-white/10"
                                aria-label={s.done ? 'Mark incomplete' : 'Mark complete'}
                              >
                                {s.done ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <Circle className="w-4 h-4 text-gray-500" />
                                )}
                              </button>
                              <a
                                href={s.link || '#'}
                                target="_blank"
                                rel="noreferrer"
                                className={`text-sm hover:text-cyan-300 transition ${s.done ? 'line-through text-gray-500' : 'text-gray-200'}`}
                              >
                                {highlight(s.text, query)}
                              </a>
                              <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.section>
            ))}

            {/* Capstone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -left-1 md:-left-0.5 mt-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-600 shadow ring-4 ring-[#0d1117]" />
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur p-5 shadow">
                <div className="flex items-center gap-2 text-lg md:text-xl font-semibold">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  Capstone: Interview Readiness
                </div>
                <p className="text-sm text-gray-300 mt-1">Timed practice, mixed-topic sets, and mock interviews.</p>
                <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm">
                  <span className="rounded-xl border border-white/10 p-3">150+ DSA patterns revision sheet</span>
                  <span className="rounded-xl border border-white/10 p-3">Weekly mock contests</span>
                  <span className="rounded-xl border border-white/10 p-3">System design primer (basics)</span>
                  <span className="rounded-xl border border-white/10 p-3">Curated past interview questions</span>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Mobile controls (bottom) */}
      <div className="md:hidden fixed bottom-3 inset-x-3 z-30 flex gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subtopics…"
            className="w-full pl-9 pr-3 py-3 rounded-2xl bg-[#0b1220]/80 border border-white/10 outline-none focus:ring-2 ring-cyan-500/40 text-sm"
          />
        </div>
        <button onClick={exportJSON} className="rounded-2xl px-4 py-3 border border-white/10 bg-white/5 text-sm">Export</button>
      </div>
    </div>
  );
}
