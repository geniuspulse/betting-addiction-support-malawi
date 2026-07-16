import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';

const QUESTIONS = [
  {
    id: 1,
    en: 'How often do you bet on sports or virtual games (e.g. Aviator, Premier Bet, etc.)?',
    ny: 'Kodi mumatani pafupipafupi kubetcha pamasewera kapena masewera ena amagetsi (monga Aviator, Premier Bet, n.k.)?',
  },
  {
    id: 2,
    en: 'Has betting caused you financial difficulties (such as struggling to buy food, pay rent, or pay school fees)?',
    ny: 'Kodi kubetcha kwakupangitsani kukhala pamavuto azachuma (monga kulephera kugula chakudya, renti, kapena ndalama za sukulu)?',
  },
  {
    id: 3,
    en: 'Have you tried to cut down or stop betting but failed?',
    ny: 'Kodi mwayesapo kuchepetsa kapena kusiya kubetcha koma mukulephera?',
  },
  {
    id: 4,
    en: 'Has your betting caused disagreements or relationship issues with family, partners, or friends?',
    ny: 'Kodi kubetcha kwabweretsa kusamvana kapena mikangano m’banja, ndi anzanu, kapena achibale anu?',
  },
  {
    id: 5,
    en: 'Do you feel restless, irritable, or anxious when you are not betting or trying to stop?',
    ny: 'Kodi mumamva kukhala osakhazikika, okwiya pafupipafupi, kapena ndi nkhawa mukapanda kubetcha kapena mukayesa kusiya?',
  },
  {
    id: 6,
    en: 'After losing money betting, do you return another day to try and win back your losses ("chasing losses")?',
    ny: 'Mukataya ndalama pakubetcha, kodi mumabwereranso tsiku lina ndi cholinga chofuna kubweza ndalama zanu zomwe zidatayikazo?',
  },
  {
    id: 7,
    en: 'Have you lied to family members or others to hide the extent of your betting?',
    ny: 'Kodi mudanamizapo achibale anu kapena ena kuti mubise momwe mukubetcha?',
  },
  {
    id: 8,
    en: 'Have you borrowed money, sold items, or taken out high-interest loans (katapila) to get money for betting?',
    ny: 'Kodi mudabwereka ndalama, kugulitsa katundu, kapena kutenga katapila kuti mupeze ndalama zobetcha?',
  },
  {
    id: 9,
    en: 'Have you neglected work, business, household chores, or school responsibilities because of betting?',
    ny: 'Kodi munasokonezapo ntchito, bizinesi, kapena maphunziro chifukwa cha kubetcha?',
  },
  {
    id: 10,
    en: 'Do you find yourself thinking about betting constantly, planning your next bet, or researching odds?',
    ny: 'Kodi nthawi zambiri mumapezeka mukuganiza kwambiri za kubetcha kapena kukonzekera kubetcha kwina?',
  }
];

