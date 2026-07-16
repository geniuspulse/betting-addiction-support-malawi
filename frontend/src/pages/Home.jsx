import React from 'react';

const Home = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-8">
    <h1 className="text-4xl font-bold text-blue-700 mb-4">Betting Addiction Support Malawi</h1>
    <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
      You are not alone. We provide confidential, stigma-free support to help you break free from betting addiction.
    </p>
    <div className="flex gap-4">
      <a href="/assessment" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">Take Assessment</a>
      <a href="/programs" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">View Programs</a>
    </div>
  </div>
);

export default Home;
