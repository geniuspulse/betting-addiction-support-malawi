import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import BreathingExercise from '../components/BreathingExercise';

const QUOTES = [
  {
    en: "The secret of getting ahead is getting started. Do not sacrifice your tomorrow for a temporary Aviator rush.",
    ny: "Chinsinsi choyendera mbiri ndikuyamba. Musataye tsogolo lanu chifukwa chakusangalala kwakanthawi ka Aviator."
  },
  {
    en: "You don't have to control your thoughts; you just have to stop letting them control you.",
    ny: "Simukuyenera kulamulira maganizo anu; mungofunika kusiya kuwalola kuti azikulamulirani."
  },
  {
    en: "Your wealth is built through patience and labor, not betting tickets. Hold on, the urge will pass.",
    ny: "Chuma chanu chimamangidwa kudzera mukulimbika, osati kudzera pamatikiti obetcha. Gwiritsitsani, chikhumbo chobetchachi chidutsa."
  }
];

export default function UrgeSupportPage() {
  const { t } = useLanguage();

  // Timer Challenge State
  const [timer, setTimer] = useState(0); // in seconds (15 mins = 900)
  const [isActive, setIsActive] = useState(false);
  const [loggedOutcome, setLoggedOutcome] = useState(''); // 'resisted' or 'placed'

  // Quotes Carousel Index
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isActive) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const startTimerChallenge = () => {
    setTimer(900); // 15 minutes
    setIsActive(true);
    setLoggedOutcome('');
  };

  const nextQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % QUOTES.length);
  };

  const handleOutcome = (outcome) => {
    setLoggedOutcome(outcome);
    setIsActive(false);
    setTimer(0);
    if (outcome === 'resisted') {
      const currentStreak = Number(localStorage.getItem('basm_streak') || 3);
      localStorage.setItem('basm_streak', String(currentStreak + 1));
    } else {
      localStorage.setItem('basm_streak', '0');
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 pb-24 text-gray-800">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Hero Section */}
        <div className="text-center bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full uppercase tracking-wider">
            🚨 {t('Urgent Prevention Plan', 'Chitetezo Chachangu')}
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-gray-950">
            {t("I AM ABOUT TO BET", "NDIKUFUNA KUBETCHA TSOPANO")}
          </h1>
          <p className="text-xs md:text-sm text-gray-500 max-w-md mx-auto">
            {t(
              "Urges are intense, but they are temporary. They usually peak within 15 minutes. Can you challenge yourself to wait?",
              "Zikhumbo zimatentha kwambiri koma sizikhalitsa. Nthawi zambiri zimatha pakadutsa mphindi 15. Kodi mungathe kudikira?"
            )}
          </p>

          {!isActive && !loggedOutcome ? (
            <button
              onClick={startTimerChallenge}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm md:text-base px-8 py-4 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              ⏳ {t('Start 15-Minute Delay Challenge', 'Yambani Kudikira Mphindi 15')}
            </button>
          ) : isActive ? (
            <div className="space-y-4 pt-4">
              <div className="text-5xl font-black text-red-600 font-mono tracking-wider">
                {formatTime(timer)}
              </div>
              <div className="text-xs text-gray-400 font-bold uppercase tracking-wider animate-pulse">
                {t('DELAY CHALLENGE IN PROGRESS', 'MUKUDIKIRA PANOPAs')}
              </div>

              {/* Outcome log buttons while timer runs */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto pt-4">
                <button
                  onClick={() => handleOutcome('resisted')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow transition"
                >
                  💪 {t('I Resisted! (The Urge Has Passed)', 'Ndalimbika! (Zokhumbazo Zatha)')}
                </button>
                <button
                  onClick={() => handleOutcome('placed')}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs py-3 rounded-xl transition"
                >
                  😓 {t('I placed a bet', 'Ndalakwitsa ndabetcha')}
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4">
              {loggedOutcome === 'resisted' ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center">
                  <span className="text-3xl">🏆</span>
                  <h3 className="font-extrabold text-emerald-900 text-base mt-2">{t('Congratulations! You Won This Battle!', 'Kondwerani! Mwagonjetsa Chikhumbochi!')}</h3>
                  <p className="text-xs text-emerald-700 mt-1">{t('Every urge resisted weakens the addiction. Your streak is intact.', 'Nthawi iliyonse yomwe mwalimbika, muchepetsa nkhondo ya zizolowezi. Mwayenda bwino.')}</p>
                </div>
              ) : (
                <div className="bg-gray-100 border border-gray-200 p-6 rounded-2xl text-center">
                  <span className="text-3xl">❤️</span>
                  <h3 className="font-extrabold text-gray-800 text-base mt-2">{t('We are here for you, always.', 'Tili nanu pamodzi, nthawi zonse.')}</h3>
                  <p className="text-xs text-gray-600 mt-1">{t('Do not judge yourself. Relapse is part of recovery. Reset and try again next time.', 'Musadziimbe mlandu. Kuterereka ndi gawo lakuchira. Konzekerani ndi kudzayesanso mawa.')}</p>
                </div>
              )}
              <button
                onClick={startTimerChallenge}
                className="mt-4 text-xs font-bold text-blue-600 hover:underline"
              >
                {t('Retry Challenge', 'Yeseraninso')}
              </button>
            </div>
          )}
        </div>

        {/* Breathing guide */}
        <BreathingExercise />

        {/* Grounding & Distraction exercises */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-extrabold text-gray-900 text-base">
            {t('Immediate Coping Exercises', 'Zomwe Mungachite Panopa')}
          </h3>

          {/* 5-4-3-2-1 Grounding */}
          <div className="border-b border-gray-100 pb-4 space-y-2">
            <h4 className="font-bold text-sm text-gray-900">
              {t('🧠 5-4-3-2-1 Grounding Technique', '🧠 Ndondomeko Yokhazikitsa Maganizo (5-4-3-2-1)')}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t(
                "Look around you and count: 5 things you can see, 4 things you can physically feel, 3 things you can hear, 2 things you can smell, and 1 positive thing about yourself.",
                "Yang'anani m'mbali mwanu ndipo werengani: Zinthu 5 zomwe mutha kuziona, 4 zomwe mungathe kuzimva kukhudza, 3 zomwe mungathe kuzimva m'makutu, 2 zomwe mutha kuzimva fungo lake, ndi chinthu 1 chabwino chodziunika."
              )}
            </p>
          </div>

          {/* Distractions */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-gray-900">
              {t('🏃 Physical Distraction Suggestions', '🏃 Zochita Zosokoneza Chikhumbo')}
            </h4>
            <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
              <li>{t('Go for a 15-minute brisk walk outside.', 'Tulukani panja mukayende mwachangu kwa mphindi 15.')}</li>
              <li>{t('Do 20 jumping jacks or pushups immediately.', 'Chitani masewera olimbitsa thupi kapena pushups 20 panopa.')}</li>
              <li>{t('Drink a large glass of cold water slowly.', 'Mwani kapu yaikulu ya madzi ozizira pang\'onopang\'ono.')}</li>
              <li>{t('Delete or log out of all betting applications.', 'Chotsani kapena kutseka mapulogalamu anu ogulirako kubetcha.')}</li>
            </ul>
          </div>
        </div>

        {/* Quote Carousel */}
        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl text-center space-y-3 relative">
          <span className="text-xl">💬</span>
          <p className="text-xs md:text-sm text-indigo-900 italic font-medium leading-relaxed">
            "{t(QUOTES[quoteIdx].en, QUOTES[quoteIdx].ny)}"
          </p>
          <button
            onClick={nextQuote}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
          >
            {t('Next Quote →', 'Mawu Ena →')}
          </button>
        </div>

        {/* Immediate contacts */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-extrabold text-gray-900 text-base">{t('Contact Urgent Support', 'Lumikizanani ndi Thandizo Changu')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="tel:+265888123456"
              className="flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-100 text-left transition"
            >
              <div>
                <span className="text-xs font-bold text-blue-900 block">{t('Call Professional Counsellor', 'Imbirani Alangizi')}</span>
                <span className="text-[10px] text-blue-700 mt-0.5">Free Hotline: +265 (0) 888 123 456</span>
              </div>
              <span className="text-lg">📞</span>
            </a>
            <a
              href="sms:+265999654321?body=I%20need%20help%20now"
              className="flex items-center justify-between p-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl border border-indigo-100 text-left transition"
            >
              <div>
                <span className="text-xs font-bold text-indigo-900 block">{t('Sms Trusted Friend', 'Tumizirani Uthenga Mnzanu')}</span>
                <span className="text-[10px] text-indigo-700 mt-0.5">Quick SMS alert support</span>
              </div>
              <span className="text-lg">✉️</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
