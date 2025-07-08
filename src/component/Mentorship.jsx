import React from 'react';

function Mentorship() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="mentorship-header w-full flex flex-col items-center text-center space-y-4">
        <h1 className="text-4xl font-bold">Mentorship AI</h1>
        <p className="text-lg max-w-2xl">
            Welcome to our AI-powered mentorship program! Here, you can connect with experienced mentors who will guide you through your coding journey. Whether you're a beginner or looking to enhance your skills, our mentors are here to help you succeed.
        </p>
        <button onClick={() => window.location.href = '/ai'} className='text-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Start AI Mentorship   </button>
      </div>
    </div>
  );
}

export default Mentorship;
