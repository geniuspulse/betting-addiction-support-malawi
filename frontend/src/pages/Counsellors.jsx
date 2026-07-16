import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import CounsellorCard from '../components/CounsellorCard';

const COUNSELLORS = [
  {
    id: 1,
    name: 'Mrs. Tadala Phiri, MSc',
    specializationEn: 'Clinical Addiction Specialist',
    specializationNy: 'Katswiri Wolimbana ndi Zizolowezi zoipa',
    languages: ['English', 'Chichewa'],
    availabilityEn: 'Mon - Fri (8:00 AM - 4:00 PM)',
    availabilityNy: 'Lolemba - Lachisanu (8:00 AM - 4:00 PM)',
    experience: '12 Years'
  },
  {
    id: 2,
    name: 'Mr. James Gondwe, BA',
    specializationEn: 'Youth Cognitive Behavioral Therapy',
    specializationNy: 'Aupangiri Achichepere ndi Malingaliro',
    languages: ['English', 'Chichewa', 'Tumbuka'],
    availabilityEn: 'Tue, Wed, Sat (10:00 AM - 6:00 PM)',
    availabilityNy: 'Lachiwiri, Lachitatu, Loweruka (10:00 AM - 6:00 PM)',
    experience: '8 Years'
  },
  {
    id: 3,
    name: 'Sister Grace Banda',
    specializationEn: 'Family Rehabilitation & Debt Re-building',
    specializationNy: 'Uphangiri wa Mabanja ndi Kukonza Ngongole',
    languages: ['English', 'Chichewa'],
    availabilityEn: 'Mon, Thu, Fri (9:00 AM - 5:00 PM)',
    availabilityNy: 'Lolemba, Lachinayi, Lachisanu (9:00 AM - 5:00 PM)',
    experience: '15 Years'
  }
];

export default function Counsellors() {
  const { t } = useLanguage();
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingType, setBookingType] = useState('chat');
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const openBookingModal = (counsellor) => {
    setSelectedCounsellor(counsellor);
    setIsModalOpen(true);
    setBookedSuccess(false);
  };

  const handleBookSession = (e) => {
    e.preventDefault();
    if (!bookingDate) {
      alert(t('Please choose a date.', 'Chonde sankhani tsiku.'));
      return;
    }
    setBookedSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedCounsellor(null);
      setBookedSuccess(false);
    }, 3000);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 pb-24 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1 className="text-3xl font-black text-gray-950">
            {t('Professional Malawian Counsellors', 'Aupangiri ndi Alangizi Odalirika')}
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            {t(
              'Confidential, non-judgmental support from clinical psychologists and recovery coaches. Entirely free and safe.',
              'Thandizo lakuchipatala lazachinsinsi kwambiri lochokera kwa alangizi odziwa bwino ntchito. Zaulere komanso zotetezeka.'
            )}
          </p>
        </div>

        {/* Crisis Warning Banner */}
        <div className="bg-red-50 border-l-4 border-red-600 rounded-r-2xl p-5 shadow-sm">
          <h4 className="font-extrabold text-red-950 text-sm md:text-base">
            🚨 {t('Immediate Crisis Support', 'Thandizo la Changu pa Mavuto')}
          </h4>
          <p className="text-xs md:text-sm text-red-800 mt-1 leading-relaxed">
            {t(
              'If you are in deep crisis, suffering high anxiety, or having immediate thoughts of self-harm, please contact our emergency hotline immediately at 547 (Malawi Suicide Prevention Helpline) or call Saint John of God Clinic at +265 (0) 1 311 123.',
              'Ngati mukukumana ndi mavuto akulu a m\'maganizo kapena mukuganiza zodzivulaza, chonde imbani foni ya changu pa nambala iyi: 547 (Malawi Suicide Prevention Helpline) kapena Saint John of God pachifundo pa +265 (0) 1 311 123.'
            )}
          </p>
        </div>

        {/* Counsellor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COUNSELLORS.map((counsellor) => (
            <CounsellorCard
              key={counsellor.id}
              counsellor={counsellor}
              onBook={openBookingModal}
            />
          ))}
        </div>

        {/* AI Support Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2">
            <span className="inline-block bg-indigo-500/50 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {t('ALWAYS AVAILABLE', 'NTHAWI ZONSE IPO')}
            </span>
            <h3 className="font-black text-lg md:text-xl">
              {t('24/7 AI Companion Support', 'Kucheza ndi AI Companion Nthawi Iliyonse')}
            </h3>
            <p className="text-xs md:text-sm text-blue-100 max-w-xl">
              {t(
                'Available anytime day or night for guided breathing, cognitive exercise distractions, or instant supportive dialogue. We ensure you are always connected to human experts when needed.',
                'Ipo usiku ndi usana kuti ikuthandizeni kupuma mofatsa, kusokoneza maganizo ogulira, kapena kuchezera mwachinsinsi. Tikulumikizani ndi alangizi athu nthawi iliyonse.'
              )}
            </p>
          </div>
          <button
            onClick={() => alert(t('AI Companion is initialized and waiting in your local chat.', 'Chilimbikitso cha AI chakonzedwa kale ndipo chikudikira pafoni yanu.'))}
            className="w-full md:w-auto bg-white text-indigo-700 hover:bg-blue-50 font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all flex-shrink-0"
          >
            🤖 {t('Chat with AI Support', 'Chezani ndi AI')}
          </button>
        </div>

        {/* Booking Modal */}
        {isModalOpen && selectedCounsellor && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
              
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>

              {!bookedSuccess ? (
                <form onSubmit={handleBookSession} className="space-y-4">
                  <h3 className="text-lg font-black text-gray-900">
                    {t('Book Support Session', 'Sankhani Tsiku la Upangiri')}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {t('With', 'Ndi:')} <strong>{selectedCounsellor.name}</strong>
                  </p>

                  {/* Session Type */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase">
                      {t('Session Type', 'Mtundu wa Upangiri')}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'chat', label: '💬 Chat', labelNy: '💬 Macheza' },
                        { id: 'video', label: '📹 Video', labelNy: '💬 Vidiyo' },
                        { id: 'group', label: '👥 Group', labelNy: '👥 Gulu' }
                      ].map(type => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setBookingType(type.id)}
                          className={`py-2 px-3 border rounded-xl text-xs font-bold text-center transition ${
                            bookingType === type.id
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-white hover:bg-slate-50 text-gray-700 border-gray-200'
                          }`}
                        >
                          {t(type.label, type.labelNy)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date Picker */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase">
                      {t('Choose Date', 'Sankhani Tsiku')}
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div className="bg-blue-50 text-[11px] text-blue-800 p-3 rounded-lg leading-relaxed">
                    ℹ️ {t('After confirmation, you will receive an SMS link to join the session securely & anonymously.', 'Mutatsimikiza, mulandila uthenga pa foni muli mulalo otetezeka olowerera nawo m’macheza mwachinsinsi.')}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3 rounded-xl shadow-md transition"
                  >
                    {t('Confirm Booking', 'Tsimikizani Nthawi')}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-3">
                  <span className="text-4xl">📅</span>
                  <h3 className="font-extrabold text-green-950 text-base">
                    {t('Booking Confirmed!', 'Zasungidwa Bwino!')}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {t('Your session has been successfully booked. Check your SMS for access links.', 'Msonkhano wanu wasungidwa kale. Yang\'anani pa foni yanu kuti mulandire maulalo.')}
                  </p>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
