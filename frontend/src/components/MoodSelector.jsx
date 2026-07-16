import React from 'react';
import { useLanguage } from '../LanguageContext';

export default function MoodSelector({ selectedMood, onSelect }) {
  const { t } = useLanguage();

  const moods = [
    { id: 'great', label: t('Great', 'Zabwino Kwambiri'), emoji: '😊', color: 'hover:bg-green-50 text-green-700 border-green-200' },
    { id: 'good', label: t('Good', 'Zabwino'), emoji: '🙂', color: 'hover:bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'okay', label: t('Okay', 'Mulinji'), emoji: '😐', color: 'hover:bg-gray-50 text-gray-700 border-gray-200' },
    { id: 'low', label: t('Low', 'Zochepa mphamvu'), emoji: '😔', color: 'hover:bg-orange-50 text-orange-700 border-orange-200' },
    { id: 'struggling', label: t('Struggling', 'Mukulimbana'), emoji: '😰', color: 'hover:bg-red-50 text-red-700 border-red-200' },
  ];

  return (
    <div className="grid grid-cols-5 gap-2 w-full">
      {moods.map((m) => {
        const isSelected = selectedMood === m.id;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect(m.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
              isSelected
                ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                : `bg-white text-gray-700 border-gray-100 ${m.color}`
            }`}
          >
            <span className="text-xl md:text-2xl mb-1">{m.emoji}</span>
            <span className={`text-[9px] md:text-xs text-center font-medium ${isSelected ? 'text-white' : 'text-gray-500'}`}>
              {m.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
