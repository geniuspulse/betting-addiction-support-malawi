import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pricing = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios.get('/api/monetization/subscriptions/plans')
      .then(r => setPlans(r.data.plans))
      .catch(() => setPlans([
        {
          id: 'free', name: 'Free', priceMWK: 0,
          features: ['Self-assessment', 'Daily check-ins', 'Recovery Wallet', 'Basic library', 'Emergency SOS', '1 group session/month'],
          cta: 'Get Started Free',
        },
        {
          id: 'premium', name: 'Premium Recovery', priceMWK: 7500,
          features: ['Everything in Free', '2 free counsellor sessions/month', 'AI companion with memory', 'All training programs + certificates', 'Advanced analytics', 'Family portal', 'Offline access', 'Priority matching'],
          cta: 'Upgrade — MK7,500/month', highlight: true,
        }
      ]));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Simple, Honest Pricing</h2>
        <p className="text-gray-500">Core support is always free. Premium gives you the full recovery toolkit.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {plans.map(plan => (
          <div key={plan.id} className={`rounded-xl p-6 border-2 ${plan.highlight ? 'border-blue-600 shadow-lg' : 'border-gray-200'}`}>
            {plan.highlight && <div className="text-xs font-bold text-blue-600 uppercase mb-2 tracking-wide">Most Popular</div>}
            <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
            <div className="mb-4">
              {plan.priceMWK === 0
                ? <span className="text-3xl font-bold">Free</span>
                : <><span className="text-3xl font-bold">MK{plan.priceMWK.toLocaleString()}</span><span className="text-gray-400">/month</span></>
              }
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button className={`w-full py-3 rounded-lg font-semibold ${plan.highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-gray-300 hover:bg-gray-50'}`}>
              {plan.cta}
            </button>
            {plan.highlight && (
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500">Pay via Airtel Money, TNM Mpamba, or Bank Transfer</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Counsellor CTA */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-lg">Are you a therapist or counsellor?</h4>
          <p className="text-gray-500 text-sm">Join our platform, set your own rates, and keep 80% of every session.</p>
        </div>
        <a href="/counsellor/apply" className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold whitespace-nowrap hover:bg-green-700">
          Apply as Counsellor
        </a>
      </div>

      {/* Institutional */}
      <div className="mt-6 text-center text-sm text-gray-400">
        NGO, employer, or government partnership? <a href="mailto:partnerships@basm.mw" className="text-blue-500 underline">Contact us for bulk pricing</a>
      </div>
    </div>
  );
};

export default Pricing;
