import React, { useState } from 'react';
import axios from 'axios';

const CounsellorOnboarding = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', specialization: '',
    qualifications: '', licenseNumber: '', bio: '',
    sessionRate: 15000, languages: ['English', 'Chichewa'],
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = async () => {
    await axios.post('/api/monetization/counsellors/apply', form);
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="max-w-xl mx-auto p-8 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h2 className="text-2xl font-bold text-green-700 mb-2">Application Submitted!</h2>
      <p className="text-gray-600 mb-4">We'll verify your credentials within 2–3 business days and contact you via email.</p>
      <div className="bg-blue-50 rounded-lg p-4 text-left space-y-2 text-sm text-blue-800">
        <p>✓ License will be verified with Malawi health authorities</p>
        <p>✓ You'll receive an email once approved</p>
        <p>✓ Set your availability and start earning</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-2">Join as a Counsellor</h2>
      <p className="text-gray-500 mb-6">Help people recover from betting addiction — and earn a living doing it.</p>

      {/* Earnings preview */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="font-semibold text-green-800 mb-2">💰 Earnings Potential</p>
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <div className="bg-white rounded p-2"><p className="font-bold text-green-700">MK12,000</p><p className="text-gray-500">per video session</p></div>
          <div className="bg-white rounded p-2"><p className="font-bold text-green-700">MK6,400</p><p className="text-gray-500">per chat session</p></div>
          <div className="bg-white rounded p-2"><p className="font-bold text-green-700">80%</p><p className="text-gray-500">you keep</p></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Platform fee: 20%. Payouts via Airtel Money or TNM Mpamba every Friday.</p>
      </div>

      {/* Step indicator */}
      <div className="flex gap-2 mb-6">
        {[1,2,3].map(s => (
          <div key={s} className={`flex-1 h-2 rounded-full ${step >= s ? 'bg-blue-600' : 'bg-gray-200'}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Step 1: Personal Details</h3>
          <input className="w-full border rounded-lg p-3" placeholder="Full Name" value={form.fullName} onChange={e => update('fullName', e.target.value)} />
          <input className="w-full border rounded-lg p-3" placeholder="Email Address" type="email" value={form.email} onChange={e => update('email', e.target.value)} />
          <input className="w-full border rounded-lg p-3" placeholder="Phone (Airtel/TNM)" value={form.phone} onChange={e => update('phone', e.target.value)} />
          <button onClick={() => setStep(2)} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">Next →</button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Step 2: Professional Credentials</h3>
          <input className="w-full border rounded-lg p-3" placeholder="Specialization (e.g. CBT, Addiction Therapy)" value={form.specialization} onChange={e => update('specialization', e.target.value)} />
          <textarea className="w-full border rounded-lg p-3" rows={3} placeholder="Qualifications (e.g. MSc Clinical Psychology, Univ. of Malawi)" value={form.qualifications} onChange={e => update('qualifications', e.target.value)} />
          <input className="w-full border rounded-lg p-3" placeholder="Professional License Number" value={form.licenseNumber} onChange={e => update('licenseNumber', e.target.value)} />
          <div>
            <label className="block text-sm text-gray-600 mb-1">Session Rate (MWK)</label>
            <input className="w-full border rounded-lg p-3" type="number" value={form.sessionRate} onChange={e => update('sessionRate', +e.target.value)} />
            <p className="text-xs text-gray-400 mt-1">You keep 80% = MK{Math.round(form.sessionRate * 0.8).toLocaleString()} per session</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 border border-gray-300 py-3 rounded-lg">← Back</button>
            <button onClick={() => setStep(3)} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold">Next →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Step 3: Your Profile</h3>
          <textarea className="w-full border rounded-lg p-3" rows={4} placeholder="Short bio — tell clients about your approach and experience" value={form.bio} onChange={e => update('bio', e.target.value)} />
          <div>
            <p className="text-sm text-gray-600 mb-2">Languages you can counsel in:</p>
            <div className="flex gap-2 flex-wrap">
              {['English', 'Chichewa', 'Tumbuka', 'Yao', 'Sena'].map(lang => (
                <button key={lang} onClick={() => {
                  const langs = form.languages.includes(lang)
                    ? form.languages.filter(l => l !== lang)
                    : [...form.languages, lang];
                  update('languages', langs);
                }} className={`px-3 py-1 rounded-full text-sm border ${form.languages.includes(lang) ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-600'}`}>
                  {lang}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
            ⚠️ By applying, you agree that your license will be verified. Providing false credentials will result in permanent removal from the platform.
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 border border-gray-300 py-3 rounded-lg">← Back</button>
            <button onClick={handleSubmit} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold">Submit Application ✓</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CounsellorOnboarding;
