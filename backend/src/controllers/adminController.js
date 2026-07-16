const jwt = require('jsonwebtoken');

// Stub lists & aggregations to represent database values in full BASM backend application
let mockAdminUser = {
  id: 'admin_01',
  email: 'admin@basm.org.mw',
  role: 'admin'
};

// In a real application, these operations would query MongoDB models like User, Counsellor, Session, Post, etc.
let mockCounsellors = [
  { _id: 'c1', name: 'Dr. Chimwemwe Phiri', email: 'c.phiri@basm.org.mw', specialization: 'Behavioral Addiction', licenseNumber: 'MDC-8849', status: 'approved', totalSessions: 42, totalEarnings: 630000, pendingPayout: 105000, qualifications: 'PhD in Clinical Psychology, 10 years experience working with compulsive gambling addiction.', created_date: '2026-01-10T10:00:00.000Z' },
  { _id: 'c2', name: 'Mercy Gondwe', email: 'm.gondwe@basm.org.mw', specialization: 'Cognitive Behavioral Therapy', licenseNumber: 'MDC-9214', status: 'pending', totalSessions: 0, totalEarnings: 0, pendingPayout: 0, qualifications: 'MSc Counseling Psychology, specialized in young adult gambling support groups.', created_date: '2026-07-02T14:30:00.000Z' },
  { _id: 'c3', name: 'Limbani Bandas', email: 'l.bandas@basm.org.mw', specialization: 'Gambling Therapy Specialist', licenseNumber: 'MDC-7711', status: 'suspended', suspensionReason: 'Failed to renew clinical license on time.', totalSessions: 15, totalEarnings: 225000, pendingPayout: 30000, qualifications: 'BSc Psychology with specific certification from African Institute of Addiction Studies.', created_date: '2025-11-20T08:00:00.000Z' }
];

let mockUsers = [
  { _id: 'u1', email: 'anoymous1@domain.mw', created_date: '2026-03-01T09:00:00.000Z', currentProgram: 'Heavy Bettor Recovery Plan', streakDays: 32, subscription: 'premium', riskLevel: 'high', status: 'active' },
  { _id: 'u2', email: 'anonymous2@domain.mw', created_date: '2026-05-15T11:00:00.000Z', currentProgram: 'Moderate Gambler Phase-Out', streakDays: 14, subscription: 'free', riskLevel: 'moderate', status: 'active' },
  { _id: 'u3', email: 'anonymous3@domain.mw', created_date: '2026-06-20T12:00:00.000Z', currentProgram: 'General Wellness', streakDays: 3, subscription: 'free', riskLevel: 'low', status: 'suspended' }
];

let mockSessions = [
  { _id: 's1', date: '2026-07-15T10:00:00.000Z', userId: 'u1', counsellorId: 'c1', counsellorName: 'Dr. Chimwemwe Phiri', type: 'Individual Therapy', status: 'completed', amount: 15000 },
  { _id: 's2', date: '2026-07-20T14:00:00.000Z', userId: 'u2', counsellorId: 'c1', counsellorName: 'Dr. Chimwemwe Phiri', type: 'Premium Recovery Counselling', status: 'confirmed', amount: 15000 },
  { _id: 's3', date: '2026-07-16T11:00:00.000Z', userId: 'u3', counsellorId: 'c3', counsellorName: 'Limbani Bandas', type: 'Addiction Assessment', status: 'cancelled', amount: 15000 }
];

let mockCommunityPosts = [
  { _id: 'p1', userId: 'u1', content: 'Feeling a massive urge to bet on the Premier League match tonight. The ads are everywhere on Malawian radios and streets. Need someone to talk to.', flagsCount: 3, flagReason: 'High vulnerability trigger', created_date: '2026-07-16T12:00:00.000Z' },
  { _id: 'p2', userId: 'u2', content: 'Promoting a new online betting platform in Blantyre, make quick cash! Link: freebets.mw', flagsCount: 8, flagReason: 'Spam / Commercial promotion of betting services', created_date: '2026-07-15T15:30:00.000Z' }
];