export default function Assessment() {
  const { t, lang, toggleLanguage } = useLanguage();
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (qIdx, value) => {
    const updated = [...answers];
    updated[qIdx] = value;
    setAnswers(updated);
  };

  const calculateResults = (e) => {
    e.preventDefault();
    if (answers.includes(null)) {
      alert(t('Please answer all 10 questions before submitting.', 'Chonde yankhani mafunso onse 10 musanatumize.'));
      return;
    }
    const total = answers.reduce((acc, curr) => acc + curr, 0);
    setScore(total);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetQuiz = () => {
    setAnswers(Array(10).fill(null));
    setSubmitted(false);
    setScore(0);
  };

  const getRiskLevel = () => {
    if (score <= 10) return { level: t('Low Risk', 'Chiwopsezo Chochepa'), color: 'text-green-600 bg-green-50 border-green-200', desc: t('Your betting behavior seems mostly under control, but stay self-aware. Try keeping a bet-free streak and check in daily to protect your wallet.', 'Kubetcha kwanu sikuwoneka ngati kuli pa chiwopsezo, koma khalani tcheru. Yesetsani kusungabe masiku opanda kubetcha ndi kudziunika tsiku ndi tsiku.') };
    if (score <= 20) return { level: t('Moderate Risk', 'Chiwopsezo Chapakatikati'), color: 'text-amber-600 bg-amber-50 border-amber-200', desc: t('Your betting is starting to impact your finances or mental clarity. We recommend establishing a strict budget using our Recovery Wallet, setting up a savings goal, and enrolling in our 30-day Awareness program.', 'Kubetcha kwanu kwayamba kusokoneza ndalama kapena maganizo anu. Tikukulimbikitsani kukhazikitsa bajeti kudzera pa Recovery Wallet yathu, ndipo mudzilembitse nawo pulogalamu yamasiku 30.') };
    return { level: t('High Risk / Addiction', 'Chiwopsezo Chachikulu / Chizolowezi Chopitirira'), color: 'text-red-600 bg-red-50 border-red-200', desc: t('Your betting is severely affecting multiple areas of your life, finances, and emotional health. We highly recommend talking to a professional Malawian counsellor immediately, enrolling in our 90-day Intensive program, and starting an active daily check-in track.', 'Kubetcha kwakukhudzani kwambiri mbali zambiri za moyo wanu, chuma, komanso thanzi lanu la m’maganizo. Tikupemphani kuti mulankhule mwachangu ndi alangizi athu, kulembetsa pulogalamu ya masiku 90, komanso kudziunika tsiku lililonse.') };
  };

  const risk = getRiskLevel();

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Toggle & Title Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            {t('Risk Assessment Questionnaire', 'Mayeso a Chiwopsezo Chobetcha')}
          </h1>
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 bg-white border border-gray-200 rounded-lg shadow-sm text-xs font-bold text-blue-600 hover:bg-blue-50 transition"
          >
            {lang === 'en' ? 'CHICHEWA 🇲🇼' : 'ENGLISH 🇬🇧'}
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={calculateResults} className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-2xl text-xs md:text-sm text-blue-900">
              {t(
                'Please answer these questions honestly. This assessment is completely confidential. There are no right or wrong answers.',
                'Yankhani mafunsowa mosanyenga. Mayesowa ndi achinsinsi kwambiri. Palibe mayankho olondola kapena olakwika.'
              )}
            </div>

            {QUESTIONS.map((q, qIdx) => (
              <div key={q.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
                  {t('Question', 'Funso')} {qIdx + 1}
                </span>
                <p className="font-semibold text-gray-800 text-sm md:text-base leading-snug mb-4">
                  {lang === 'en' ? q.en : q.ny}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { val: 0, label: t('Never', 'Palibe nthawi') },
                    { val: 1, label: t('Sometimes', 'Nthawi zina') },
                    { val: 2, label: t('Often', 'Kachulukidwe') },
                    { val: 3, label: t('Always', 'Nthawi zonse') }
                  ].map((option) => {
                    const isSelected = answers[qIdx] === option.val;
                    return (
                      <button
                        key={option.val}
                        type="button"
                        onClick={() => handleSelect(qIdx, option.val)}
                        className={`py-3 px-4 rounded-xl text-xs font-semibold border text-center transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                            : 'bg-white hover:bg-slate-50 text-gray-700 border-gray-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm md:text-base py-4 rounded-2xl shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {t('Get My Assessment Results', 'Onani Zotsatira Zanga')}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            {/* Results Display */}
            <div className={`p-8 rounded-3xl border-2 shadow-sm text-center ${risk.color}`}>
              <span className="text-xs uppercase tracking-widest font-black block mb-1">
                {t('Your Score:', 'Zotsatira Zanu:')} {score} / 30
              </span>
              <h2 className="text-3xl font-black mb-4">
                {risk.level}
              </h2>
              <p className="text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                {risk.desc}
              </p>
            </div>

            {/* Recommendations */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="font-extrabold text-gray-900 text-lg">
                {t('Recommended Recovery Action Plan', 'Ndondomeko ya Kuchira Yoyenera')}
              </h3>
              
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span><strong>{t('Recovery Wallet:', 'Thumba Lothandizira:')}</strong> {t('Establish daily betting expense benchmarks and redirect your savings to important life priorities.', 'Khazikitsani bajeti yobetcha tsiku lililonse ndipo sungani ndalamazo kaamba ka zinthu zina zofunika.')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span><strong>{t('Daily Check-in:', 'Kudziunika Tsiku lililonse:')}</strong> {t('Record your mood and keep your streak bet-free in the Dashboard.', 'Lembani malingaliro ndi momwe mukumvera kuti muteteze masiku opanda kubetcha.')}</span>
                </li>
                {score >= 11 && (
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span><strong>{t('Professional Support:', 'Thandizo la Akatswiri:')}</strong> {t('Book a free, anonymous private counselling session via video, chat, or peer circles.', 'Sankhani nthawi yochezera ndi alangizi athu mwachinsinsi kwaulere kudzera mu vidiyo, macheza, kapena magulu.')}</span>
                  </li>
                )}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow text-sm transition"
                >
                  {t('Go to Recovery Dashboard', 'Pita ku Tsamba Lanu la Recovery')}
                </button>
                <button
                  onClick={resetQuiz}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-gray-700 font-bold py-3 rounded-xl text-sm transition"
                >
                  {t('Retake Assessment', 'Yambiraninso Mayeso')}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
