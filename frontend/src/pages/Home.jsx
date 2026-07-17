import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-500 to-indigo-600 text-white py-16 md:py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-indigo-700/50 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
            {t('Betting Addiction Support Malawi', 'Chithandizo Chamavuto Ogula Kubetcha ku Malawi')}
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight">
            {t('You are not alone. Recovery starts today.', 'Simuli nokha. Kuchira kwanu kumayambira lero.')}
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-blue-100 italic mb-8">
            "{t("Tiyeni tizithandizana", "Tiyeni tizithandizana")}"
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
            <button
              onClick={() => navigate('/assessment')}
              className="w-full sm:w-auto bg-white text-indigo-700 hover:bg-blue-50 font-extrabold px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {t('Take Risk Assessment', 'Yesani Mayeso a Chiwopsezo')}
            </button>
            <button
              onClick={() => navigate('/urgency-support')}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-extrabold px-8 py-4 rounded-xl shadow-lg border-b-4 border-red-800 transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              ⚠️ {t('I Need Help Now', 'Ndikufuna Thandizo Lero')}
            </button>
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate('/programs')}
              className="text-sm font-semibold text-indigo-100 hover:text-white underline underline-offset-4"
            >
              {t('View Recovery Programs', 'Onani Mapulogalamu Kuchira')}
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-8 border-y border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="border-r border-gray-100 last:border-0">
            <div className="text-4xl font-extrabold text-blue-600">1 in 5</div>
            <div className="text-sm text-gray-500 mt-2 font-medium">
              {t('Malawian youth bet regularly', 'Achinyamata amubetcha pafupipafupi ku Malawi')}
            </div>
          </div>
          <div className="border-r border-gray-100 last:border-0">
            <div className="text-4xl font-extrabold text-indigo-600">100%</div>
            <div className="text-sm text-gray-500 mt-2 font-medium">
              {t('Anonymous & Confidential', 'Mwachinsinsi Chopanda Maina')}
            </div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-emerald-600">MWK 0</div>
            <div className="text-sm text-gray-500 mt-2 font-medium">
              {t('Free support & self-care resources', 'Zothandiza zaulere osalipira')}
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Message / Non-clinical Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {t('A Safe Space for Healing', 'Malo Otetezeka Kuchira')}
        </h2>
        <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-8 max-w-2xl mx-auto">
          {t(
            'We understand that sports betting and virtual aviator gaming can quickly take over your life, dreams, and wallet. BASM is built by Malawians, for Malawians, to help you reclaim your financial independence and mental peace.',
            'Tikudziwa kuti kubetcha pamasewera ndi aviator zitha kusokoneza moyo wanu, maloto anu, komanso thumba lanu. BASM imamangidwa ndi a Malawi, kaamba ka a Malawi, kuti ikuthandizeni kupezanso ufulu wanu wa zachuma ndi mtendere wamaganizo.'
          )}
        </p>

        {/* Informational Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-2xl mb-2">💼</div>
            <h3 className="font-bold text-gray-900 mb-2">{t('Recovery Wallet', 'Thumba Lopulumutsa')}</h3>
            <p className="text-sm text-gray-500">{t('Track money saved that would have otherwise gone to betting. Invest in your real dreams.', 'Yerekezerani ndalama zomwe mwasunga m&apos;malo mobetcha. Sungani kaamba ka maloto anuanu.')}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-2xl mb-2">🎓</div>
            <h3 className="font-bold text-gray-900 mb-2">{t('Skills Training', 'Maphunziro a Maluso')}</h3>
            <p className="text-sm text-gray-500">{t('Learn agribusiness, digital marketing, trades and entrepreneurship to create genuine wealth.', 'Phunzirani ulimi, luso la digito, ndi bizinesi kuti mupange chuma chenicheni.')}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-bold text-gray-900 mb-2">{t('Counselling & Community', 'Aupangiri & Gulu')}</h3>
            <p className="text-sm text-gray-500">{t('Connect anonymously with local professional counsellors and peer support networks.', 'Lumikizanani mwachinsinsi ndi alangizi odziwa bwino ntchito komanso anzanu omwe mukuyenda nawo limodzi.')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
