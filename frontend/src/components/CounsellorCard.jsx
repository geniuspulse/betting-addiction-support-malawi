import React from 'react';
import { useLanguage } from '../LanguageContext';

export default function CounsellorCard({ counsellor, onBook }) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col justify-between">
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold border-2 border-white shadow-md flex-shrink-0">
            {counsellor.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{counsellor.name}</h3>
            <p className="text-xs text-blue-600 font-medium">{t(counsellor.specializationEn, counsellor.specializationNy)}</p>
            <p className="text-xs text-gray-500 mt-1">🗣️ {counsellor.languages.join(', ')}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600 space-y-1">
          <p>📅 <strong>{t('Availability:', 'Kupezeka:')}</strong> {t(counsellor.availabilityEn, counsellor.availabilityNy)}</p>
          <p>⭐ <strong>{t('Experience:', 'Chidziwitso:')}</strong> {counsellor.experience}</p>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2">
        <button
          onClick={() => onBook(counsellor)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all"
        >
          {t('Book Session', 'Sankhani Nthawi')}
        </button>
      </div>
    </div>
  );
}
