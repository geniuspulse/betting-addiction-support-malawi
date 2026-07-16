import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import MoodSelector from '../components/MoodSelector';

export default function Checkin() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [didBet, setDidBet] = useState(false);
  const [urge, setUrge] = useState(5);
  const [mood, setMood] = useState('okay');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to localStorage so dashboard/wallet can update
    localStorage.setItem('basm_checked_in_today', 'true');
    if (!didBet) {
      const currentStreak = Number(localStorage.getItem('basm_streak') || 3);
      const dayBetFreeSaved = Number(localStorage.getItem('basm_bet_per_day') || 3000);
      const totalSaved = Number(localStorage.getItem('basm_saved') || 15000);

      localStorage.setItem('basm_streak', String(currentStreak + 1));
      localStorage.setItem('basm_saved', String(totalSaved + dayBetFreeSaved));
    } else {
      localStorage.setItem('basm_streak', '0');
    }

    setSubmitted(true);
  };

  // Mock data for line graph SVG
  const sampleUrges = [7, 6, 8, 4, 5, 6, 3, 4, 6, 5, 4, 3, 5, urge];
  const maxUrge = 10;
  
  // Simple 30 days grid calendar representation (unlocked vs relapse)
  // Day status: 1 = bet-free (green), 2 = relapse (red), 0 = future/untracked (gray)
  const mockCalendar = [
    1, 1, 1, 1, 1, 2, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 2, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, didBet ? 2 : 1
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 pb-24">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Title */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950">
            {t('Daily Check-in', 'Kudziunika kwa Tsiku')}
          </h1>
          <p className="text-gray-500 text-sm">
            {t('Tracking your daily status guarantees a strong recovery.', 'Kulemba momwe mukumvera tsiku lililonse kukutetezani kuti musabwelele kubetcha.')}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
            
            {/* Did you bet today */}
            <div>
              <label className="block text-sm font-bold text-gray-950 mb-3">
                {t('Did you place any bets today?', 'Kodi mwasewerako kubetcha lero?')}
              </label>
              <div className="grid grid-cols-2 gap-3 max-w-sm">
                <button
                  type="button"
                  onClick={() => setDidBet(true)}
                  className={`py-3 px-4 rounded-xl text-xs md:text-sm font-bold border transition-all ${
                    didBet
                      ? 'bg-red-600 text-white border-red-600 shadow'
                      : 'bg-white hover:bg-slate-50 text-gray-700 border-gray-200'
                  }`}
                >
                  ⚠️ {t('Yes, I did', 'Eya, ndabetcha')}
                </button>
                <button
                  type="button"
                  onClick={() => setDidBet(false)}
                  className={`py-3 px-4 rounded-xl text-xs md:text-sm font-bold border transition-all ${
                    !didBet
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                      : 'bg-white hover:bg-slate-50 text-gray-700 border-gray-200'
                  }`}
                >
                  ✓ {t('No, I did not', 'Ayi, sindabetche')}
                </button>
              </div>
            </div>

            {/* Urge strength slider */}
            <div>
              <div className="flex justify-between text-sm font-bold text-gray-950 mb-2">
                <label>{t('Urge Strength (1 to 10):', 'Mphamvu ya Chikhumbo (1 mpaka 10):')}</label>
                <span className="text-blue-600">{urge} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={urge}
                onChange={(e) => setUrge(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-medium">
                <span>{t('Very Weak / No Urge', 'Chofooka / Palibe chikhumbo')}</span>
                <span>{t('Extremely Strong', 'Chankhaza / Champhamvu kwambiri')}</span>
              </div>
            </div>

            {/* Mood selector */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-950">
                {t('How are you feeling overall?', 'Kodi mukumva bwanji mwachidule lero?')}
              </label>
              <MoodSelector selectedMood={mood} onSelect={setMood} />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-950">
                {t('Personal Notes & Lessons (Optional):', 'Zolemba zanu & Zomwe mwaphunzira (Mwasankha):')}
              </label>
              <textarea
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t('Write down any triggers or victories today...', 'Lembani zosokoneza kapena kupambana komwe mwakumana nako lero...')}
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm md:text-base py-3.5 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {t('Save Check-in', 'Sungani Kudziunika Kwanu')}
            </button>

          </form>
        ) : (
          <div className="space-y-6">
            
            {/* Success message */}
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 text-center shadow-sm">
              <span className="text-3xl">🎉</span>
              <h2 className="text-xl font-bold text-emerald-900 mt-2">
                {t('Daily Check-in Saved Successfully!', 'Kudziunika Kwanu Kwasungidwa!')}
              </h2>
              <p className="text-xs md:text-sm text-emerald-700 mt-1 max-w-md mx-auto">
                {!didBet 
                  ? t('Excellent! You protected your wallet and streak today. Keep taking it one step at a time.', 'Zabwino kwambiri! Mwateteza ndalama zanu ndi masiku anu opanda kubetcha lero. Pitilizani m\'njira yomweyi.')
                  : t('Thank you for your honesty. Relapses are part of the process. Stay close to the group and counselling.', 'Zikomo kwambiri chifukwa chonena zoona. Kuterereka ndi gawo lachire. Khalani pafupi ndi gulu kapena alangizi.')}
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-2 rounded-xl transition"
              >
                {t('Return to Dashboard', 'Bwererani ku Dashboard')}
              </button>
            </div>

            {/* Progress Chart SVG (Last 14 days urge strength) */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-extrabold text-gray-900 text-base">{t('Urge Strength - Last 14 Days', 'Mphamvu ya Chikhumbo - Masiku 14 Zapitazi')}</h3>
              
              <div className="w-full h-48 bg-slate-50 rounded-xl p-2 flex items-end justify-between border border-gray-100">
                {sampleUrges.map((u, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1 space-y-1">
                    <span className="text-[10px] text-gray-500 font-bold">{u}</span>
                    <div 
                      className={`w-3 rounded-t-md transition-all duration-500 ${
                        u > 7 ? 'bg-red-500' : u > 4 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ height: `${(u / maxUrge) * 110}px` }}
                    />
                    <span className="text-[8px] text-gray-400 font-semibold uppercase">D{idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Streak Calendar (last 30 days) */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-extrabold text-gray-900 text-base">{t('30-Day Recovery Calendar', 'Kalendala ya Masiku 30')}</h3>
              <p className="text-xs text-gray-500">
                🟢 {t('Bet-free Days', 'Masiku Opanda Kubetcha')} | 🔴 {t('Relapsed Days', 'Masiku Omwe Mudabetcha')}
              </p>

              <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
                {mockCalendar.map((status, idx) => (
                  <div
                    key={idx}
                    className={`h-10 rounded-lg flex items-center justify-center font-bold text-xs shadow-inner ${
                      status === 1 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
