import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';

const MYTHS = [
  {
    mythEn: "I am due for a win after losing so much.",
    mythNy: "Ndidzangowina posachedwa chifukwa ndataya zambiri.",
    factEn: "Every spin of the Aviator plane or bet ticket has the exact same mathematical probability of losing. The gaming algorithm does not keep track of your previous losses; it only generates profits for the platform.",
    factNy: "Kuzungulira kulikonse kwa aviator kuli ndi mwayi wofanana wotaya ndalama. Makina sangazindikire kuti mwataya ndalama kale; adapangidwa kuti mwanjira iliyonse eni makina apindule."
  },
  {
    mythEn: "I can recover my losses if I double my bet sizes.",
    mythNy: "Ndikhoza kubweza ndalama zanga ngati nditawonjezera ndalama zobetchera.",
    factEn: "Chasing losses by placing higher bets almost always leads to bigger and faster financial debts. It is a psychological trap that traps you into katapila loan cycles.",
    factNy: "Kuyesera kubweza ndalama zotayika kudzera mu kubetcha kwakukulu kumakupangitsani kukhala pangozi yangongole zazikulu za katapila nthawi yomweyo."
  },
  {
    mythEn: "Betting is easy money.",
    mythNy: "Kubetcha ndi njira yosavuta yopezera ndalama.",
    factEn: "Betting houses and Aviator platforms are designed by multi-million dollar corporations using complex mathematics to ensure the house always wins in the long run. The only way to win is to stop playing.",
    factNy: "Malo obetcha ndi aviator adamangidwa ndi makampani akuluakulu omwe amaseŵeretsa masamu opindulitsa iwo okha. Njira yokhayo yowinira ndikusiya kuseŵera."
  }
];

const SUCCESS_STORIES = [
  {
    name: 'Tadala from Zomba',
    storyEn: 'I lost my school fees twice to sports betting and had to borrow money from relatives. I was ashamed. Since enrolling in the 60-day recovery program on BASM and taking the agribusiness track, I now raise chickens and make MK60,000 every month.',
    storyNy: 'Ndataya ndalama za sukulu kawiri chifukwa cha kubetcha. Ndinali ndi manyazi kwambiri. Koma nditayamba pulogalamu ya masiku 60 pa BASM ndi phunziro la ulimi, panopo ndimaweta nkhuku ndipo ndimapeza MK60,000 mwezi uliwonse.'
  },
  {
    name: 'Grace from Lilongwe',
    storyEn: 'Virtual Aviator gaming was my secret addiction. I used to bet on my phone during work hours. I lost almost half my monthly salary every month. With the peer support groups and the Recovery Wallet, I have saved over MK200,000 this year.',
    storyNy: 'Kusewera Aviator chinali chinsinsi changa choipa. Ndinkabetcha pakati pa ntchito. Koma kudzera m’magulu a anzanga a BASM ndi Thumba Lathu Lopulumutsa, ndasunga ndalama zopitilira MK200,000 chaka chino.'
  },
  {
    name: 'James from Mzuzu',
    storyEn: 'I used to believe I could make a living out of sports prediction tips. I was in deep debt. The professional counselling sessions on BASM helped me realize my emotional triggers. Today, I am 120 days bet-free and learning financial literacy.',
    storyNy: 'Ndinkakhulupirira kuti nditha kupeza moyo wabwino pamasewera ochezera odds. Koma kudzera m\'macheza ndi alangizi odalirika, tsopano ndili ndi masiku 120 popanda kubetcha ndipo ndikuphunzira kasamalidwe ka chuma.'
  }
];

