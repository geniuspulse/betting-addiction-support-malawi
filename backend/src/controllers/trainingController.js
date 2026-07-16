const TrainingEnrollment = require('../models/TrainingEnrollment');

const TRAINING_PROGRAMS = [
  {
    id: 'agribusiness_1',
    name: 'Agribusiness Essentials',
    category: 'Agribusiness',
    duration_weeks: 6,
    skills_gained: ['Poultry management', 'Fish farming pond setup', 'Irrigated vegetable growing', 'Market selling'],
    estimated_income_mwk: 'MK150,000 - MK500,000 / month',
    lessons: [
      { id: 'ab_l1', title: 'Introduction to Small-Scale Farming in Malawi', duration: '20 mins' },
      { id: 'ab_l2', title: 'Poultry Feed & Disease Prevention (Local & Hybrid)', duration: '30 mins' },
      { id: 'ab_l3', title: 'Vegetable Gardening: Tomatoes, Cabbages, and Onions', duration: '25 mins' },
      { id: 'ab_l4', title: 'Fish Pond Design & Water Management', duration: '35 mins' },
      { id: 'ab_l5', title: 'Budgeting Seeds, Fertilizer, and Farm Inputs', duration: '20 mins' },
      { id: 'ab_l6', title: 'Accessing Local Markets and Wholesalers', duration: '30 mins' },
    ]
  },
  {
    id: 'digital_skills_1',
    name: 'Digital Skills & Microwork',
    category: 'Digital Skills',
    duration_weeks: 4,
    skills_gained: ['Online freelancing', 'Graphic design (Canva)', 'Data entry', 'Smart-phone business marketing'],
    estimated_income_mwk: 'MK100,000 - MK300,000 / month',
    lessons: [
      { id: 'ds_l1', title: 'The Gig Economy: Introduction to Microwork', duration: '15 mins' },
      { id: 'ds_l2', title: 'Creating Accounts and Profiles on Freelance Platforms', duration: '25 mins' },
      { id: 'ds_l3', title: 'Mobile Graphic Design using Free Smartphone Apps', duration: '30 mins' },
      { id: 'ds_l4', title: 'Data Entry Principles and Accuracy', duration: '20 mins' },
      { id: 'ds_l5', title: 'Advertising Your Skills Locally on WhatsApp Business', duration: '20 mins' },
    ]
  },
  {
    id: 'crafts_trade_1',
    name: 'Crafts & Technical Trade',
    category: 'Crafts & Trade',
    duration_weeks: 8,
    skills_gained: ['Basic tailoring & design', 'Carpentry joinery', 'Handmade soap production'],
    estimated_income_mwk: 'MK120,000 - MK400,000 / month',
    lessons: [
      { id: 'ct_l1', title: 'Introduction to Sewing Machines and Fabrics', duration: '30 mins' },
      { id: 'ct_l2', title: 'Stitching and Creating Basic Chitenje Outfits', duration: '40 mins' },
      { id: 'ct_l3', title: 'Essential Carpentry Tools and Joint Making', duration: '35 mins' },
      { id: 'ct_l4', title: 'Handmade Soap & Detergent Formulation (Safe Methods)', duration: '25 mins' },
      { id: 'ct_l5', title: 'Pricing Crafts and Finding Retail Partners', duration: '20 mins' },
    ]
  },
  {
    id: 'financial_literacy_1',
    name: 'Financial Literacy & MFI Basics',
    category: 'Financial Literacy',
    duration_weeks: 3,
    skills_gained: ['Budgeting', 'Debt management', 'Microfinance Institution (MFI) survival'],
    estimated_income_mwk: 'Saves MK50,000+ / month by avoiding predatory loans',
    lessons: [
      { id: 'fl_l1', title: 'Income vs. Expense: How to Budget in Kwacha', duration: '15 mins' },
      { id: 'fl_l2', title: 'The Danger of Katapila (Predatory Money Lenders)', duration: '20 mins' },
      { id: 'fl_l3', title: 'Understanding VSLA (Village Savings and Loans Associations)', duration: '25 mins' },
      { id: 'fl_l4', title: 'How to Choose a Fair Microfinance Institution', duration: '20 mins' },
    ]
  },
  {
    id: 'entrepreneurship_1',
    name: 'Entrepreneurship & Micro-Enterprise',
    category: 'Entrepreneurship',
    duration_weeks: 5,
    skills_gained: ['Starting a market stall', 'Managing inventory', 'Customer retention'],
    estimated_income_mwk: 'MK80,000 - MK250,000 / month',
    lessons: [
      { id: 'en_l1', title: 'Finding Your Business Idea (What do people need?)', duration: '20 mins' },
      { id: 'en_l2', title: 'Calculating Start-up Costs and Seed Capital', duration: '25 mins' },
      { id: 'en_l3', title: 'Managing Stock, Inventory, and Profit Margins', duration: '30 mins' },
      { id: 'en_l4', title: 'Customer Service: Why Malawians Buy from Friendly Shops', duration: '20 mins' },
      { id: 'en_l5', title: 'Separating Business Money from Personal Money', duration: '25 mins' },
    ]
  }
];

exports.getPrograms = async (req, res) => {
  try {
    return res.status(200).json(TRAINING_PROGRAMS);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getProgramById = async (req, res) => {
  try {
    const programId = req.params.id;
    const program = TRAINING_PROGRAMS.find(p => p.id === programId);

    if (!program) {
      return res.status(404).json({ error: 'Training program not found' });
    }

    return res.status(200).json(program);
  } catch (error) {
    console.error('Error fetching program details:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.enrollInProgram = async (req, res) => {
  try {
    const programId = req.params.id;
    const userId = req.user ? req.user.id : '11111111-1111-1111-1111-111111111111';

    const program = TRAINING_PROGRAMS.find(p => p.id === programId);
    if (!program) {
      return res.status(404).json({ error: 'Training program not found' });
    }

    // Check if enrollment already exists
    let enrollment = await TrainingEnrollment.findOne({
      where: { userId, programId }
    });

    if (enrollment) {
      if (enrollment.status === 'enrolled') {
        return res.status(400).json({ error: 'You are already enrolled in this program.' });
      } else {
        // Re-enroll
        enrollment.status = 'enrolled';
        await enrollment.save();
      }
    } else {
      enrollment = await TrainingEnrollment.create({
        userId,
        programId,
        lessonsCompleted: [],
        status: 'enrolled',
      });
    }

    return res.status(201).json({
      message: `Enrolled successfully in ${program.name}!`,
      enrollment,
    });
  } catch (error) {
    console.error('Error enrolling in program:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : '11111111-1111-1111-1111-111111111111';

    const enrollments = await TrainingEnrollment.findAll({
      where: { userId },
    });

    const progressList = enrollments.map(enrollment => {
      const program = TRAINING_PROGRAMS.find(p => p.id === enrollment.programId);
      if (!program) return null;

      const totalLessons = program.lessons.length;
      const completedCount = enrollment.lessonsCompleted.length;
      const percentComplete = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

      return {
        enrollmentId: enrollment.id,
        programId: program.id,
        programName: program.name,
        category: program.category,
        status: enrollment.status,
        lessonsCompleted: enrollment.lessonsCompleted,
        totalLessons,
        completedCount,
        percentComplete,
      };
    }).filter(p => p !== null);

    return res.status(200).json(progressList);
  } catch (error) {
    console.error('Error fetching training progress:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
