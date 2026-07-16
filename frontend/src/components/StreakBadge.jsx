import React from 'react';
import { useLanguage } from '../LanguageContext';

export default function StreakBadge({ streak = 0 }) {
  const { t } = useLanguage();

  return (
    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-2xl shadow-md border-b-4 border-orange-700 animate-pulse">
      <span className="text-2xl select-none">🔥</span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-orange-100 leading-none">
          {t('Streak', 'Chisangalalo')}
        </div>
        <div className="text-sm font-extrabold leading-none mt-0.5">
          {streak} {streak === 1 ? t('Day Bet-Free', 'Tsiku Lopanda Kubetcha') : t('Days Bet-Free', 'Masiku Opanda Kubetcha')}
        </div>
      </div>
    </div>
  );
}
