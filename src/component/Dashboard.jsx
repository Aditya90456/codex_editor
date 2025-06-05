
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';

function Dashboard() {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {               
      try {
        const response = await axios.get('http://localhost:5000/user'); // Make sure this endpoint returns an array or object with 'username'
        setUsername(response.data[0]?.username || ''); // Use optional chaining to avoid undefined access
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-6xl bg-black bg-opacity-20 backdrop-blur-md rounded-lg p-8 shadow-2xl mt-10">
         

        <h2 className="text-4xl text-white font-bold text-center mb-6">
          {username ? `${username}'s Dashboard` : 'Dashboard'}
        </h2>
        <div className="flex justify-end mb-4">
          <Link to="/" className="text-white hover:text-gray-400 transition-colors">click here to go back to home</Link>
        </div>

        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : (
          <table className="min-w-full bg-gray-800 text-white">
            <thead className="bg-gray-600">
              <tr>
                <th className="py-3 px-6 text-left">Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-6 text-left">{username || 'No username found'}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
