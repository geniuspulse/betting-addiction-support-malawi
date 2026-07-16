import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import StreakBadge from '../components/StreakBadge';
import DailyMessage from '../components/DailyMessage';
import ProgressBar from '../components/ProgressBar';

export default function Dashboard() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Load dashboard mock values from localStorage or default
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('basm_streak') || 3));
  const [mwkSaved, setMwkSaved] = useState(() => Number(localStorage.getItem('basm_saved') || 15000));
  const [goalName, setGoalName] = useState(() => localStorage.getItem('basm_goal_name') || 'School Fees');
  const [goalAmount, setGoalAmount] = useState(() => Number(localStorage.getItem('basm_goal_amount') || 45000));
  const [hasCheckedInToday, setHasCheckedInToday] = useState(() => {
    return localStorage.getItem('basm_checked_in_today') === 'true';
  });

  const handleUrgentSOS = () => {
    navigate('/urgency-support');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950">
              {t('Welcome Back', 'Tikulandirani')}
            </h1>
            <p className="text-gray-500 text-sm">
              {t('Your personal recovery space. Stay strong today.', 'Malo anu odziunika ndi kudziteteza. Limbanani lero.')}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <StreakBadge streak={streak} />
          </div>
        </div>

        {/* SOS Alert Banner */}
        <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="text-3xl text-red-600 animate-bounce">🚨</div>
            <div>
              <h3 className="font-extrabold text-red-950 text-base md:text-lg">
                {t('Experiencing an intense urge to bet right now?', 'Kodi mukumva chikhumbo champhamvu chobetcha panopa?')}
              </h3>
              <p className="text-xs md:text-sm text-red-700 mt-1 max-w-xl">
                {t(
                  "Don't click that gaming app! Tap the button below to start our 15-minute delay challenge. We will help you through this urge step-by-step.",
                  "Musatsegule pulogalamu yanu yobetcha! Dinani batani ili kuti mudikire kwa mphindi 15. Tikuthandizani pang'onopang'ono."
                )}
              </p>
            </div>
          </div>
          <button
            onClick={handleUrgentSOS}
            className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-black text-xs md:text-sm px-6 py-3.5 rounded-2xl shadow-md border-b-4 border-red-800 transition active:scale-95 flex-shrink-0"
          >
            🛑 {t("I'M ABOUT TO BET", 'NDIKUFUNA KUBETCHA TSOPANO')}
          </button>
        </div>

        {/* Daily Motivation Message */}
        <DailyMessage />

        {/* Multi-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Recovery Wallet Widget */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-gray-900 text-base">{t('Recovery Wallet', 'Thumba Laposungira')}</h3>
                <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-100">
                  {t('Financial Freedom', 'Ufulu wa Zachuma')}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t('MWK Saved', 'Ndalama Zopulumutsidwa')}</div>
                  <div className="text-3xl font-black text-emerald-600 mt-1">MK {mwkSaved.toLocaleString()}</div>
                </div>

                <ProgressBar
                  value={mwkSaved}
                  max={goalAmount}
                  labelLeft={`${t('Progress to:', 'Kuyandikira ku:')} ${t(goalName, goalName)}`}
                  labelRight={`MK ${mwkSaved.toLocaleString()} / MK ${goalAmount.toLocaleString()}`}
                  color="bg-emerald-500"
                />
              </div>
            </div>

            <button
              onClick={() => navigate('/recovery-wallet')}
              className="w-full bg-slate-50 hover:bg-slate-100 text-blue-600 font-bold text-xs py-2.5 rounded-xl border border-blue-100 transition"
            >
              💼 {t('Manage Savings Setup', 'Konzani Thumba Lanu')}
            </button>
          </div>

          {/* Daily Check-in Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-gray-900 text-base">{t('Daily Check-in', 'Kudziunika kwa Tsiku')}</h3>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  hasCheckedInToday 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {hasCheckedInToday ? t('✓ Completed', '✓ Kwatha') : t('Pending', 'Kukusalira')}
                </span>
              </div>

              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                {t(
                  'Consistency is your shield. Keeping track of daily urges and moods guarantees a robust defense against relapse.',
                  'Dziunikeni tsiku lililonse. Kudziwa nkhawa ndi malingaliro anu kumakutetezani kuti musadzabwereze kubetcha.'
                )}
              </p>
            </div>

            <button
              onClick={() => navigate('/checkin')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl shadow transition"
            >
              📝 {hasCheckedInToday ? t('Review / Update Check-in', 'Onaninso Kudziunika Kwanu') : t('Check-in Now', 'Dziunikeni Tsopano')}
            </button>
          </div>

        </div>

        {/* Achievements Card (Summary) + Counselling Alert */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming counseling */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <h3 className="font-extrabold text-gray-900 text-base">{t('Counselling Support', 'Aupangiri ndi Thandizo')}</h3>
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
              <div className="font-bold text-xs text-blue-900">{t('No upcoming sessions', 'Palibe zokambirana zokonzedwa')}</div>
              <p className="text-[11px] text-blue-700 mt-1">
                {t('Need some guidance? Professional support is free and completely confidential.', 'Mukunyinyirika? Thandizo la alangizi ndi laulere komanso lachinsinsi.')}
              </p>
            </div>
            <button
              onClick={() => navigate('/counsellors')}
              className="w-full text-center text-xs font-semibold text-blue-600 hover:text-blue-700 pt-2 block"
            >
              📞 {t('Book a Free Session Now', 'Lembetsani Nthawi Yokambirana')}
            </button>
          </div>

          {/* Quick Links */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3">
            <h3 className="font-extrabold text-gray-900 text-base">{t('Quick Links', 'Maulalo Onse')}</h3>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => navigate('/community')} className="p-3 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-100 text-xs font-semibold text-gray-700 text-left transition">
                💬 {t('Community Feed', 'Gulu la Macheza')}
              </button>
              <button onClick={() => navigate('/library')} className="p-3 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-100 text-xs font-semibold text-gray-700 text-left transition">
                📚 {t('Education Library', 'Laibulale')}
              </button>
              <button onClick={() => navigate('/training')} className="p-3 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-100 text-xs font-semibold text-gray-700 text-left transition">
                🎓 {t('Skills Training', 'Maphunziro a Maluso')}
              </button>
              <button onClick={() => navigate('/achievements')} className="p-3 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-slate-100 text-xs font-semibold text-gray-700 text-left transition">
                🏆 {t('Achievements', 'Zokondweretsa')}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
