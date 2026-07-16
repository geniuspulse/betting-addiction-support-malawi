const Assessment = require('../models/Assessment');

// Helper to calculate score and categorize risk
const calculateRisk = (answers) => {
  // Simple algorithm: Sum the values of the answers
  // Assumes answers is an array of objects: { questionId: number, answerValue: number } (values: 0 to 3 or similar)
  let totalScore = 0;
  answers.forEach((ans) => {
    totalScore += Number(ans.answerValue || 0);
  });

  let riskCategory = 'low';
  let recoveryPlan = {};

  if (totalScore >= 8) {
    riskCategory = 'high';
    recoveryPlan = {
      category: 'High Risk Recovery Plan',
      bilingual_title: 'Zosankha Zodziletsa Kwambiri (High Risk Actions)',
      description: 'You are showing signs of severe betting addiction. Immediate action and human intervention are highly recommended.',
      chichewa_description: 'Mukuwonetsa zizindikiro zovuta kwambiri zosokonezeka ndi juga. Mukulimbikitsidwa kupeza chithandizo mwachangu.',
      steps: [
        'Call our urgent mental health helpline or local counselor immediately.',
        'Install gambling blockers on all your digital devices.',
        'Entrust your financial accounts/mobile money access to a trusted family member or friend (Grace Phiri or Chisomo Mwale).',
        'Join the BASM Community Support Groups immediately.',
        'Enroll in our free Financial Literacy and Agribusiness programs to rebuild income streams.',
      ],
      escalationContact: 'Malawi National Helpline: Call 116 or contact our specialized BASM counselor (e.g., James Banda on +265 888 123 456).'
    };
  } else if (totalScore >= 4) {
    riskCategory = 'moderate';
    recoveryPlan = {
      category: 'Moderate Risk Recovery Plan',
      bilingual_title: 'Zosankha zodziteteza (Moderate Risk Actions)',
      description: 'You are showing early warning signs of harmful gambling behavior. Act now to prevent escalation.',
      chichewa_description: 'Mukuwonetsa zizindikiro zoyambilira zovulaza ndi juga. Chitapo kanthu mwachangu kuti zinthu zisafike poipa.',
      steps: [
        'Set up your Recovery Wallet right away to track and redirect daily bet amounts.',
        'Commit to daily check-ins on BASM to monitor your mood and urges.',
        'Access the Recovery Library daily to debunk myths like "I am due for a win".',
        'Attend a community peer support group weekly.'
      ]
    };
  } else {
    riskCategory = 'low';
    recoveryPlan = {
      category: 'Low Risk Prevention Plan',
      bilingual_title: 'Zomwe mungachite kuti mudziteteze (Low Risk Prevention Actions)',
      description: 'Your betting risk is currently low. Keep practicing self-awareness and safe spending habits.',
      chichewa_description: 'Kuthekera kosokonezeka ndi juga ndikochepa pano. Pitirizani kudziletsa komanso kusamalira ndalama zanu bwino.',
      steps: [
        'Read the BASM Recovery Library articles regarding how betting companies make money.',
        'Use the free budgeting tips under our Financial Literacy training program.',
        'Monitor your leisure activities to ensure betting remains non-existent or strictly controlled.'
      ]
    };
  }

  return { totalScore, riskCategory, recoveryPlan };
};

exports.submitAssessment = async (req, res) => {
  try {
    const { answers } = req.body;
    // Fallback user ID for demo purposes or read from req.user when auth middleware is integrated
    const userId = req.user ? req.user.id : '11111111-1111-1111-1111-111111111111';

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Answers must be a valid array' });
    }

    const { totalScore, riskCategory, recoveryPlan } = calculateRisk(answers);

    const assessment = await Assessment.create({
      userId,
      answers,
      score: totalScore,
      riskCategory,
      recoveryPlan,
    });

    return res.status(201).json({
      message: 'Assessment submitted successfully!',
      assessment,
    });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAssessmentHistory = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : '11111111-1111-1111-1111-111111111111';
    const history = await Assessment.findAll({
      where: { userId },
      order: [['created_at', 'DESC']],
    });

    return res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching assessment history:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
