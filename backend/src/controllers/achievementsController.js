const Achievement = require('../models/Achievement');
const CheckIn = require('../models/CheckIn');
const Wallet = require('../models/Wallet');
const TrainingEnrollment = require('../models/TrainingEnrollment');

const ALL_ACHIEVEMENTS = [
  { id: 'streak_1', title: '1 Day Bet-Free', description: 'Complete 1 full day without betting.' },
  { id: 'streak_3', title: '3 Days Bet-Free', description: 'Reach a streak of 3 consecutive bet-free days!' },
  { id: 'streak_7', title: '7 Days Bet-Free', description: 'Amazing! 1 week completely free of gambling.' },
  { id: 'streak_14', title: '14 Days Bet-Free', description: '2 weeks! You are building real resilience.' },
  { id: 'streak_30', title: '30 Days Bet-Free', description: '1 Month! A huge milestone in Malawian recovery.' },
  { id: 'streak_60', title: '60 Days Bet-Free', description: '2 Months bet-free! Your brain is resetting.' },
  { id: 'streak_100', title: '100 Days Bet-Free', description: 'Centurion status! Complete recovery is within reach.' },
  { id: 'first_checkin', title: 'First Check-in', description: 'Log your very first daily status check-in.' },
  { id: 'set_savings_goal', title: 'Set Savings Goal', description: 'Configure your Recovery Wallet daily amount and goal.' },
  { id: 'booked_counsellor', title: 'Booked Counsellor', description: 'Reach out to a professional counselor or helpline.' },
  { id: 'joined_community', title: 'Joined Community', description: 'Participate, read or post in the anonymous community forums.' },
];

exports.getAchievements = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : '11111111-1111-1111-1111-111111111111';

    const unlocked = await Achievement.findAll({ where: { userId } });
    const unlockedTitles = unlocked.map(a => a.title);

    const achievementsList = ALL_ACHIEVEMENTS.map(ach => {
      const isUnlocked = unlockedTitles.includes(ach.title);
      const userRecord = unlocked.find(a => a.title === ach.title);
      return {
        ...ach,
        isUnlocked,
        unlockedAt: isUnlocked ? userRecord.unlockedAt : null,
      };
    });

    return res.status(200).json(achievementsList);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.checkAchievements = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : '11111111-1111-1111-1111-111111111111';

    // Retrieve active unlocks
    const existingAchievements = await Achievement.findAll({ where: { userId } });
    const existingTitles = existingAchievements.map(a => a.title);

    const newlyUnlocked = [];

    // Helper to unlock if not already done
    const tryUnlock = async (title, description) => {
      if (!existingTitles.includes(title)) {
        const ach = await Achievement.create({ userId, title, description });
        newlyUnlocked.push(ach);
      }
    };

    // 1. Check check-ins and streaks
    const checkIns = await CheckIn.findAll({
      where: { userId },
      order: [['checkInDate', 'DESC']],
    });

    if (checkIns.length > 0) {
      await tryUnlock('First Check-in', 'Log your very first daily status check-in.');
    }

    // Calculate longest or current bet-free streak
    let currentStreak = 0;
    for (let c of checkIns) {
      if (c.bettedToday === false) {
        currentStreak++;
      } else {
        break;
      }
    }

    if (currentStreak >= 1) await tryUnlock('1 Day Bet-Free', 'Complete 1 full day without betting.');
    if (currentStreak >= 3) await tryUnlock('3 Days Bet-Free', 'Reach a streak of 3 consecutive bet-free days!');
    if (currentStreak >= 7) await tryUnlock('7 Days Bet-Free', 'Amazing! 1 week completely free of gambling.');
    if (currentStreak >= 14) await tryUnlock('14 Days Bet-Free', '2 weeks! You are building real resilience.');
    if (currentStreak >= 30) await tryUnlock('30 Days Bet-Free', '1 Month! A huge milestone in Malawian recovery.');
    if (currentStreak >= 60) await tryUnlock('60 Days Bet-Free', '2 Months bet-free! Your brain is resetting.');
    if (currentStreak >= 100) await tryUnlock('100 Days Bet-Free', 'Centurion status! Complete recovery is within reach.');

    // 2. Check Wallet goal configuration
    const wallet = await Wallet.findOne({ where: { userId } });
    if (wallet && wallet.savingsGoalTarget > 0) {
      await tryUnlock('Set Savings Goal', 'Configure your Recovery Wallet daily amount and goal.');
    }

    // 3. Stubs for Counsellor booking and Community actions
    // In a full application, we'd query CounsellingBookings or CommunityPosts.
    // For now, we simulate check or unlock based on request flags.
    if (req.body.joinedCommunity) {
      await tryUnlock('Joined Community', 'Participate, read or post in the anonymous community forums.');
    }
    if (req.body.bookedCounsellor) {
      await tryUnlock('Booked Counsellor', 'Reach out to a professional counselor or helpline.');
    }

    return res.status(200).json({
      message: newlyUnlocked.length > 0 ? `Zikomo! You unlocked ${newlyUnlocked.length} new achievements!` : 'No new achievements unlocked yet. Keep trying!',
      newlyUnlocked,
    });
  } catch (error) {
    console.error('Error evaluating achievements:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
