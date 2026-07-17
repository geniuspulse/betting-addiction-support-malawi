import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();
  
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                BASM
              </span>
              <span className="hidden md:inline-block text-xs font-semibold text-gray-500 border-l border-gray-200 pl-2">
                Betting Addiction Support Malawi
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <Link to="/dashboard" className="text-xs md:text-sm font-semibold text-gray-700 hover:text-blue-600 transition">
              {t('Dashboard', 'Tsamba Lanu')}
            </Link>
            <Link to="/assessment" className="text-xs md:text-sm font-semibold text-gray-700 hover:text-blue-600 transition">
              {t('Assessment', 'Mayeso')}
            </Link>
            <Link to="/counsellors" className="text-xs md:text-sm font-semibold text-gray-700 hover:text-blue-600 transition">
              {t('Counsellors', 'Aupangiri')}
            </Link>
            <Link to="/training" className="text-xs md:text-sm font-semibold text-gray-700 hover:text-blue-600 transition">
              {t('Training', 'Zopitilira')}
            </Link>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="ml-2 flex items-center space-x-1 px-3 py-1.5 rounded-full border border-blue-100 hover:bg-blue-50 text-xs font-bold text-blue-700 transition"
            >
              🌐 <span>{lang === 'en' ? 'CH' : 'EN'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
