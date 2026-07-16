const Wallet = require('../models/Wallet');
const CheckIn = require('../models/CheckIn');

exports.setupWallet = async (req, res) => {
  try {
    const { dailyBetAmount, savingsGoalLabel, savingsGoalTarget } = req.body;
    const userId = req.user ? req.user.id : '11111111-1111-1111-1111-111111111111';

    if (dailyBetAmount === undefined || !savingsGoalLabel || savingsGoalTarget === undefined) {
      return res.status(400).json({ error: 'Missing required setup fields: dailyBetAmount, savingsGoalLabel, savingsGoalTarget' });
    }

    let wallet = await Wallet.findOne({ where: { userId } });

    if (wallet) {
      wallet.dailyBetAmount = dailyBetAmount;
      wallet.savingsGoalLabel = savingsGoalLabel;
      wallet.savingsGoalTarget = savingsGoalTarget;
      await wallet.save();
    } else {
      wallet = await Wallet.create({
        userId,
        dailyBetAmount,
        savingsGoalLabel,
        savingsGoalTarget,
      });
    }

    return res.status(200).json({
      message: 'Recovery Wallet configured successfully!',
      wallet,
    });
  } catch (error) {
    console.error('Error setting up wallet:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getWalletSummary = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : '11111111-1111-1111-1111-111111111111';

    const wallet = await Wallet.findOne({ where: { userId } });

    if (!wallet) {
      return res.status(200).json({
        walletConfigured: false,
        message: 'Please set up your Recovery Wallet to start tracking savings!',
      });
    }

    // Calculate days bet free
    const checkIns = await CheckIn.findAll({
      where: { userId },
      order: [['checkInDate', 'DESC']],
    });

    let daysBetFree = 0;
    checkIns.forEach(c => {
      if (c.bettedToday === false) {
        daysBetFree++;
      }
    });

    const dailyBet = Number(wallet.dailyBetAmount);
    const totalSavedMwk = daysBetFree * dailyBet;
    const target = Number(wallet.savingsGoalTarget);
    const progressPercent = target > 0 ? Math.min(Math.round((totalSavedMwk / target) * 100), 100) : 0;

    // Define standard equivalents in Malawi
    const equivalents = [
      { key: 'school_fees', label: 'School Fees (Primary/Secondary)', cost: 45000, desc: 'MK45,000 = 1 Term of school fees' },
      { key: 'bag_of_maize', label: 'Bag of Maize (Chakudya)', cost: 35000, desc: 'MK35,000 = 1 Bag of maize' },
      { key: 'chitenje', label: 'Chitenje Wrap Cloth', cost: 5000, desc: 'MK5,000 = 1 Quality Chitenje fabric' },
      { key: 'business_capital', label: 'Small Business Starting Capital', cost: 100000, desc: 'MK100,000+ = Capital for a market stall/small business' },
    ];

    // Find what equivalent achievements are unlocked
    const unlockedEquivalents = equivalents.map(eq => {
      const quantity = Math.floor(totalSavedMwk / eq.cost);
      return {
        ...eq,
        quantity,
        isUnlocked: quantity > 0,
        unlockedText: quantity > 0 ? `Zikomo! You have saved enough to buy ${quantity}x ${eq.label}` : `Keep saving to reach ${eq.desc}`
      };
    });

    return res.status(200).json({
      walletConfigured: true,
      dailyBetAmount: dailyBet,
      daysBetFree,
      totalSavedMwk,
      savingsGoal: {
        label: wallet.savingsGoalLabel,
        target,
        progressPercent,
        isAchieved: totalSavedMwk >= target,
      },
      equivalentPurchases: unlockedEquivalents,
    });
  } catch (error) {
    console.error('Error fetching wallet summary:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
