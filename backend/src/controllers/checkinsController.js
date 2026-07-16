const CheckIn = require('../models/CheckIn');
const { Op } = require('sequelize');

exports.createCheckIn = async (req, res) => {
  try {
    const { bettedToday, urgeStrength, mood, notes } = req.body;
    const userId = req.user ? req.user.id : '11111111-1111-1111-1111-111111111111';

    if (bettedToday === undefined || urgeStrength === undefined || !mood) {
      return res.status(400).json({ error: 'Missing required check-in fields: bettedToday, urgeStrength, mood' });
    }

    // High risk / escalation trigger if urgeStrength is extremely high (e.g., 9 or 10)
    let alert = null;
    if (Number(urgeStrength) >= 9) {
      alert = {
        message: 'Severe urge detected. Chonde lankhulani ndi mlangizi wathu mwachangu!',
        escalation: 'Please contact our crisis line immediately. Call 116 or reach out to James Banda at +265 888 123 456.',
      };
    }

    const todayDate = new Date().toISOString().split('T')[0];

    // Check if check-in already exists for today, if so update it, otherwise create
    let checkIn = await CheckIn.findOne({
      where: {
        userId,
        checkInDate: todayDate,
      },
    });

    if (checkIn) {
      checkIn.bettedToday = bettedToday;
      checkIn.urgeStrength = urgeStrength;
      checkIn.mood = mood;
      checkIn.notes = notes;
      await checkIn.save();
    } else {
      checkIn = await CheckIn.create({
        userId,
        bettedToday,
        urgeStrength,
        mood,
        notes,
        checkInDate: todayDate,
      });
    }

    return res.status(201).json({
      message: 'Daily check-in saved successfully!',
      checkIn,
      alert,
    });
  } catch (error) {
    console.error('Error creating check-in:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getCheckInHistory = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : '11111111-1111-1111-1111-111111111111';
    
    // Get last 30 days of check-ins
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const history = await CheckIn.findAll({
      where: {
        userId,
        checkInDate: {
          [Op.gte]: thirtyDaysAgo.toISOString().split('T')[0],
        },
      },
      order: [['checkInDate', 'DESC']],
    });

    return res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching check-in history:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getStreak = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : '11111111-1111-1111-1111-111111111111';

    // Retrieve all check-ins ordered by date descending to calculate current consecutive bet-free days
    const checkIns = await CheckIn.findAll({
      where: { userId },
      order: [['checkInDate', 'DESC']],
    });

    if (checkIns.length === 0) {
      return res.status(200).json({ streak: 0, message: 'Start your recovery journey with your first check-in today!' });
    }

    let streak = 0;
    const today = new Date();
    today.setHours(0,0,0,0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const checkInDates = checkIns.map(c => c.checkInDate);

    // Verify if the latest check-in is either today or yesterday
    const latestCheckInDateStr = checkInDates[0];
    const latestCheckInDate = new Date(latestCheckInDateStr);
    latestCheckInDate.setHours(0,0,0,0);

    if (latestCheckInDate < yesterday) {
      // The streak was broken because they missed check-ins beyond yesterday
      return res.status(200).json({ streak: 0, message: 'No recent check-ins. Keep trying to rebuild your streak!' });
    }

    let currentDate = latestCheckInDate;
    for (let i = 0; i < checkIns.length; i++) {
      const currentRecord = checkIns[i];
      const recordDate = new Date(currentRecord.checkInDate);
      recordDate.setHours(0,0,0,0);

      // Verify sequence of days
      if (i > 0) {
        const previousRecordDate = new Date(checkIns[i-1].checkInDate);
        previousRecordDate.setHours(0,0,0,0);
        const diffTime = Math.abs(previousRecordDate - recordDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays > 1) {
          // Gap in check-ins breaks streak
          break;
        }
      }

      if (currentRecord.bettedToday === false) {
        streak++;
      } else {
        // They betted on this day, streak breaks
        break;
      }
    }

    return res.status(200).json({
      streak,
      message: streak > 0 
        ? `Muli kuchita bwino kwambiri! Keep going, you have ${streak} bet-free days!` 
        : 'Do not discourage yourself. Today is a new day to make a bet-free choice.'
    });
  } catch (error) {
    console.error('Error calculating streak:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
