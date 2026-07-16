import React from 'react';
import { useLanguage } from '../LanguageContext';

export default function TrainingCard({ track, onEnroll, isEnrolled }) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 rounded-xl bg-blue-50 text-2xl">
            {track.icon}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{t(track.nameEn, track.nameNy)}</h3>
            <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 mt-1">
              {t(track.incomeEn, track.incomeNy)}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {t(track.descEn, track.descNy)}
        </p>

        <div className="flex items-center space-x-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span><strong>{t('Duration:', 'Nthawi:')}</strong> {t(track.durationEn, track.durationNy)}</span>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2">
        <button
          onClick={() => onEnroll(track.id)}
          disabled={isEnrolled}
          className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-colors duration-200 ${
            isEnrolled
              ? 'bg-emerald-100 text-emerald-800 cursor-default'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow'
          }`}
        >
          {isEnrolled ? t('✓ Enrolled', '✓ Mwalembetsedwa') : t('Enroll in Training', 'Lembetsani Phunziro')}
        </button>
      </div>
    </div>
  );
}
