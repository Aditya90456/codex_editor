import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5173/prob'); // ✅ Use backend port
        setData(res.data[0].problems || []); // Assuming the response contains a `problems` array
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-6xl bg-black bg-opacity-30 backdrop-blur-md rounded-lg p-8 shadow-2xl mt-10">
        <h1 className="text-4xl font-bold text-white text-center mb-8">📊 DSA Progress Dashboard</h1>
        {loading ? (
          <p className="text-gray-300 text-center text-lg">Loading...</p>
        ) : data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
              >
                <h2 className="text-xl font-bold text-white mb-2">{item.title}</h2>
                <p className="text-sm text-gray-300 mb-4">Solved: {item.count}</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(item.count / 10, 1) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Progress: {Math.min(item.count / 10, 1) * 100}%
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300 text-center">No data available</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
