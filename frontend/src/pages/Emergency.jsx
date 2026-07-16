import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';

export default function Emergency() {
  const { t } = useLanguage();
  const [activeBreathing, setActiveBreathing] = useState(false);
  const [phase, setPhase] = useState('Inhale');
  const [timer, setTimer] = useState(0);
  const [showSelfHarmCrisis, setShowSelfHarmCrisis] = useState(false);

  React.useEffect(() => {
    let interval = null;
    if (activeBreathing) {
      interval = setInterval(() => {
        setTimer((prev) => {
          const next = (prev + 1) % 19;
          if (next < 4) {
            setPhase(t('Inhale', 'Usa Mfumo (Lowetsani)'));
          } else if (next < 11) {
            setPhase(t('Hold', 'Gwirani Mfumo'));
          } else {
            setPhase(t('Exhale', 'Gomera (Tulutsani)'));
          }
          return next;
        });
      }, 1000);
    } else {
      setPhase('');
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [activeBreathing, t]);

  const getScaleClass = () => {
    if (!activeBreathing) return 'scale-100 bg-emerald-500';
    if (timer < 4) return 'scale-150 bg-green-500 transition-transform duration-[4000ms] ease-in-out';
    if (timer < 11) return 'scale-150 bg-amber-500 transition-colors duration-500';
    return 'scale-100 bg-emerald-500 transition-transform duration-[8000ms] ease-in-out';
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-teal-50 min-h-screen py-12 px-4 flex items-center justify-center text-center">
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 border border-teal-100 shadow-xl space-y-8">
        
        {/* Calming Messages */}
        <div className="space-y-2">
          <span className="text-3xl">🌸</span>
          <h1 className="text-2xl md:text-3xl font-black text-teal-900 leading-tight">
            {t('You are safe. You are strong. This will pass.', 'Muli otetezeka. Muli ndi mphamvu. Izi zidutsa.')}
          </h1>
          <p className="text-xs md:text-sm text-gray-500 max-w-sm mx-auto">
            {t(
              "Addiction is a strong storm, but you are the mountain. Take a slow moment here to calm your mind.",
              "Zizolowezi ndi namondwe wamphamvu, koma inu ndinu phiri. Dzilimbikitseni ndikukhalitsa chete pang'ono."
            )}
          </p>
        </div>

        {/* Breathing Animation circle */}
        <div className="py-6 flex flex-col items-center justify-center">
          <div className="h-44 flex items-center justify-center relative">
            <div className={`w-28 h-24 rounded-full flex items-center justify-center text-white font-extrabold text-sm transition-all ${getScaleClass()}`}>
              <span className="select-none text-center px-3">
                {activeBreathing ? phase : t('Start Calm', 'Yambani')}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setActiveBreathing(!activeBreathing);
              if (!activeBreathing) {
                setPhase(t('Inhale', 'Lowetsani Mpweya'));
              }
            }}
            className="mt-6 px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-full transition shadow"
          >
            {activeBreathing ? t('Stop Breathing', 'Imitsani Kupuma') : t('Begin Calming Breath', 'Yambani Kupuma Mofatsa')}
          </button>
        </div>

        {/* Quick Emergency Contacts */}
        <div className="space-y-3 text-left">
          <h3 className="font-extrabold text-gray-900 text-sm uppercase tracking-wider text-center mb-1">
            📞 {t('Malawi Emergency Contacts', 'Manambala a Changu ku Malawi')}
          </h3>
          
          <div className="space-y-2">
            <div className="p-3 bg-slate-50 border border-gray-100 rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-gray-800 block">{t('Malawi Suicide Prevention Helpline', 'Uphangiri Wopewera Kudzivulaza')}</span>
                <span className="text-gray-500">Free Toll-free Number</span>
              </div>
              <a href="tel:547" className="bg-red-600 text-white font-bold px-3 py-1.5 rounded-lg text-[10px]">
                CALL 547
              </a>
            </div>

            <div className="p-3 bg-slate-50 border border-gray-100 rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-gray-800 block">{t('Saint John of God Mental Health', 'Saint John of God (Mzuzu/Lilongwe)')}</span>
                <span className="text-gray-500">Psychiatric Helpline Support</span>
              </div>
              <a href="tel:+2651311123" className="bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg text-[10px]">
                CALL +265 1 311 123
              </a>
            </div>

            <div className="p-3 bg-slate-50 border border-gray-100 rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-gray-800 block">{t('Trusted Peer Support Lead', 'Mnzanu Wodalirika')}</span>
                <span className="text-gray-500">Immediate peer coordinator</span>
              </div>
              <a href="tel:+265888123456" className="bg-slate-700 text-white font-bold px-3 py-1.5 rounded-lg text-[10px]">
                CALL +265 888 123 456
              </a>
            </div>
          </div>
        </div>

        {/* Self-harm Escalation section */}
        <div className="pt-2 border-t border-gray-100">
          {!showSelfHarmCrisis ? (
            <button
              onClick={() => setShowSelfHarmCrisis(true)}
              className="text-xs text-red-600 font-bold hover:underline"
            >
              ⚠️ {t('I am having thoughts of self-harm', 'Ndikuganiza zodzivulaza kapena kufuna kutha moyo wanga')}
            </button>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-left space-y-3 animate-in fade-in duration-200">
              <h4 className="font-bold text-red-950 text-xs md:text-sm">
                🚨 {t('PLEASE REACH OUT — YOU ARE VALUED', 'CHONDE IMBILETSANI — MULI OFUNIKA')}
              </h4>
              <p className="text-[11px] text-red-800 leading-relaxed">
                {t(
                  "We want you here. Addiction can feel completely overwhelming, but there is always a path forward. Do not carry this alone. Please call 547 immediately, or go to Saint John of God Clinic in Mzuzu or Lilongwe, or the psychiatric unit at Zomba Mental Hospital.",
                  "Tikufuna mukhale nafe. Chizolowezi chikhoza kukhala chopweteka koma pali njira yotulukira nthawi zonse. Musayende nokha. Chonde imbani 547 nthawi yomweyo, kapena mukafike pachipatala chachikulu kapena Saint John of God m'dera lanu."
                )}
              </p>
              <button
                onClick={() => setShowSelfHarmCrisis(false)}
                className="text-[10px] text-gray-500 font-semibold underline"
              >
                {t('Close notification', 'Tsekani uthenga')}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
