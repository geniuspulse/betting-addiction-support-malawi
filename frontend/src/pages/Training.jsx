import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import TrainingCard from '../components/TrainingCard';

const TRACKS = [
  {
    id: 'agri',
    icon: '🐔',
    nameEn: 'Agribusiness Development',
    nameNy: 'Ulimi wa Bizinesi',
    incomeEn: 'Est. income: MK50,000-200,000/month',
    incomeNy: 'Ndalama: MK50,000-200,000/mwezi',
    durationEn: '6 Weeks',
    durationNy: 'Masabata 6',
    descEn: 'Learn highly profitable micro-farming models: modern poultry management, commercial fish farming, high-yield vegetable crops, and organic fertilizers.',
    descNy: 'Phunzirani kasamalidwe katsopano ka nkhuku, kusunga nsomba, ulimi wa ndiwo zamasamba zambiri, ndi kupanga feteleza wachikuda.'
  },
  {
    id: 'digital',
    icon: '💻',
    nameEn: 'Digital Skills & Freelancing',
    nameNy: 'Luso la Digito & Macheza',
    incomeEn: 'Est. income: MK80,000-500,000/month',
    incomeNy: 'Ndalama: MK80,000-500,000/mwezi',
    durationEn: '8 Weeks',
    durationNy: 'Masabata 8',
    descEn: 'Develop in-demand virtual skills. Learn graphic design, typing, online freelancing, digital marketing, and remote virtual assistant tasks from your phone or laptop.',
    descNy: 'Dziwani luso logwiritsa ntchito foni ndi kompyuta. Phunzirani kupanga zithunzi, kulemba pa intaneti, ndi kukopa makasitomala pa intaneti.'
  },
  {
    id: 'crafts',
    icon: '🪚',
    nameEn: 'Crafts & Vocational Trade',
    nameNy: 'Maluso a Manja & Zamitengo',
    incomeEn: 'Est. income: MK40,000-150,000/month',
    incomeNy: 'Ndalama: MK40,000-150,000/mwezi',
    durationEn: '10 Weeks',
    durationNy: 'Masabata 10',
    descEn: 'Practical hands-on training pathways: garment tailoring and design, micro-carpentry, local soap production, and basic welding skills.',
    descNy: 'Maluso othandiza monga kusoka zovala, kupanga mipando yamatabwa, kupanga sopo wapanyumba, ndi kuwotcherera zitsulo.'
  },
  {
    id: 'finance',
    icon: '📊',
    nameEn: 'Financial Literacy & Budgeting',
    nameNy: 'Kuzindikira Zachuma & Bajeti',
    incomeEn: 'Foundation for all businesses',
    incomeNy: 'Maziko a mabizinesi onse',
    durationEn: '4 Weeks',
    durationNy: 'Masabata 4',
    descEn: 'Master personal budgeting, debt restructuring, high-interest loan (katapila) avoidance, microfinance systems (banki m’khonde), and sustainable bookkeeping.',
    descNy: 'Dziwani kasamalidwe ka bajeti yakunyumba, kusiya ngongole za katapila, njira zogwirira ntchito za banki m’khonde, ndi kusunga maakaunti.'
  },
  {
    id: 'entrep',
    icon: '🏪',
    nameEn: 'Micro-Entrepreneurship',
    nameNy: 'Kuyambitsa Bizinesi',
    incomeEn: 'Est. income: MK30,000-200,000/month',
    incomeNy: 'Ndalama: MK30,000-200,000/mwezi',
    durationEn: '5 Weeks',
    durationNy: 'Masabata 5',
    descEn: 'Launch your first market stall or small neighborhood business. Learn inventory purchasing, market research, price negotiation, and customer relationship building.',
    descNy: 'Yambitsani malonda anu pamsika kapena pakhomo. Phunzirani kugula katundu wochepa, kufufuza makasitomala, ndi kukhazikitsa mitengo yabwino.'
  }
];

export default function Training() {
  const { t } = useLanguage();
  const [enrolledTracks, setEnrolledTracks] = useState(() => {
    return JSON.parse(localStorage.getItem('basm_enrolled_tracks') || '[]');
  });

  const handleEnroll = (trackId) => {
    if (enrolledTracks.includes(trackId)) return;
    const updated = [...enrolledTracks, trackId];
    localStorage.setItem('basm_enrolled_tracks', JSON.stringify(updated));
    setEnrolledTracks(updated);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 pb-24 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full uppercase tracking-wider">
            💡 {t('LIVELIHOOD ALTERNATIVES', 'MALUSO ANU ACHUMA')}
          </span>
          <h1 className="text-3xl font-black text-gray-950">
            {t('Build Your Future — Skills That Pay', 'Mverani Tsogolo Lanu — Maluso Omwe Amasunga')}
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            {t(
              "Many people bet because they feel financially hopeless or need fast cash. These training courses teach practical, sustainable skills to generate real income.",
              "Anthu ambiri amabetcha chifukwa choti amakhala opanda chiyembekezo chazachuma kapena kufuna ndalama zachangu. Maphunzirowa amakuphunzitsani maluso odalirika kuti mupange chuma chenicheni."
            )}
          </p>
        </div>

        {/* Why this matters callout */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-2xl p-5 shadow-sm flex items-start space-x-3">
          <div className="text-2xl mt-0.5">🌟</div>
          <div>
            <h4 className="font-extrabold text-blue-950 text-sm md:text-base">
              {t('Why Income Alternatives Matter', 'Chifukwa Chiyani Kupanga Chuma Kudzera Mwa Maluso Kuli Kofunika')}
            </h4>
            <p className="text-xs md:text-sm text-blue-900 mt-1 leading-relaxed">
              {t(
                "Aviator tickets and betting boards only offer mathematical losses designed to keep you broke. Moving your mental focus from 'luck' to 'skill' restores your financial independence and provides actual food on the table.",
                "Kubetcha pa mavidiyo ngati Aviator kapena pamasewera ena ndiko kutaya ndalama komwe kungokusiyani wosauka nthawi zonse. Kusintha maganizo anu kuchoka pa 'mwayi' ndikupita pa 'maluso' kumakutetezani ndikupatsani mwayi opeza chakudya chenicheni."
              )}
            </p>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TRACKS.map((track) => (
            <TrainingCard
              key={track.id}
              track={track}
              isEnrolled={enrolledTracks.includes(track.id)}
              onEnroll={handleEnroll}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
