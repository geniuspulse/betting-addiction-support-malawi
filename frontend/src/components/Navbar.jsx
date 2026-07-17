import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const navLinks = [
  { to: '/',                labelEn: 'Home',        labelNy: 'Kunyumba' },
  { to: '/dashboard',       labelEn: 'Dashboard',   labelNy: 'Tsamba Lanu' },
  { to: '/assessment',      labelEn: 'Assessment',  labelNy: 'Mayeso' },
  { to: '/counsellors',     labelEn: 'Counsellors', labelNy: 'Aupangiri' },
  { to: '/training',        labelEn: 'Training',    labelNy: 'Zophunzira' },
  { to: '/recovery-wallet', labelEn: 'Wallet',      labelNy: 'Thumba' },
  { to: '/community',       labelEn: 'Community',   labelNy: 'Anthu' },
  { to: '/programs',        labelEn: 'Programs',    labelNy: 'Mapulogalamu' },
];

export default function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0" onClick={() => setMenuOpen(false)}>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              BASM
            </span>
            <span className="hidden sm:block text-xs font-medium text-gray-400 border-l border-gray-200 pl-2 leading-tight">
              Betting Addiction<br />Support Malawi
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  isActive(link.to)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {lang === 'en' ? link.labelEn : link.labelNy}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center space-x-2">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-full border border-blue-100 hover:bg-blue-50 text-xs font-bold text-blue-700 transition"
            >
              <span>🌐</span>
              <span>{lang === 'en' ? 'CH' : 'EN'}</span>
            </button>

            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-md hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                /* X icon */
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                /* Hamburger icon */
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden pb-3 pt-1 border-t border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-1 my-0.5 transition ${
                  isActive(link.to)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                {lang === 'en' ? link.labelEn : link.labelNy}
              </Link>
            ))}
            {/* Emergency quick link in mobile menu */}
            <Link
              to="/emergency"
              onClick={() => setMenuOpen(false)}
              className="flex items-center px-4 py-3 mx-1 my-0.5 text-sm font-bold text-red-600 bg-red-50 rounded-lg"
            >
              🚨 {t('Emergency Help', 'Thandizo Ladzukulu')}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
