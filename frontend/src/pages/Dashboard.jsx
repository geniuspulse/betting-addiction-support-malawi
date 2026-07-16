import React from 'react';

const Dashboard = () => (
  <div className="max-w-4xl mx-auto p-8">
    <h2 className="text-2xl font-bold mb-6">My Dashboard</h2>
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-blue-50 p-4 rounded-lg text-center">
        <p className="text-3xl font-bold text-blue-700">0</p>
        <p className="text-gray-600">Days Clean</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg text-center">
        <p className="text-3xl font-bold text-green-700">0</p>
        <p className="text-gray-600">Sessions Done</p>
      </div>
      <div className="bg-yellow-50 p-4 rounded-lg text-center">
        <p className="text-3xl font-bold text-yellow-700">0</p>
        <p className="text-gray-600">Badges Earned</p>
      </div>
    </div>
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
      <p className="text-red-700 font-semibold mb-2">Feeling the urge to bet?</p>
      <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold">SOS — Get Help Now</button>
    </div>
  </div>
);

export default Dashboard;
