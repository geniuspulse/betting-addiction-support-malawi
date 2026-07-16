import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Counsellors = () => {
  const [counsellors, setCounsellors] = useState([]);

  useEffect(() => {
    axios.get('/api/counsellors').then(r => setCounsellors(r.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Our Counsellors</h2>
      <div className="grid gap-6">
        {counsellors.map(c => (
          <div key={c.id} className="p-6 rounded-lg shadow border">
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-bold">{c.name}</h3>
                <p className="text-blue-600">{c.specialization}</p>
                <p className="text-gray-500 text-sm">{c.experience} experience · {c.languages.join(', ')}</p>
              </div>
              <span className={`h-fit px-3 py-1 rounded-full text-sm ${c.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {c.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
            <p className="mt-3 text-gray-600">{c.bio}</p>
            {c.available && (
              <div className="mt-4 flex gap-3">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Book Video Session</button>
                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">Chat Session</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Counsellors;
