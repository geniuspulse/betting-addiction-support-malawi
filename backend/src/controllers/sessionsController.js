const getSessions = (req, res) => res.json([]);
const getSession = (req, res) => res.json({ id: req.params.id });
const updateSession = (req, res) => res.json({ message: 'Session updated' });

module.exports = { getSessions, getSession, updateSession };
