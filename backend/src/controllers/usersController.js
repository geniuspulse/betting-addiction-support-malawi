const getProfile = (req, res) => res.json({ user: req.user });
const updateProfile = (req, res) => res.json({ message: 'Profile updated', data: req.body });
const getDashboard = (req, res) => res.json({
  currentProgram: null,
  upcomingSessions: [],
  progressDays: 0,
  badges: [],
  sosContacts: []
});

module.exports = { getProfile, updateProfile, getDashboard };
