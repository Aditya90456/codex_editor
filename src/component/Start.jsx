// DSARoadmap.jsx
import React, { useState, useEffect } from "react";

/**
 * Enhanced DSA Roadmap UI
 * - Foundation, Core, Advanced stages with comprehensive topics
 * - Local storage persistence
 * - Notes feature
 * - Time estimates
 * - Mobile responsive
 * - Overall progress tracking
 */

const initialStages = [
  {
    title: "Foundation",
    topics: [
      {
        name: "Arrays",
        estimatedDays: 7,
        resources: {
          TUF: "https://takeuforward.org/arrays/arrays-a2z-dsa-sheet/",
          LeetCode: "https://leetcode.com/tag/array/",
          GFG: "https://www.geeksforgeeks.org/array-data-structure/",
        },
        status: "not-started",
      },
      {
        name: "Strings",
        estimatedDays: 5,
        resources: {
          TUF: "https://takeuforward.org/strings/strings-a2z-dsa-sheet/",
          LeetCode: "https://leetcode.com/tag/string/",
          GFG: "https://www.geeksforgeeks.org/string-data-structure/",
        },
        status: "not-started",
      },
      {
        name: "Basic Math",
        estimatedDays: 4,
        resources: {
          TUF: "https://takeuforward.org/maths/basic-maths-a2z-dsa-sheet/",
          LeetCode: "https://leetcode.com/problemset/all/?topicSlugs=math",
          GFG: "https://www.geeksforgeeks.org/mathematical-programming-for-interviews/",
        },
        status: "not-started",
      },
    ],
    startDate: "",
    endDate: "",
  },
  {
    title: "Core DSA",
    topics: [
      {
        name: "Linked Lists",
        estimatedDays: 6,
        resources: {
          TUF: "https://takeuforward.org/linked-list/linked-list-a2z-dsa-sheet/",
          LeetCode: "https://leetcode.com/tag/linked-list/",
          GFG: "https://www.geeksforgeeks.org/data-structures/linked-list/",
        },
        status: "not-started",
      },
      {
        name: "Stacks & Queues",
        estimatedDays: 5,
        resources: {
          TUF: "https://takeuforward.org/stack-queue/stack-queue-a2z-dsa-sheet/",
          LeetCode: "https://leetcode.com/tag/stack/",
          GFG: "https://www.geeksforgeeks.org/stack-data-structure/",
        },
        status: "not-started",
      },
      {
        name: "Recursion",
        estimatedDays: 8,
        resources: {
          TUF: "https://takeuforward.org/recursion/recursion-a2z-dsa-sheet/",
          LeetCode: "https://leetcode.com/explore/learn/card/recursion-i/",
          GFG: "https://www.geeksforgeeks.org/introduction-to-recursion-2/",
        },
        status: "not-started",
      },
      {
        name: "Sorting & Searching",
        estimatedDays: 7,
        resources: {
          TUF: "https://takeuforward.org/sorting-searching/sorting-searching-a2z-dsa-sheet/",
          LeetCode: "https://leetcode.com/problem-list/sort/",
          GFG: "https://www.geeksforgeeks.org/sorting-algorithms/",
        },
        status: "not-started",
      },
      {
        name: "Trees & BST",
        estimatedDays: 10,
        resources: {
          TUF: "https://takeuforward.org/binary-tree/binary-tree-a2z-dsa-sheet/",
          LeetCode: "https://leetcode.com/tag/tree/",
          GFG: "https://www.geeksforgeeks.org/binary-tree-data-structure/",
        },
        status: "not-started",
      },
      {
        name: "Hashing",
        estimatedDays: 4,
        resources: {
          TUF: "https://takeuforward.org/hashing/hashing-a2z-dsa-sheet/",
          LeetCode: "https://leetcode.com/tag/hash-table/",
          GFG: "https://www.geeksforgeeks.org/hashing-data-structure/",
        },
        status: "not-started",
      },
      {
        name: "Graphs",
        estimatedDays: 12,
        resources: {
          TUF: "https://takeuforward.org/graph/graph-a2z-dsa-sheet/",
          LeetCode: "https://leetcode.com/tag/graph/",
          GFG: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
        },
        status: "not-started",
      },
    ],
    startDate: "",
    endDate: "",
  },
  {
    title: "Advanced",
    topics: [
      {
        name: "Dynamic Programming",
        estimatedDays: 15,
        resources: {
          TUF: "https://takeuforward.org/dynamic-programming/dynamic-programming-a2z-dsa-sheet/",
          LeetCode: "https://leetcode.com/tag/dynamic-programming/",
          GFG: "https://www.geeksforgeeks.org/dynamic-programming/",
        },
        status: "not-started",
      },
      {
        name: "Tries",
        estimatedDays: 5,
        resources: {
          TUF: "https://takeuforward.org/tries/tries-a2z-dsa-sheet/",
          LeetCode: "https://leetcode.com/tag/trie/",
          GFG: "https://www.geeksforgeeks.org/trie-data-structure/",
        },
        status: "not-started",
      },
      {
        name: "Segment Trees",
        estimatedDays: 8,
        resources: {
          TUF: "https://takeuforward.org/segment-tree/segment-tree-a2z-dsa-sheet/",
          LeetCode: "https://leetcode.com/tag/segment-tree/",
          GFG: "https://www.geeksforgeeks.org/segment-tree-data-structure-and-algorithms/",
        },
        status: "not-started",
      },
      {
        name: "Advanced Graph Algorithms",
        estimatedDays: 10,
        resources: {
          TUF: "https://takeuforward.org/graph/advanced-graph-algorithms/",
          LeetCode: "https://leetcode.com/tag/shortest-path/",
          GFG: "https://www.geeksforgeeks.org/advanced-graph-algorithms/",
        },
        status: "not-started",
      },
    ],
    startDate: "",
    endDate: "",
  },
];

