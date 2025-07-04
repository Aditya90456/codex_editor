import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import fallbackProblems from './problems (1).js'; // Local 300 problems

function Prob() {
  const [problem, setProblem] = useState(fallbackProblems);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const solved = useMemo(() => problem.filter((p) => p.solved).length, [problem]);
  const total = problem.length;
  const progress = useMemo(() => Math.round((solved / total) * 100), [solved, total]);

  const filteredProblems = useMemo(() => {
    return problem.filter((p) =>
      p.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, problem]);

  useEffect(() => {
    const fetchUserProblems = async () => {
      const auth = localStorage.getItem('authToken');
      if (!auth) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/prob', {
          headers: { Authorization: `Bearer ${auth}` },
        });

        const userProblems = res.data.problems || [];
        const updatedProblems = fallbackProblems.map((p) => {
          const saved = userProblems.find(
            (u) => u.title?.toLowerCase() === p.title?.toLowerCase()
          );
          return saved
            ? { ...p, solved: saved.solved, attempted: saved.attempted }
            : p;
        });

        setProblem(updatedProblems);
        console.log('✅ User progress loaded');
      } catch (err) {
        console.error('❌ Fetch error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProblems();
  }, []);

  const handleCheckboxChange = async (index, field) => {
    const updatedProblems = [...problem];
    updatedProblems[index][field] = !updatedProblems[index][field];
    setProblem(updatedProblems); // Optimistic UI

    const auth = localStorage.getItem('authToken');
    try {
      await axios.post(
        'http://localhost:5000/prob',
        {
          title: updatedProblems[index].title,
          solved: updatedProblems[index].solved,
          attempted: updatedProblems[index].attempted,
          tags: updatedProblems[index].tags,
          link: updatedProblems[index].link,
        },
        { headers: { Authorization: `Bearer ${auth}` } }
      );
      console.log('✅ Progress saved');
    } catch (err) {
      console.error('❌ Save failed:', err.response?.data || err.message);
      // Rollback if error
      updatedProblems[index][field] = !updatedProblems[index][field];
      setProblem(updatedProblems);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <h1 className="text-2xl font-bold">Loading your problems...</h1>
      </div>
    );
  }

  return (
    <div className="p-6 text-white bg-gray-900  py-17 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">Codex DSA Problem Set</h1>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search problems..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span>Solved: {solved}/{total}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded h-3">
          <div
            className="h-full bg-green-500 rounded transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Problems */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProblems.map((p, index) => (
          <div
            key={p.title}
            className={`p-4 rounded shadow-lg transition-transform duration-200 hover:scale-105
            ${p.solved ? 'bg-green-800' : p.attempted ? 'bg-yellow-700' : 'bg-gray-800'}`}
          >
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              View on GFG
            </a>
            <div className="mt-3 flex gap-4">
              <label>
                <input
                  type="checkbox"
                  checked={p.solved}
                  onChange={() => handleCheckboxChange(index, 'solved')}
                  className="mr-1"
                />
                Solved
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={p.attempted}
                  onChange={() => handleCheckboxChange(index, 'attempted')}
                  className="mr-1"
                />
                Attempted
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Prob;
