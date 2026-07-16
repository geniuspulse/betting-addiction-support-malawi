const programs = [
  {
    id: 1,
    name: 'Awareness Program',
    duration: 30,
    level: 'Mild',
    description: 'For early-stage or mild addiction. Daily check-ins, reading materials, journaling prompts, and weekly group sessions.',
    features: ['Daily check-ins', 'Journaling prompts', 'Weekly group sessions', 'Trigger identification exercises']
  },
  {
    id: 2,
    name: 'Recovery Program',
    duration: 60,
    level: 'Moderate',
    description: 'For moderate addiction. One-on-one counselling, financial recovery planning, and accountability partner matching.',
    features: ['Everything in Awareness', 'One-on-one counselling sessions', 'Financial recovery planning', 'Accountability partner']
  },
  {
    id: 3,
    name: 'Intensive Support Program',
    duration: 90,
    level: 'Severe',
    description: 'For severe addiction. Daily counsellor check-ins, crisis helpline access, family involvement sessions.',
    features: ['Everything in Recovery', 'Daily counsellor check-ins', 'Crisis helpline access', 'Family involvement sessions', 'Relapse prevention plan']
  }
];

const getPrograms = (req, res) => res.json(programs);
const getProgram = (req, res) => {
  const program = programs.find(p => p.id === parseInt(req.params.id));
  if (!program) return res.status(404).json({ error: 'Program not found' });
  res.json(program);
};
const enrollUser = (req, res) => res.json({ message: `Enrolled in program ${req.params.id}`, userId: req.user?.email });
const getUserProgress = (req, res) => res.json({ programId: req.params.id, day: 1, completedTasks: [], badges: [] });

module.exports = { getPrograms, getProgram, enrollUser, getUserProgress };