// Controller logic definitions
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  // Verification
  if (email === 'admin@basm.org.mw' && password === 'admin123_BASM') {
    const token = jwt.sign(
      { id: mockAdminUser.id, email: mockAdminUser.email, role: 'admin' },
      process.env.JWT_SECRET || 'basm_secret_jwt_key_2026',
      { expiresIn: '24h' }
    );
    return res.status(200).json({
      token,
      admin: { id: mockAdminUser.id, email: mockAdminUser.email }
    });
  }

  return res.status(401).json({ message: 'Invalid admin credentials' });
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = mockUsers.length;
    const active7d = mockUsers.filter(u => u.status === 'active').length; // Mock 7-day activity proxy

    const totalC = mockCounsellors.length;
    const pendingC = mockCounsellors.filter(c => c.status === 'pending').length;
    const approvedC = mockCounsellors.filter(c => c.status === 'approved').length;

    const sessionsThisMonth = mockSessions.length;
    const revenueThisMonth = mockSessions.reduce((acc, curr) => acc + curr.amount, 0);
    const premiumSubscribers = mockUsers.filter(u => u.subscription === 'premium').length;
    const totalBetFreeDays = mockUsers.reduce((acc, curr) => acc + (curr.streakDays || 0), 0);

    const recentActivity = [
      { id: 'act1', type: 'booking', description: 'New therapy session confirmed with Dr. Chimwemwe Phiri', time: '1 hour ago' },
      { id: 'act2', type: 'signup', description: 'New anonymized patient enrolled from Lilongwe', time: '4 hours ago' },
      { id: 'act3', type: 'subscription', description: 'User upgraded to Premium Plan (Monthly MWK subscription)', time: '1 day ago' }
    ];

    return res.status(200).json({
      users: { total: totalUsers, active7d },
      counsellors: { total: totalC, pending: pendingC, approved: approvedC },
      sessionsThisMonth,
      revenueThisMonth,
      premiumSubscribers,
      totalBetFreeDays,
      flaggedPostsCount: mockCommunityPosts.length,
      recentActivity
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving dashboard analytics', error: error.message });
  }
};

exports.getCounsellors = async (req, res) => {
  try {
    const { status } = req.query;
    let list = mockCounsellors;
    if (status && status !== 'all') {
      list = mockCounsellors.filter(c => c.status === status);
    }
    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching counsellors index', error: error.message });
  }
};

exports.approveCounsellor = async (req, res) => {
  try {
    const { id } = req.params;
    const counsellor = mockCounsellors.find(c => c._id === id);
    if (!counsellor) {
      return res.status(404).json({ message: 'Counsellor not found' });
    }

    counsellor.status = 'approved';
    counsellor.approvedAt = new Date().toISOString();
    counsellor.suspensionReason = undefined;

    return res.status(200).json({ message: 'Counsellor approved successfully', counsellor });
  } catch (error) {
    return res.status(500).json({ message: 'Approval operation failed', error: error.message });
  }
};

