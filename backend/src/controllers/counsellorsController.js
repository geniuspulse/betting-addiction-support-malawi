const counsellors = [
  {
    id: 1,
    name: 'Dr. Grace Phiri',
    specialization: 'Behavioral Addiction & CBT',
    experience: '8 years',
    languages: ['English', 'Chichewa'],
    available: true,
    bio: 'Dr. Phiri specializes in cognitive behavioral therapy for gambling and betting addiction, with a focus on financial recovery.'
  },
  {
    id: 2,
    name: 'Mr. James Banda',
    specialization: 'Family Therapy & Crisis Intervention',
    experience: '5 years',
    languages: ['English', 'Chichewa', 'Tumbuka'],
    available: true,
    bio: 'James helps individuals and families navigate the impact of betting addiction through structured family therapy sessions.'
  },
  {
    id: 3,
    name: 'Ms. Chisomo Mwale',
    specialization: 'Youth Addiction & Peer Support',
    experience: '4 years',
    languages: ['English', 'Chichewa'],
    available: false,
    bio: 'Chisomo focuses on young adults and teens affected by sports betting culture, offering relatable and youth-friendly support.'
  }
];

const getCounsellors = (req, res) => res.json(counsellors);
const getCounsellor = (req, res) => {
  const c = counsellors.find(c => c.id === parseInt(req.params.id));
  if (!c) return res.status(404).json({ error: 'Counsellor not found' });
  res.json(c);
};
const bookSession = (req, res) => {
  const { date, type } = req.body; // type: 'chat' | 'video' | 'group'
  res.json({ message: `Session booked with counsellor ${req.params.id}`, date, type });
};

module.exports = { getCounsellors, getCounsellor, bookSession };
