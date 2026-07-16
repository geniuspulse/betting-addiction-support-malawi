import React from 'react';
import { useLanguage } from '../LanguageContext';

export default function FamilySupport() {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 pb-24 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full uppercase tracking-wider">
            🤝 {t('FAMILY & COMMUNITY RESOURCES', 'MABANJA NDI CHITHANDIZO')}
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-gray-950">
            {t('Support Guide for Family Members', 'Chitsogozo Chothandizira Mabanja athu')}
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            {t(
              "Gambling addiction doesn't just affect the player — it impacts families, relationships, and children. Learn how to talk about it and find help.",
              "Vuto lodzola kapena kubetcha siliyenda mwa wobetchera yekha — limasokonezanso mabanja, ana, komanso abwenzi. Dziwani njira yolankhulirana mosatekeseka."
            )}
          </p>
        </div>

        {/* Warning Signs List */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-extrabold text-gray-900 text-base">
            ⚠️ {t('Warning Signs of Gambling Addiction', 'Zizindikiro za Vuto la Kubetcha')}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-600 list-disc pl-5 leading-relaxed">
            <li>{t('Unexplained money shortages or frequent borrowing (katapila).', 'Kusowa kwa ndalama m’njira yosamvetsetseka kapena kubwereka (katapila).')}</li>
            <li>{t('Constantly checking football scores, virtual gaming apps, or odds.', 'Kukhala pafoni nthawi zonse kuyang\'ana ma odds kapena masewera a aviator.')}</li>
            <li>{t('Neglecting basic family needs (maize, groceries, rent, school fees).', 'Kusasamalira zosowa zapanyumba (chimanga, renti, sukulu, chakudya).')}</li>
            <li>{t('Lying or being extremely secretive about financial transactions.', 'Kunama kapena kubisa zambiri za ndalama zomwe akutenga.')}</li>
            <li>{t('Irritability, severe mood swings, or isolation when not gaming.', 'Kukwiya msanga, nkhawa, kapena kukhala nokha chifukwa cha zosowa.')}</li>
            <li>{t('Selling household assets or items without clear justification.', 'Kugulitsa katundu wapanyumba popanda zifukwa zomveka.')}</li>
          </ul>
        </div>

        {/* How to talk */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Do's */}
          <div className="bg-emerald-50/50 border border-emerald-200 p-6 rounded-2xl space-y-3">
            <h4 className="font-bold text-emerald-950 text-sm md:text-base">
              🟢 {t('The DOS — Recommended Actions', 'ZOYENERA KUCHITA')}
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-900 list-disc pl-5 leading-normal font-medium">
              <li>{t('Speak calmly and focus on your concern for their emotional health.', 'Lankhulani mofatsa komanso mwachifundo mukuonetsa kukhudzika kwanu.')}</li>
              <li>{t('Acknowledge that betting is a clinical habit, not just a moral weakness.', 'Zindikirani kuti kubetcha kuli ngati matenda odzola m’maganizo osati ulesi.')}</li>
              <li>{t('Take control of family finances (bank cards, crop sale cash).', 'Sungeni nokha ndalama zapanyumba (makhadi, ndalama za zokolola).')}</li>
              <li>{t('Encourage them to book a free anonymous session on BASM.', 'Atsogolere kulembetsa upangiri waulere mwachinsinsi pa BASM.')}</li>
            </ul>
          </div>

          {/* Don'ts */}
          <div className="bg-red-50/50 border border-red-200 p-6 rounded-2xl space-y-3">
            <h4 className="font-bold text-red-950 text-sm md:text-base">
              🔴 {t('The DONTS — Things to Avoid', 'ZOMWE MUSAMACHITE')}
            </h4>
            <ul className="space-y-2.5 text-xs text-red-900 list-disc pl-5 leading-normal font-medium">
              <li>{t('Do not lecture, shout, or make aggressive personal accusations.', 'Musamalalatire kapena kutchula mawu achipongwe ndi kudzudzula.')}</li>
              <li>{t('Do not clear their betting debts (this enables them to bet again).', 'Musamawalipirire ngongole za katapila (izi zimawalimbikitsa kubetcha mawa).')}</li>
              <li>{t('Do not allow them to handle significant micro-finance or farm money.', 'Musamawasiyire ndalama zonse za famu kapena za banki m’khonde.')}</li>
              <li>{t('Do not ignore your own emotional peace or physical safety.', 'Musalekerere chitetezo chanu kapena mtendere wamaganizo anu.')}</li>
            </ul>
          </div>
        </div>

        {/* Local Support Organizations in Malawi */}
        <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm space-y-4">
          <h3 className="font-extrabold text-gray-900 text-base">
            🏢 {t('Local Support Organizations in Malawi', 'Mabungwe Thandizo ku Malawi')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-gray-100 rounded-xl space-y-1.5 text-xs">
              <span className="font-bold text-gray-900 block">Saint John of God Hospitaller Services</span>
              <p className="text-gray-500">
                {t('Comprehensive alcohol, drug, and behavioral addiction therapy clinics.', 'Malo othandizira zaizolowezi zoipa za m\'maganizo komanso kuphunzira maluso.')}
              </p>
              <span className="text-blue-600 font-bold block mt-1">📍 Mzuzu & Lilongwe</span>
            </div>

            <div className="p-4 bg-slate-50 border border-gray-100 rounded-xl space-y-1.5 text-xs">
              <span className="font-bold text-gray-900 block">Zomba Mental Hospital</span>
              <p className="text-gray-500">
                {t('National specialized psychological services and family support units.', 'Chipatala chachikulu chozindikira za m\'maganizo ku Zomba.')}
              </p>
              <span className="text-blue-600 font-bold block mt-1">📍 Zomba</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
