import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import AchievementBadge from '../components/AchievementBadge';

const ALL_BADGES = [
  {
    id: 'streak1',
    nameEn: '1-Day Milestone',
    nameNy: 'Tsiku la 1',
    descEn: 'Completed your first 24 hours entirely free of sports betting and virtual slots.',
    descNy: 'Malizitsani maola 24 oyamba popanda kubetcha.',
    icon: '🌱',
    unlocked: true,
    date: '10 Jul 2026'
  },
  {
    id: 'streak3',
    nameEn: '3-Day Milestone',
    nameNy: 'Masiku 3',
    descEn: 'Three continuous days of guarding your wallet and mind from betting urges.',
    descNy: 'Masiku atatu otsatizana oteteza thumba lanu.',
    icon: '⚡',
    unlocked: true,
    date: '13 Jul 2026'
  },
  {
    id: 'streak7',
    nameEn: '7-Day Milestone',
    nameNy: 'Sabatat Imodzi',
    descEn: 'One full week! Your cognitive pathways are starting to rebuild. Excellent work.',
    descNy: 'Sabata yathunthu! Kukula kwabwino kwa m\'maganizo kukuyamba.',
    icon: '🔥',
    unlocked: false,
    date: ''
  },
  {
    id: 'streak14',
    nameEn: '14-Day Milestone',
    nameNy: 'Masiku 14',
    descEn: 'Two solid weeks. You are establishing real, healthy livelihood habits.',
    descNy: 'Masiku 14 osabetcha. Mukukhazikitsa maluso atsopano a moyo.',
    icon: '🛡️',
    unlocked: false,
    date: ''
  },
  {
    id: 'streak30',
    nameEn: '30-Day Recovery Milestone',
    nameNy: 'Mwezi Umodzi',
    descEn: 'One month! That is enough saved Kwacha to support major household livelihood items.',
    descNy: 'Mwezi umodzi osabetcha! Ndalama zanu zasungidwa kwambiri.',
    icon: '🏆',
    unlocked: false,
    date: ''
  },
  {
    id: 'streak60',
    nameEn: '60-Day Recovery Milestone',
    nameNy: 'Masiku 60',
    descEn: 'Sixty days free. You have completely rewritten your daily routines.',
    descNy: 'Masiku 60 osabetcha. Mwatsimikiza kusintha moyo wanu.',
    icon: '👑',
    unlocked: false,
    date: ''
  },
  {
    id: 'streak100',
    nameEn: '100-Day Milestone',
    nameNy: 'Masiku 100',
    descEn: 'The century mark. You are an inspiration to the entire BASM community!',
    descNy: 'Masiku 100 osabetcha! Ndinu chitsanzo kwa onse achichepere.',
    icon: '🚀',
    unlocked: false,
    date: ''
  },
  {
    id: 'act_checkin',
    nameEn: 'First Daily Check-in',
    nameNy: 'Kudziunika Koyamba',
    descEn: 'Successfully completed your first emotional and urge check-in tracker.',
    descNy: 'Malizitsani kulemba momwe mukumvera patsiku kwa nthawi yoyamba.',
    icon: '📝',
    unlocked: true,
    date: '08 Jul 2026'
  },
  {
    id: 'act_goal',
    nameEn: 'Livelihood Goal Set',
    nameNy: 'Cholinga Chakhazikitsidwa',
    descEn: 'Established your savings goal in the Recovery Wallet interface.',
    descNy: 'Khazikitsani cholinga cha thumba lanu monga sukulu kapena malonda.',
    icon: '💼',
    unlocked: true,
    date: '09 Jul 2026'
  },
  {
    id: 'act_counsel',
    nameEn: 'Session Booked',
    nameNy: 'Kusankha Alangizi',
    descEn: 'Booked a free, anonymous peer or professional counselling session.',
    descNy: 'Sankhani tsiku ocheza ndi alangizi athu a zaulere.',
    icon: '📞',
    unlocked: false,
    date: ''
  },
  {
    id: 'act_community',
    nameEn: 'Joined Circle',
    nameNy: 'Kulowa mu Gulu',
    descEn: 'Connected with the anonymous peer support community feed.',
    descNy: 'Lumikizana ndi anthu ena kudzera mu macheza achinsinsi.',
    icon: '👥',
    unlocked: true,
    date: '09 Jul 2026'
  }
];

export default function Achievements() {
  const { t } = useLanguage();
  const [showAnimation, setShowUnlockingAnimation] = useState(false);

  const triggerCelebration = () => {
    setShowUnlockingAnimation(true);
    setTimeout(() => {
      setShowUnlockingAnimation(false);
    }, 4000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 pb-24 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-6 relative">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950">
              {t('Your Recovery Achievements', 'Zolimbikitsa ndi Chipambano Chanu')}
            </h1>
            <p className="text-gray-500 text-sm">
              {t('Every milestone achieved is an investment in your genuine, non-gambling future.', 'Chigoli chilichonse chomwe mwasunga ndi njerwa yakumanga tsogolo lotetezeka.')}
            </p>
          </div>
          <button
            onClick={triggerCelebration}
            className="self-start sm:self-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow transition"
          >
            🎉 {t('Simulate Unlock', 'Onetsani Chikondwerero')}
          </button>
        </div>

        {/* Celebrating Unlock overlay animation */}
        {showAnimation && (
          <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-2xl p-6 text-center shadow-lg border-2 border-yellow-300 animate-bounce duration-1000">
            <span className="text-4xl">🌟🏆🎉</span>
            <h3 className="font-extrabold text-lg mt-2">
              {t('New Achievement Unlocked!', 'Mwakwaniritsa Chipambano Chatsopano!')}
            </h3>
            <p className="text-xs text-yellow-50 max-w-sm mx-auto mt-1">
              {t('Congratulations! You are building healthy habits and real wealth step-by-step.', 'Zabwino kwambiri! Mukumanga chuma chenicheni ndi maluso pang\'onopang\'ono.')}
            </p>
          </div>
        )}

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ALL_BADGES.map((badge) => (
            <AchievementBadge key={badge.id} badge={badge} />
          ))}
        </div>

        {/* Share Button (Anonymized) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm text-center max-w-md mx-auto space-y-3">
          <h4 className="font-extrabold text-gray-900 text-sm">
            {t('Proud of your progress?', 'Kodi mukukondwera ndi kuyenda kwanu?')}
          </h4>
          <p className="text-xs text-gray-500">
            {t('You can share your current recovery stats with a friend anonymously. Your private data remains hidden.', 'Mutha kugawana ndi mnzanu zomwe mwasunga popanda maina kapena zinsinsi zanu kutuluka.')}
          </p>
          <button
            onClick={() => alert(t('Recovery report copied anonymously to clipboard!', 'Mwachinsinsi: Chikalatacho chatengeredwa kale pafoni yanu!'))}
            className="w-full bg-slate-100 hover:bg-slate-200 text-gray-800 font-bold text-xs py-2.5 rounded-xl transition"
          >
            🔗 {t('Copy Anonymous Share Link', 'Tengani Mulalo Ogawana Mwachinsinsi')}
          </button>
        </div>

      </div>
    </div>
  );
}
