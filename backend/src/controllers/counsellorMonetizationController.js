/**
 * Counsellor Monetization Controller
 * Handles therapist onboarding, session booking, payments & earnings
 */

const PLATFORM_FEE_PERCENT = 20; // Platform keeps 20%
const COUNSELLOR_SHARE_PERCENT = 80; // Counsellor gets 80%

// ─── COUNSELLOR ONBOARDING ───────────────────────────────────────────────────

const applyAsCounsellor = async (req, res) => {
  try {
    const {
      fullName, email, phone, specialization, qualifications,
      licenseNumber, languages, sessionRate, bio
    } = req.body;

    // TODO: save to DB, send verification email
    const counsellor = {
      id: `c_${Date.now()}`,
      fullName, email, phone, specialization, qualifications,
      licenseNumber, languages: languages || ['English', 'Chichewa'],
      sessionRate: sessionRate || 15000, // MWK
      bio,
      status: 'pending', // requires admin verification
      licenseVerified: false,
      platformFeePercent: PLATFORM_FEE_PERCENT,
      counsellorSharePercent: COUNSELLOR_SHARE_PERCENT,
    };

    res.status(201).json({
      message: 'Application submitted successfully. We will verify your credentials within 2-3 business days.',
      counsellor,
      nextSteps: [
        'Your license will be verified with the relevant Malawi health authority',
        'You will receive an email once approved',
        'After approval, set your availability and start receiving bookings',
      ]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCounsellorProfile = async (req, res) => {
  // Returns counsellor's own profile and earnings dashboard
  res.json({
    counsellor: {
      id: req.params.id,
      status: 'approved',
      sessionRate: 15000,
      platformFeePercent: PLATFORM_FEE_PERCENT,
    },
    earnings: {
      totalEarningsMWK: 0,
      pendingPayoutMWK: 0,
      thisMonthMWK: 0,
      totalSessions: 0,
      completedSessions: 0,
      averageRating: 0,
    },
    upcomingSessions: [],
  });
};

const updateAvailability = async (req, res) => {
  const { availableSlots } = req.body;
  // availableSlots: [{ dayOfWeek: 'Monday', startTime: '09:00', endTime: '17:00' }]
  res.json({ message: 'Availability updated', slots: availableSlots });
};

// ─── SESSION BOOKING & PRICING ───────────────────────────────────────────────

const getSessionPricing = async (req, res) => {
  const { counsellorId, sessionType } = req.query;

  const baseRates = {
    video: 15000,  // MWK
    chat: 8000,
    group: 3000,   // per person
  };

  const rate = baseRates[sessionType] || baseRates.video;
  const platformFee = Math.round(rate * (PLATFORM_FEE_PERCENT / 100));
  const counsellorPayout = rate - platformFee;

  res.json({
    sessionType,
    totalMWK: rate,
    breakdown: {
      counsellorPayoutMWK: counsellorPayout,
      platformFeeMWK: platformFee,
    },
    paymentMethods: [
      { id: 'airtel_money', name: 'Airtel Money', icon: '📱', instructions: 'Send to: *400*[amount]#' },
      { id: 'tnm_mpamba', name: 'TNM Mpamba', icon: '📱', instructions: 'Dial *969*[amount]#' },
      { id: 'bank', name: 'Bank Transfer', icon: '🏦', details: 'National Bank of Malawi - Acc: 1234567890' },
    ],
    freeTierNote: 'Premium subscribers get 2 free sessions per month',
  });
};

const bookSession = async (req, res) => {
  try {
    const { counsellorId, sessionType, scheduledAt, paymentMethod, paymentReference } = req.body;
    const userId = req.user?.id || 'user_demo';

    const baseRates = { video: 15000, chat: 8000, group: 3000 };
    const rate = baseRates[sessionType] || 15000;
    const platformFee = Math.round(rate * (PLATFORM_FEE_PERCENT / 100));
    const counsellorPayout = rate - platformFee;

    const session = {
      id: `sess_${Date.now()}`,
      userId,
      counsellorId,
      type: sessionType,
      scheduledAt,
      status: 'pending',
      amountMWK: rate,
      counsellorPayoutMWK: counsellorPayout,
      platformFeeMWK: platformFee,
      paymentStatus: paymentReference ? 'paid' : 'unpaid',
      paymentReference,
      paymentMethod,
    };

    res.status(201).json({
      message: 'Session booked successfully!',
      session,
      confirmation: {
        summary: `${sessionType} session with counsellor on ${scheduledAt}`,
        amountPaid: `MK${rate.toLocaleString()}`,
        counsellorShare: `MK${counsellorPayout.toLocaleString()} goes to your counsellor`,
        platformShare: `MK${platformFee.toLocaleString()} supports the BASM platform`,
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── SUBSCRIPTION / PREMIUM ───────────────────────────────────────────────────

const getSubscriptionPlans = async (req, res) => {
  res.json({
    plans: [
      {
        id: 'free',
        name: 'Free',
        priceMWK: 0,
        features: [
          'Self-assessment quiz',
          'Daily check-ins',
          'Recovery Wallet tracker',
          'Basic library & community',
          'Emergency SOS access',
          '1 free group session/month',
        ],
        cta: 'Current Plan',
      },
      {
        id: 'premium',
        name: 'Premium Recovery',
        priceMWK: 7500,
        billingCycle: 'monthly',
        features: [
          'Everything in Free',
          '2 free individual counsellor sessions/month',
          'AI companion with full memory',
          'All training programs + certificates',
          'Advanced analytics & insights',
          'Family support portal access',
          'Offline content access',
          'Priority counsellor matching',
        ],
        cta: 'Upgrade — MK7,500/month',
        highlight: true,
        paymentMethods: ['Airtel Money', 'TNM Mpamba', 'Bank Transfer'],
      },
    ],
    institutionalNote: 'NGO/employer bulk plans available. Contact us for pricing.',
  });
};

const subscribeToPremium = async (req, res) => {
  const { paymentMethod, paymentReference } = req.body;
  const userId = req.user?.id || 'user_demo';

  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);

  res.status(201).json({
    message: 'Premium subscription activated!',
    subscription: {
      userId,
      plan: 'premium',
      priceMWK: 7500,
      startDate: new Date(),
      endDate,
      status: 'active',
      paymentMethod,
      paymentReference,
    },
    unlockedFeatures: [
      '2 counsellor sessions credited to your account',
      'AI companion memory enabled',
      'All training programs unlocked',
    ]
  });
};

// ─── EARNINGS & PAYOUTS ───────────────────────────────────────────────────────

const getCounsellorEarnings = async (req, res) => {
  // TODO: fetch from DB
  res.json({
    counsellorId: req.params.id,
    summary: {
      totalEarningsMWK: 0,
      pendingPayoutMWK: 0,
      paidOutMWK: 0,
      thisMonthMWK: 0,
      platformFeePaidMWK: 0,
    },
    payoutSchedule: 'Payouts processed every Friday via Airtel Money or TNM Mpamba',
    recentSessions: [],
  });
};

const requestPayout = async (req, res) => {
  const { amountMWK, paymentMethod, accountNumber } = req.body;
  res.json({
    message: 'Payout request submitted',
    estimatedProcessing: 'Within 1-2 business days',
    amountMWK,
    paymentMethod,
    reference: `PAY_${Date.now()}`,
  });
};

module.exports = {
  applyAsCounsellor,
  getCounsellorProfile,
  updateAvailability,
  getSessionPricing,
  bookSession,
  getSubscriptionPlans,
  subscribeToPremium,
  getCounsellorEarnings,
  requestPayout,
};