exports.suspendCounsellor = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({ message: 'Suspension reason is mandatory' });
    }

    const counsellor = mockCounsellors.find(c => c._id === id);
    if (!counsellor) {
      return res.status(404).json({ message: 'Counsellor not found' });
    }

    counsellor.status = 'suspended';
    counsellor.suspensionReason = reason;
    counsellor.suspendedAt = new Date().toISOString();

    return res.status(200).json({ message: 'Counsellor suspended successfully', counsellor });
  } catch (error) {
    return res.status(500).json({ message: 'Suspension operation failed', error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { subscription, risk } = req.query;
    let list = mockUsers;

    if (subscription && subscription !== 'all') {
      list = list.filter(u => u.subscription === subscription);
    }
    if (risk && risk !== 'all') {
      list = list.filter(u => u.riskLevel === risk);
    }

    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching users index', error: error.message });
  }
};

exports.suspendUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = mockUsers.find(u => u._id === id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.status = user.status === 'suspended' ? 'active' : 'suspended';
    return res.status(200).json({ message: `User status changed to ${user.status}`, user });
  } catch (error) {
    return res.status(500).json({ message: 'User moderation failed', error: error.message });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    let list = mockSessions;

    if (status && status !== 'all') {
      list = list.filter(s => s.status === status);
    }
    if (startDate) {
      list = list.filter(s => new Date(s.date) >= new Date(startDate));
    }
    if (endDate) {
      list = list.filter(s => new Date(s.date) <= new Date(endDate));
    }

    // Revenue breakdown formula
    const gross = list.reduce((acc, curr) => acc + curr.amount, 0);
    const platform = Math.round(gross * 0.20); // Platform takes a 20% flat commission rate
    const payouts = gross - platform;

    return res.status(200).json({
      sessions: list,
      revenueBreakdown: { gross, platform, payouts }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error calculating session logs', error: error.message });
  }
};

exports.getRevenueReport = async (req, res) => {
  try {
    // Generate monthly aggregations for line/bar charts
    const monthlyRevenue = [
      { month: 'May 2026', subscriptions: 280000, sessions: 350000, total: 630000 },
      { month: 'June 2026', subscriptions: 350000, sessions: 480000, total: 830000 },
      { month: 'July 2026', subscriptions: 420000, sessions: 520000, total: 940000 }
    ];

    const topCounsellors = [
      { name: 'Dr. Chimwemwe Phiri', sessionsCount: 42, totalEarnings: 630000 },
      { name: 'Limbani Bandas', sessionsCount: 15, totalEarnings: 225000 }
    ];

    const pendingPayouts = mockCounsellors
      .filter(c => c.pendingPayout > 0)
      .map(c => ({
        counsellorId: c._id,
        name: c.name,
        licenseNumber: c.licenseNumber,
        amount: c.pendingPayout
      }));

    return res.status(200).json({
      monthlyRevenue,
      topCounsellors,
      pendingPayouts
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to aggregate revenue figures', error: error.message });
  }
};

exports.processPayout = async (req, res) => {
  try {
    const { counsellorId } = req.params;
    const { amountMWK } = req.body;

    const counsellor = mockCounsellors.find(c => c._id === counsellorId);
    if (!counsellor) {
      return res.status(404).json({ message: 'Counsellor not found' });
    }

    console.log(`[PAYOUT PROCESSOR] Transferring ${amountMWK} MWK to counsellor ${counsellor.name} (${counsellor.licenseNumber})`);
    
    // Reset pending payouts and log payout completion
    counsellor.pendingPayout = 0;

    return res.status(200).json({
      message: 'Payout successfully processed & logged',
      counsellorId,
      amountTransferred: amountMWK
    });
  } catch (error) {
    return res.status(500).json({ message: 'Payout execution failed', error: error.message });
  }
};

exports.getCommunityPosts = async (req, res) => {
  try {
    return res.status(200).json(mockCommunityPosts);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving posts', error: error.message });
  }
};

exports.approveCommunityPost = async (req, res) => {
  try {
    const { postId } = req.params;
    mockCommunityPosts = mockCommunityPosts.filter(p => p._id !== postId); // Removed from flags review list once cleared
    return res.status(200).json({ message: 'Post flags cleared and content approved.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error clearing post flags', error: error.message });
  }
};

exports.removePost = async (req, res) => {
  try {
    const { postId } = req.params;
    mockCommunityPosts = mockCommunityPosts.filter(p => p._id !== postId); // Permanently/Soft-deleted from moderation feed
    return res.status(200).json({ message: 'Post successfully soft-deleted from platform feed' });
  } catch (error) {
    return res.status(500).json({ message: 'Post deletion failed', error: error.message });
  }
};
