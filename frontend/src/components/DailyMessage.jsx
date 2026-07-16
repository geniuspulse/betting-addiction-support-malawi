import React from 'react';
import { useLanguage } from '../LanguageContext';

export default function DailyMessage() {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-4 rounded-r-xl shadow-sm my-4">
      <div className="flex items-start space-x-3">
        <div className="text-2xl mt-0.5">💡</div>
        <div>
          <h4 className="font-semibold text-blue-900 text-sm md:text-base">
            {t("Today's Inspiration", "Chilimbikitso cha Lero")}
          </h4>
          <p className="text-gray-700 text-xs md:text-sm mt-1 italic">
            "{t(
              "Your future is created by what you do today, not tomorrow. Every moment without a bet is a brick in your new life.",
              "Tsogolo lanu limamangidwa ndi zomwe mukuchita lero, osati mawa. Nthawi iliyonse yomwe simukubetcha ndi njerwa yomanga moyo wanu watsopano."
            )}"
          </p>
        </div>
      </div>
    </div>
  );
}
