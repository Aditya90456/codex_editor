import React from 'react';
import axios from 'axios'; 

function Logout() {

    const onLogout = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                console.error('No token found');
                return;
            }

            await axios.post('http://localhost:5000/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            localStorage.removeItem('authToken');
            window.location.href = '/'; // Redirect to home page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-black bg-opacity-30 backdrop-blur-md rounded-lg p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Are you sure you want to log out?</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Logout;