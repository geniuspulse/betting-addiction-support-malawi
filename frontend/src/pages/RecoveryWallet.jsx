import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import ProgressBar from '../components/ProgressBar';

export default function RecoveryWallet() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Load / Setup State
  const [betPerDay, setBetPerDay] = useState(() => Number(localStorage.getItem('basm_bet_per_day') || 3000));
  const [goalType, setGoalType] = useState(() => localStorage.getItem('basm_goal_name') || 'School Fees');
  const [savedAmount, setSavedAmount] = useState(() => Number(localStorage.getItem('basm_saved') || 15000));
  const [customGoal, setCustomGoal] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const goals = [
    { name: 'School Fees', amount: 45000, nameNy: 'Ndalama za Sukulu' },
    { name: 'Business Capital', amount: 100000, nameNy: 'Ndalama za Malonda' },
    { name: 'Rent', amount: 60000, nameNy: 'Renti' },
    { name: 'Food/Groceries', amount: 25000, nameNy: 'Zosowa Panyumba / Chakudya' },
  ];

  const getTargetAmount = () => {
    const selected = goals.find(g => g.name === goalType);
    if (selected) return selected.amount;
    return Number(localStorage.getItem('basm_goal_amount') || 50000);
  };

  const targetAmount = getTargetAmount();

  const handleSaveSetup = (e) => {
    e.preventDefault();
    localStorage.setItem('basm_bet_per_day', String(betPerDay));
    
    if (goalType === 'Custom') {
      localStorage.setItem('basm_goal_name', customGoal || 'Custom Goal');
      localStorage.setItem('basm_goal_amount', String(Number(customAmount) || 50000));
    } else {
      localStorage.setItem('basm_goal_name', goalType);
      const selected = goals.find(g => g.name === goalType);
      localStorage.setItem('basm_goal_amount', String(selected ? selected.amount : 50000));
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Equivalents calculators
  const equivalents = [
    { cost: 5000, labelEn: '1 Chitenje cloth', labelNy: 'Chitenje chimodzi' },
    { cost: 35000, labelEn: '1 Bag of Maize', labelNy: 'Thumba limodzi la Chimanga' },
    { cost: 45000, labelEn: '1 Term School Fees', labelNy: 'Ndalama za Sukulu za Term Imodzi' },
    { cost: 100000, labelEn: 'Small Business Capital', labelNy: 'Ndalama Yoyambira Malonda Aang\'ono' }
  ];

  // Milestone motivation
  const getMilestoneMessage = () => {
    if (savedAmount === 0) {
      return t("Every journey begins with a single step. Complete your first bet-free day to see savings start accumulating!", "Ulendo uliwonse umayambira ndi sitepe imodzi. Malizitsani tsiku lanu loyamba lopanda kubetcha kuti muwone ndalama zanu zikukwera!");
    }
    if (savedAmount < 15000) {
      return t("Excellent start! You already have enough to purchase small household goods. Keep going!", "Kuyambira kwabwino! Muli ndi ndalama kale zogulira zinthu zing'onozing'ono zapanyumba. Pitilizani!");
    }
    if (savedAmount < 45000) {
      return t("Incredible progress! You have now saved enough to support basic food supplies or community contributions.", "Kukula kodabwitsa! Mwasunga ndalama kale zogulira chakudya panyumba kapena thandizo la mudzi.");
    }
    if (savedAmount < 100000) {
      return t("Superb! You are on the verge of financing educational terms or expanding your micro-business opportunities.", "Zabwino kwambiri! Muli pafupi kukhala ndi ndalama zolipirira sukulu kapena kukulitsa bizinesi yanu yaying'ono.");
    }
    return t("Milestone Reached! You have built substantial real wealth that can fully fund entrepreneurship or significant security goals. Celebrate this victory!", "Mwakwaniritsa Cholinga! Mwapanga chuma chenicheni chomwe chitha kukulitsa bizinesi kapena zosowa zanu zazikulu. Kondwererani chipambano ichi!");
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 pb-24">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Title */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950">
            {t('Recovery Wallet & Goal Tracker', 'Thumba Lopulumutsa ndi Cholinga')}
          </h1>
          <p className="text-gray-500 text-sm">
            {t('See the physical value of your recovery in Malawian Kwacha.', 'Onani phindu lalikulu la kusiya kubetcha m’ndalama za Malawian Kwacha.')}
          </p>
        </div>

        {/* Big savings display card */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white text-center shadow-lg">
          <span className="text-xs uppercase tracking-widest font-black text-emerald-100">
            {t('TOTAL REAL WEALTH SAVED', 'NDALAMA ZONSE ZOMWE MWASUNGA')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-2">
            MK {savedAmount.toLocaleString()}
          </h2>
          <p className="text-xs text-emerald-50 mt-1 italic">
            {t('Calculated from your logged bet-free days', 'Zowerengedwa kutengera masiku anu opanda kubetcha')}
          </p>

          <div className="mt-6 max-w-md mx-auto">
            <ProgressBar
              value={savedAmount}
              max={targetAmount}
              labelLeft={`${t('Progress to:', 'Kupezeka ku:')} ${t(goalType, goalType)}`}
              labelRight={`MK ${savedAmount.toLocaleString()} / MK ${targetAmount.toLocaleString()}`}
              color="bg-white"
            />
          </div>

          <div className="mt-6 p-4 bg-emerald-700/30 rounded-2xl text-xs md:text-sm leading-relaxed border border-emerald-400/20">
            <strong>{t('Milestone Insight:', 'Uthenga wa Chipambano:')}</strong> {getMilestoneMessage()}
          </div>
        </div>

        {/* Equivalents Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-extrabold text-gray-900 text-base">
            {t("That's enough for...", "Ndalama zimenezo n'zokwanira kugulira...")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {equivalents.map((item, idx) => {
              const count = Math.floor(savedAmount / item.cost);
              const hasEnough = count >= 1;

              return (
                <div key={idx} className={`p-4 rounded-xl border flex items-center justify-between ${
                  hasEnough 
                    ? 'bg-emerald-50/50 border-emerald-200' 
                    : 'bg-gray-50/50 border-gray-100 opacity-60'
                }`}>
                  <div>
                    <div className="font-bold text-gray-900 text-xs md:text-sm">
                      {t(item.labelEn, item.labelNy)}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Cost: MK {item.cost.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    {hasEnough ? (
                      <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                        {count}x {t('Owned', 'Zopezeka')}
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-semibold">
                        {t('Pending', 'Inalibe')}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Setup Form */}
        <form onSubmit={handleSaveSetup} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
          <h3 className="font-extrabold text-gray-900 text-base">
            {t('Wallet Configuration', 'Kukonza Thumba Lanu')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bet per day */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase">
                {t('Est. Bet Amount Per Day (MWK)', 'Ndalama zomwe mumabetcha patsiku (MWK)')}
              </label>
              <input
                type="number"
                value={betPerDay}
                onChange={(e) => setBetPerDay(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Savings Goal Selector */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase">
                {t('Savings Goal', 'Cholinga Chanu')}
              </label>
              <select
                value={goalType}
                onChange={(e) => setGoalType(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-3 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {goals.map(g => (
                  <option key={g.name} value={g.name}>
                    {t(g.name, g.nameNy)} (MK {g.amount.toLocaleString()})
                  </option>
                ))}
                <option value="Custom">{t('Custom Goal', 'Kudzisankhira Cholinga Chanu')}</option>
              </select>
            </div>
          </div>

          {/* Custom Goal details */}
          {goalType === 'Custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 uppercase">
                  {t('Custom Goal Name', 'Dzina la Cholinga')}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Fertilizer, Laptop"
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 uppercase">
                  {t('Custom Amount (MWK)', 'Ndalama ya Cholinga (MWK)')}
                </label>
                <input
                  type="number"
                  placeholder="e.g. 150000"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs md:text-sm px-6 py-3 rounded-xl shadow transition"
            >
              {t('Save Configuration', 'Sungani Settings')}
            </button>
            
            {isSaved && (
              <span className="text-xs text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full">
                ✓ {t('Saved successfully!', 'Zasungidwa bwino!')}
              </span>
            )}
          </div>
        </form>

      </div>
    </div>
  );
}
