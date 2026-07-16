import React from 'react';
import { useLanguage } from '../LanguageContext';

export default function BreathingExercise() {
  const { t } = useLanguage();
  const [active, setActive] = React.useState(false);
  const [phase, setPhase] = React.useState(''); // 'In', 'Hold', 'Out'
  const [timer, setTimer] = React.useState(0);

  React.useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        setTimer((prev) => {
          const next = (prev + 1) % 19; // 4s inhale, 7s hold, 8s exhale = 19s total
          if (next < 4) {
            setPhase(t('Inhale', 'Usa Mfumo (Lowetsani)');
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
  }, [active, t]);

  const getScaleClass = () => {
    if (!active) return 'scale-100 bg-blue-500';
    if (timer < 4) return 'scale-150 bg-green-500 transition-transform duration-[4000ms] ease-in-out';
    if (timer < 11) return 'scale-150 bg-yellow-500 transition-colors duration-500';
    return 'scale-100 bg-blue-500 transition-transform duration-[8000ms] ease-in-out';
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md text-center max-w-sm mx-auto border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        {t('4-7-8 Breathing Guide', 'Chitsogozo Chotenga Mpweya (4-7-8)')}
      </h3>
      <p className="text-xs text-gray-500 mb-6">
        {t('Calm your mind and release the urge to bet.', 'Khazikitsani mtima pansi ndikugonjetsa chikhumbo chobetcha.')}
      </p>

      <div className="h-48 flex items-center justify-center relative mb-6">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-bold transition-all ${getScaleClass()}`}>
          <span className="text-sm select-none text-center px-2">
            {active ? phase : t('Start', 'Yambani')}
          </span>
        </div>
      </div>

      {active && (
        <div className="text-sm font-semibold text-gray-700 mb-4 h-6">
          {timer < 4 
            ? `${t('Inhale...', 'Usa mfumo...')} (${4 - timer}s)` 
            : timer < 11 
              ? `${t('Hold...', 'Gwirani...')} (${11 - timer}s)` 
              : `${t('Exhale...', 'Tulutsani...')} (${19 - timer}s)`}
        </div>
      )}

      <button
        onClick={() => {
          setActive(!active);
          if (!active) {
            setPhase(t('Inhale', 'Usa Mfumo (Lowetsani)'));
          }
        }}
        className={`px-6 py-2.5 rounded-full text-white font-semibold transition-colors shadow ${
          active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {active ? t('Stop Exercise', 'Imitsani') : t('Begin Breathing', 'Yambani Kupuma')}
      </button>
    </div>
  );
}
