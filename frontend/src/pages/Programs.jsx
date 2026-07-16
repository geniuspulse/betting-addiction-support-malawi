import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';

const PROGRAMS = [
  {
    id: '30-day',
    nameEn: '30-Day Awareness Program',
    nameNy: 'Kuzindikira kwa Masiku 30',
    colorClass: 'border-yellow-200 bg-yellow-50/30 text-yellow-900',
    badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    btnColor: 'bg-yellow-600 hover:bg-yellow-700',
    featuresEn: [
      'Daily trigger awareness journaling',
      'Basic wallet & savings configurations',
      'Weekly peer-to-peer reflection circles',
      'Understanding high-interest debt structures'
    ],
    featuresNy: [
      'Kulemba zosokoneza ndi zoyambitsa tsiku lililonse',
      'Kukhazikitsa thumba lazachuma lopulumutsa',
      'Zokambirana zosinkhasinkha za sabata ndi sabata',
      'Kuzindikira mavuto angongole za katapila'
    ],
    durationEn: '30 Days',
    durationNy: 'Masiku 30'
  },
  {
    id: '60-day',
    nameEn: '60-Day Recovery Program',
    nameNy: 'Chire Chamasiku 60',
    colorClass: 'border-orange-200 bg-orange-50/30 text-orange-900',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
    btnColor: 'bg-orange-600 hover:bg-orange-700',
    featuresEn: [
      'All features of 30-Day awareness',
      'Assigned personal peer supervisor',
      'Financial rebuilding workshops',
      'Cognitive grounding techniques'
    ],
    featuresNy: [
      'Mbali zonse za kuzindikira za masiku 30',
      'Kupatsidwa mnzanu woyang\'anira pa inu',
      'Zokambirana zomanganso zachuma chanu',
      'Njira zodziunika ndi kugonjetsa chikhumbo'
    ],
    durationEn: '60 Days',
    durationNy: 'Masiku 60'
  },
  {
    id: '90-day',
    nameEn: '90-Day Intensive Program',
    nameNy: 'Kukonzekera Kwakukulu kwa Masiku 90',
    colorClass: 'border-red-200 bg-red-50/30 text-red-950',
    badgeColor: 'bg-red-100 text-red-800 border-red-200',
    btnColor: 'bg-red-600 hover:bg-red-700',
    featuresEn: [
      'Comprehensive emotional recovery',
      'Bi-weekly private video counselling',
      'Family system coping workshops',
      'Income alternative skill pathways'
    ],
    featuresNy: [
      'Kukonzanso maganizo mofatsa komanso kwathunthu',
      'Kucheza mwachinsinsi ndi alangizi kawiri pa sabata',
      'Zokambirana zothandizira mabanja athu',
      'Maphunziro a maluso opanga chuma'
    ],
    durationEn: '90 Days',
    durationNy: 'Masiku 90'
  }
];

export default function Programs() {
  const { t } = useLanguage();
  const [enrolledProgram, setEnrolledProgram] = useState(() => localStorage.getItem('basm_enrolled_program') || null);
  const [progressDay, setProgressDay] = useState(() => Number(localStorage.getItem('basm_program_day') || 5));

  const handleEnroll = (progId) => {
    localStorage.setItem('basm_enrolled_program', progId);
    localStorage.setItem('basm_program_day', '1');
    setEnrolledProgram(progId);
    setProgressDay(1);
  };

  const handleUnenroll = () => {
    localStorage.removeItem('basm_enrolled_program');
    localStorage.removeItem('basm_program_day');
    setEnrolledProgram(null);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 pb-24 text-gray-850">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl font-extrabold text-gray-950">{t('Recovery Programs', 'Mapulogalamu Kuchira')}</h1>
          <p className="text-sm text-gray-500">
            {t(
              'Structured, evidence-based self-care and guided program paths to help you build sustainable habits free of gambling.',
              'Mayendedwe odzaza ndi zolimbikitsa kudziunika ndi kudziteteza kuti muchepetse zolakalaka zonse zopezera kubetcha.'
            )}
          </p>
        </div>

        {/* Tracker if enrolled */}
        {enrolledProgram && (
          <div className="bg-white rounded-3xl p-6 border border-gray-150 shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 uppercase tracking-widest">
                  {t('Enrolled and Active', 'MWALEMBETSEDWA')}
                </span>
                <h2 className="text-lg font-black text-gray-900 mt-1">
                  {t(
                    PROGRAMS.find(p => p.id === enrolledProgram)?.nameEn || '',
                    PROGRAMS.find(p => p.id === enrolledProgram)?.nameNy || ''
                  )}
                </h2>
              </div>
              <button
                onClick={handleUnenroll}
                className="text-xs text-red-500 hover:text-red-700 font-semibold underline"
              >
                {t('Leave Program', 'Siyani Pulogalamu')}
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500 font-bold uppercase">
                <span>{t('Overall Progress', 'Kuyenda Patsogolo')}</span>
                <span>Day {progressDay} of {enrolledProgram === '30-day' ? 30 : enrolledProgram === '60-day' ? 60 : 90}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden shadow-inner border border-gray-200">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(progressDay / (enrolledProgram === '30-day' ? 30 : enrolledProgram === '60-day' ? 60 : 90)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROGRAMS.map((program) => {
            const isCurrent = enrolledProgram === program.id;
            const features = t(program.featuresEn, program.featuresNy);

            return (
              <div 
                key={program.id}
                className={`bg-white rounded-2xl border flex flex-col justify-between overflow-hidden shadow-sm transition-transform hover:-translate-y-1 ${
                  isCurrent ? 'ring-2 ring-blue-500 ring-offset-2' : 'border-gray-150'
                }`}
              >
                {/* Header aspect */}
                <div className={`p-6 border-b border-gray-100 ${program.colorClass}`}>
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mb-2 uppercase ${program.badgeColor}`}>
                    {t(program.durationEn, program.durationNy)}
                  </span>
                  <h3 className="text-lg font-extrabold leading-tight">
                    {t(program.nameEn, program.nameNy)}
                  </h3>
                </div>

                {/* Features */}
                <div className="p-6 space-y-4 flex-grow">
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {t('WHAT YOU WILL LEARN:', 'ZOMWE MUZAPHUNZIRE:')}
                  </span>
                  <ul className="space-y-2.5 text-xs text-gray-600">
                    {features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-emerald-500 mt-0.5">✓</span>
                        <span className="leading-normal">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Enroll */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => handleEnroll(program.id)}
                    disabled={isCurrent}
                    className={`w-full text-white font-extrabold text-xs py-3 rounded-xl transition shadow-sm ${
                      isCurrent 
                        ? 'bg-emerald-600 cursor-default shadow-none' 
                        : program.btnColor
                    }`}
                  >
                    {isCurrent ? t('✓ Currently Active', '✓ Mukutsatira Izi') : t('Enroll in Program', 'Lembetsani Pulogalamu')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
