// Self-assessment scoring
const submitAssessment = (req, res) => {
  const { answers } = req.body;
  const score = answers.reduce((sum, a) => sum + a, 0);
  let recommendation;
  if (score <= 10) recommendation = { level: 'Mild', program: 1, programName: 'Awareness Program' };
  else if (score <= 20) recommendation = { level: 'Moderate', program: 2, programName: 'Recovery Program' };
  else recommendation = { level: 'Severe', program: 3, programName: 'Intensive Support Program' };
  res.json({ score, recommendation });
};

const getRecommendation = (req, res) => {
  res.json({ message: 'Complete the assessment first to get your recommendation.' });
};

module.exports = { submitAssessment, getRecommendation };
