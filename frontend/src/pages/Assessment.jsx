import React, { useState } from 'react';
import axios from 'axios';

const questions = [
  "How often do you bet per week? (0=Never, 5=Daily)",
  "Have you tried to stop betting but failed? (0=No, 5=Many times)",
  "Does betting affect your finances? (0=Not at all, 5=Severely)",
  "Do you feel restless when not betting? (0=No, 5=Always)",
  "Has betting caused problems in relationships? (0=No, 5=Serious problems)",
];

const Assessment = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(0));
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const res = await axios.post('/api/assessments/submit', { answers }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setResult(res.data);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Self-Assessment</h2>
      {questions.map((q, i) => (
        <div key={i} className="mb-6">
          <p className="mb-2 font-medium">{i + 1}. {q}</p>
          <input type="range" min="0" max="5" value={answers[i]}
            onChange={e => { const a = [...answers]; a[i] = +e.target.value; setAnswers(a); }}
            className="w-full" />
          <span className="text-sm text-gray-500">Score: {answers[i]}</span>
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full font-semibold">
        Get My Recommendation
      </button>
      {result && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="font-bold text-green-800">Your Level: {result.recommendation.level}</p>
          <p className="text-green-700">Recommended: {result.recommendation.programName}</p>
        </div>
      )}
    </div>
  );
};

export default Assessment;