const ARTICLES = [
  {
    titleEn: "How Gambling Alters Brain Chemistry",
    titleNy: "Momwe Kubetcha Kumasokoneza Ubongo wanu",
    readEn: "Sports betting and virtual slots trigger a release of dopamine similar to drugs. This chemical rush tricks your brain into repeating the behavior, regardless of financial losses. Rebuilding takes time, but your brain chemistry can fully recover with rest and therapy.",
    readNy: "Masewera ogulira amapangitsa ubongo wanu kutulutsa madzi omwe amakusangalatsani kwambiri ngati mukumwa mankhwala osokoneza bongo. Izi zimakuchititsani kufuna kubwerera ngakhale mutataya ndalama. Ubongo ukhoza kuchira mukadzisunga."
  },
  {
    titleEn: "Avoiding the Katapila Loan Trap",
    titleNy: "Kupewa Msampha Wangongole za Katapila",
    readEn: "Taking microloans or high-interest loans (katapila) to recover betting losses is a severe financial trap. Always communicate with family members early and seek credit consultation services from certified counsellors on BASM before borrowing.",
    readNy: "Kutenga katapila kuti mubweze ndalama zotayika ndi msampha woipa kwambiri. Lumikizanani ndi alangizi athu a BASM kuti akuthandizeni kukonza ngongole zanu musanatenge katapila."
  }
];

export default function Library() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('Myths');

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 pb-24 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Title */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950">
            {t('Education & Recovery Library', 'Laibulale ya Chidziwitso ndi Kuchira')}
          </h1>
          <p className="text-gray-500 text-sm">
            {t('Equip yourself with factual information, worksheets, and inspiring recovery success stories.', 'Dzipatseni mphamvu zodziwa zowona m’malo mwa zikhulupiriro zolakwika zomwe zingakusiyeni osauka.')}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { id: 'Myths', label: t('Myths Busted', 'Zikhulupiriro') },
            { id: 'Stories', label: t('Success Stories', 'Zochitika Zolakwika') },
            { id: 'Articles', label: t('Articles', 'Nkhani') },
            { id: 'Worksheets', label: t('Worksheets', 'Zochita') }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-center text-xs md:text-sm font-bold transition border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        {activeTab === 'Myths' && (
          <div className="space-y-4">
            {MYTHS.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-red-500 text-sm font-bold block uppercase tracking-widest">{t('❌ MYTH:', '❌ CHIKHULUPIRIRO:')}</span>
                  <h4 className="font-extrabold text-gray-900 text-sm md:text-base">
                    "{t(item.mythEn, item.mythNy)}"
                  </h4>
                </div>
                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                  <span className="text-emerald-700 text-xs font-bold block uppercase tracking-widest mb-1">✓ {t('THE MATHEMATICAL FACT:', 'KUGWIRIZANA NDICHOWONA:')}</span>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium">
                    {t(item.factEn, item.factNy)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Stories' && (
          <div className="space-y-4">
            {SUCCESS_STORIES.map((story, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex items-start space-x-4">
                <div className="text-3xl">🌟</div>
                <div className="space-y-1">
                  <h4 className="font-black text-gray-900 text-sm md:text-base">
                    {story.name}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed italic">
                    "{t(story.storyEn, story.storyNy)}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Articles' && (
          <div className="space-y-4">
            {ARTICLES.map((art, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-2">
                <h4 className="font-extrabold text-gray-950 text-sm md:text-base">
                  {t(art.titleEn, art.titleNy)}
                </h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {t(art.readEn, art.readNy)}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Worksheets' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-gray-900 text-base">{t('Practical Worksheets', 'Zolemba ndi Zofufuza')}</h3>
            <p className="text-xs text-gray-500">
              {t('Download and print worksheets to outline your goals and recovery triggers.', 'Sankhani ndi kupirinta mayeso kapena masamba awa kuti muzitsatira zomwe zikukuvutsani pakhomo panu.')}
            </p>

            <div className="space-y-3">
              {[
                { name: t('Trigger Mapping Worksheet', 'Kudzilembera Zomwe Zimakusokonezani'), size: '2.4 MB' },
                { name: t('Household Budget Planner (No betting)', 'Kukonza Bajeti Yanyumba Popanda Kubetcha'), size: '1.8 MB' },
                { name: t('Debt Restructuring Worksheet', 'Ndondomeko Yokonzanso Ngongole'), size: '3.1 MB' }
              ].map((sheet, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">📄</span>
                    <div>
                      <span className="text-xs font-bold text-gray-800 block">{sheet.name}</span>
                      <span className="text-[10px] text-gray-400">PDF • {sheet.size}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(t('Downloading file...', 'Mukutsitsa chikalatachi...'))}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    {t('Download', 'Tsitsani')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
