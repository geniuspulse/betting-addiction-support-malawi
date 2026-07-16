import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

export default function SOSButton() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/urgency-support')}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-extrabold px-5 py-4 rounded-full shadow-[0_10px_25px_-5px_rgba(220,38,38,0.5)] border-2 border-red-500 hover:scale-110 active:scale-95 transition-all duration-200"
      aria-label="I am about to bet SOS"
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
      </span>
      <span className="text-xs uppercase tracking-widest font-black">
        {t('I NEED HELP NOW', 'NDIKUFUNA CHITHANDIZO')}
      </span>
    </button>
  );
}