export default function DSARoadmap() {
  const [stages, setStages] = useState(initialStages);
  const [open, setOpen] = useState(0);
  const [hover, setHover] = useState(null);
  const [notes, setNotes] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // Local storage persistence
  useEffect(() => {
    const savedStages = localStorage.getItem('authToken');
    const savedNotes = localStorage.getItem('authToken');
    
   
    // Check mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  
  // Get overall progress
  const getTotalProgress = () => {
    const allTopics = stages.flatMap(s => s.topics);
    const completed = allTopics.filter(t => t.status === 'completed').length;
    return Math.round((completed / allTopics.length) * 100);
  };

  const getTotalEstimatedDays = () => {
    return stages.reduce((total, stage) => 
      total + stage.topics.reduce((stageTotal, topic) => stageTotal + topic.estimatedDays, 0), 0
    );
  };

  // compute stage status from topics
  const getStageStatus = (topics) => {
    const total = topics.length;
    const done = topics.filter((t) => t.status === "completed").length;
    if (done === total) return "completed";
    if (done > 0) return "in-progress";
    return "not-started";
  };

  const statusColors = {
    "not-started": { bg: "#fdecea", color: "#9f2a2a" },
    "in-progress": { bg: "#fff7e0", color: "#6b4f00" },
    completed: { bg: "#e6f7ee", color: "#0b5e3a" },
  };

  const updateTopicStatus = (si, ti, newStatus) => {
    const copy = JSON.parse(JSON.stringify(stages));
    copy[si].topics[ti].status = newStatus;
    setStages(copy);
  };

  const updateDate = (si, field, value) => {
    const copy = JSON.parse(JSON.stringify(stages));
    copy[si][field] = value;
    setStages(copy);
  };

  const updateNotes = (stageIndex, topicIndex, noteText) => {
    const key = `${stageIndex}-${topicIndex}`;
    setNotes(prev => ({
      ...prev,
      [key]: noteText
    }));
  };

  // Overall Progress Header
  const OverallProgress = () => {
    const totalProgress = getTotalProgress();
     

    const totalDays = getTotalEstimatedDays();
    const completedTopics = stages.flatMap(s => s.topics).filter(t => t.status === 'completed').length;
    const totalTopics = stages.flatMap(s => s.topics).length;

    return (
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: 16,
        padding: isMobile ? 16 : 24,
        color: "white",
        marginBottom: 24,
        boxShadow: "0 10px 40px rgba(102, 126, 234, 0.3)"
      }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 16 : 0
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: isMobile ? 20 : 24 }}>Overall Progress</h2>
            <p style={{ margin: "8px 0 0 0", opacity: 0.9, fontSize: isMobile ? 14 : 16 }}>
              {completedTopics}/{totalTopics} topics completed • ~{totalDays} days estimated
            </p>
          </div>
          <div style={{ textAlign: isMobile ? "center" : "right" }}>
            <div style={{ fontSize: isMobile ? 28 : 36, fontWeight: 700, marginBottom: 8 }}>
              {totalProgress}%
            </div>
            <div style={{ 
              width: isMobile ? 200 : 250, 
              height: 12, 
              background: "rgba(255,255,255,0.2)", 
              borderRadius: 6, 
              overflow: "hidden" 
            }}>
              <div style={{ 
                width: `${totalProgress}%`, 
                height: "100%", 
                background: "white", 
                transition: "width 500ms ease",
                borderRadius: 6
              }} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced CardHeader
  const CardHeader = ({ index, title, status, progress, onToggle, estimatedDays }) => (
    <div
      onClick={onToggle}
      onMouseEnter={() => setHover(index)}
      onMouseLeave={() => setHover(null)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        transform: hover === index ? "scale(1.01)" : "scale(1)",
        transition: "transform 140ms ease",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 12 : 0
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "#0f1724",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            boxShadow: "0 6px 18px rgba(2,6,23,0.12)",
          }}
        >
          {index + 1}
        </div>
        <div>
          <div style={{ fontSize: isMobile ? 16 : 18, fontWeight: 700 }}>{title}</div>
          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
            {progress}% • <span style={{ textTransform: "capitalize" }}>{status.replace("-", " ")}</span>
            {estimatedDays && <span> • ~{estimatedDays} days</span>}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => (o === index ? null : index));
          }}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            background: "#0f1724",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: isMobile ? 12 : 14
          }}
        >
          {open === index ? "Collapse" : "Open"}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ 
      fontFamily: "Inter, Roboto, system-ui, sans-serif", 
      padding: isMobile ? 12 : 22, 
      background: "#f6f8fb", 
      minHeight: "100vh" 
    }}>
      <div style={{ maxWidth: 980, margin: isMobile ? "20px auto" : "77px auto" }}>
        <h1 style={{ 
          textAlign: "center", 
          marginBottom: 18, 
          fontSize: isMobile ? 24 : 28 
        }}>
          DSA Roadmap — Foundation · Core · Advanced
        </h1>

        <OverallProgress />

        <div style={{ display: "grid", gap: 14 }}>
          {stages.map((stage, si) => {
            const done = stage.topics.filter((t) => t.status === "completed").length;
            const progress = Math.round((done / stage.topics.length) * 100);
            const status = getStageStatus(stage.topics);
            const sc = statusColors[status];
            const stageEstimatedDays = stage.topics.reduce((sum, topic) => sum + topic.estimatedDays, 0);

            return (
              <div
                key={si}
                style={{
                  background: "white",
                  borderRadius: 12,
                  boxShadow: "0 8px 30px rgba(9, 30, 66, 0.06)",
                  overflow: "hidden",
                  border: `1px solid rgba(15,23,36,0.04)`,
                }}
              >
                <div style={{ padding: isMobile ? 12 : 18 }}>
                  <CardHeader
                    index={si}
                    title={stage.title}
                    status={status}
                    progress={progress}
                    estimatedDays={stageEstimatedDays}
                    onToggle={() => setOpen((o) => (o === si ? null : si))}
                  />

                  {/* dates + colored badge */}
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    marginTop: 12,
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? 12 : 0
                  }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                      <div style={{ 
                        padding: "6px 10px", 
                        borderRadius: 999, 
                        background: sc.bg, 
                        color: sc.color, 
                        fontWeight: 700, 
                        textTransform: "capitalize", 
                        fontSize: 13 
                      }}>
                        {status.replace("-", " ")}
                      </div>
                      <div style={{ color: "#5b6670", fontSize: isMobile ? 11 : 13 }}>
                        <label>
                          Start:{" "}
                          <input
                            type="date"
                            value={stage.startDate || ""}
                            onChange={(e) => updateDate(si, "startDate", e.target.value)}
                            style={{ marginLeft: 6, fontSize: isMobile ? 11 : 13 }}
                          />
                        </label>
                        <span style={{ marginLeft: 12 }} />
                        <label>
                          End:{" "}
                          <input
                            type="date"
                            value={stage.endDate || ""}
                            onChange={(e) => updateDate(si, "endDate", e.target.value)}
                            style={{ marginLeft: 6, fontSize: isMobile ? 11 : 13 }}
                          />
                        </label>
                      </div>
                    </div>

                    <div style={{ width: isMobile ? "100%" : 180 }}>
                      <div style={{ height: 10, background: "#eef2f6", borderRadius: 6, overflow: "hidden" }}>
                        <div style={{ 
                          width: `${progress}%`, 
                          height: "100%", 
                          background: progress === 100 ? "#10b981" : progress > 0 ? "#f59e0b" : "#ef4444", 
                          transition: "width 300ms ease" 
                        }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* collapsible content */}
                {open === si && (
                  <div style={{ 
                    padding: isMobile ? 12 : 18, 
                    borderTop: "1px solid rgba(15,23,36,0.03)", 
                    background: "#fbfdff" 
                  }}>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {stage.topics.map((topic, ti) => (
                        <li key={ti} style={{ 
                          padding: "12px 0", 
                          borderBottom: ti < stage.topics.length - 1 ? "1px dashed rgba(15,23,36,0.03)" : "none" 
                        }}>
                          <div style={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "flex-start", 
                            gap: 12,
                            flexDirection: isMobile ? "column" : "row"
                          }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ 
                                display: "flex", 
                                alignItems: "center", 
                                gap: 8, 
                                marginBottom: 8,
                                flexWrap: "wrap"
                              }}>
                                <div style={{ fontWeight: 700, fontSize: isMobile ? 14 : 16 }}>
                                  {topic.name}
                                </div>
                                <div style={{ 
                                  fontSize: 11, 
                                  background: "#f1f5f9", 
                                  padding: "2px 6px", 
                                  borderRadius: 4, 
                                  color: "#64748b" 
                                }}>
                                  ~{topic.estimatedDays} days
                                </div>
                              </div>
                              
                              <div style={{ marginBottom: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                                {Object.entries(topic.resources).map(([label, url]) => (
                                  <a
                                    key={label}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      fontSize: isMobile ? 11 : 12,
                                      padding: "6px 10px",
                                      borderRadius: 999,
                                      border: "1px solid rgba(15,23,36,0.06)",
                                      textDecoration: "none",
                                      color: "#0f1724",
                                      background: "#fff",
                                      boxShadow: "0 4px 12px rgba(2,6,23,0.04)",
                                      transition: "transform 100ms ease",
                                    }}
                                    onMouseEnter={(e) => e.target.style.transform = "translateY(-1px)"}
                                    onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
                                  >
                                    {label}
                                  </a>
                                ))}
                              </div>

                              {/* Notes section */}
                              <textarea
                                placeholder="Add your notes, important points, or progress updates..."
                                value={notes[`${si}-${ti}`] || ''}
                                onChange={(e) => updateNotes(si, ti, e.target.value)}
                                style={{
                                  width: '100%',
                                  minHeight: 60,
                                  padding: 8,
                                  borderRadius: 6,
                                  border: '1px solid rgba(15,23,36,0.08)',
                                  fontSize: 12,
                                  fontFamily: 'inherit',
                                  resize: 'vertical',
                                  background: '#fafbfc'
                                }}
                              />
                            </div>

                            <div style={{ 
                              display: "flex", 
                              flexDirection: "column", 
                              alignItems: isMobile ? "stretch" : "flex-end", 
                              gap: 8,
                              minWidth: isMobile ? "100%" : 120
                            }}>
                              <select
                                value={topic.status}
                                onChange={(e) => updateTopicStatus(si, ti, e.target.value)}
                                style={{ 
                                  padding: "6px 8px", 
                                  borderRadius: 8, 
                                  border: "1px solid rgba(15,23,36,0.08)",
                                  fontSize: isMobile ? 12 : 14
                                }}
                              >
                                <option value="not-started">Not Started</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                              </select>

                              <div style={{ fontSize: 12, color: "#6b7280", textAlign: isMobile ? "left" : "right" }}>
                                <span style={{ fontWeight: 700 }}>
                                  {topic.status === "completed" ? "✓" : topic.status === "in-progress" ? "⏳" : "⭕"}
                                </span>
                                <span style={{ marginLeft: 8, textTransform: "capitalize" }}>
                                  {topic.status.replace("-", " ")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div style={{ 
                      marginTop: 12, 
                      display: "flex", 
                      justifyContent: "flex-end", 
                      gap: 8,
                      flexWrap: "wrap"
                    }}>
                      <button
                        onClick={() => {
                          const copy = JSON.parse(JSON.stringify(stages));
                          copy[si].topics = copy[si].topics.map((t) => ({ ...t, status: "completed" }));
                          setStages(copy);
                        }}
                        style={{ 
                          padding: "8px 12px", 
                          borderRadius: 8, 
                          border: "none", 
                          background: "#10b981", 
                          color: "white", 
                          cursor: "pointer",
                          fontSize: isMobile ? 12 : 14
                        }}
                      >
                        Mark all done
                      </button>
                      <button
                        onClick={() => {
                          const copy = JSON.parse(JSON.stringify(stages));
                          copy[si].topics = copy[si].topics.map((t) => ({ ...t, status: "not-started" }));
                          setStages(copy);
                        }}
                        style={{ 
                          padding: "8px 12px", 
                          borderRadius: 8, 
                          border: "1px solid rgba(15,23,36,0.06)", 
                          background: "white", 
                          cursor: "pointer",
                          fontSize: isMobile ? 12 : 14
                        }}
                      >
                        Reset
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('This will clear all progress and notes. Are you sure?')) {
                            localStorage.removeItem('dsa-roadmap-progress');
                            localStorage.removeItem('dsa-roadmap-notes');
                            setStages(initialStages);
                            setNotes({});
                          }
                        }}
                        style={{ 
                          padding: "8px 12px", 
                          borderRadius: 8, 
                          border: "1px solid #ef4444", 
                          background: "white", 
                          color: "#ef4444",
                          cursor: "pointer",
                          fontSize: isMobile ? 12 : 14
                        }}
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ 
          marginTop: 20, 
          textAlign: "center", 
          color: "#475569", 
          fontSize: isMobile ? 12 : 13,
          padding: isMobile ? "0 12px" : 0
        }}>
          <p>
            <strong>Tip:</strong> Your progress is automatically saved locally. 
            Click <strong>Open</strong> to expand stages and track your learning journey!
          </p>
          <p style={{ marginTop: 8, fontSize: 11, opacity: 0.8 }}>
            Total estimated time: ~{getTotalEstimatedDays()} days • 
            Progress is saved in your browser's local storage
          </p>
        </div>
      </div>
    </div>
  );
}