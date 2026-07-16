import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Programs = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    axios.get('/api/programs').then(r => setPrograms(r.data));
  }, []);

  const colors = ['yellow', 'orange', 'red'];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Recovery Programs</h2>
      <div className="grid gap-6">
        {programs.map((p, i) => (
          <div key={p.id} className={`border-l-4 border-${colors[i]}-500 p-6 rounded-lg shadow`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="text-gray-500">{p.duration} days · {p.level} Addiction</p>
              </div>
              <span className={`bg-${colors[i]}-100 text-${colors[i]}-800 px-3 py-1 rounded-full text-sm`}>{p.level}</span>
            </div>
            <p className="mt-3 text-gray-600">{p.description}</p>
            <ul className="mt-3 space-y-1">
              {p.features.map((f, j) => <li key={j} className="text-sm text-gray-600">✓ {f}</li>)}
            </ul>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Enroll Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
