const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'BASM API is running',
    version: '1.0.0',
    project: 'Betting Addiction Support Malawi'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

try {
  app.use('/api/auth', require('../src/routes/auth'));
  app.use('/api/users', require('../src/routes/users'));
  app.use('/api/counsellors', require('../src/routes/counsellors'));
  app.use('/api/sessions', require('../src/routes/sessions'));
  app.use('/api/checkins', require('../src/routes/checkins'));
  app.use('/api/wallet', require('../src/routes/wallet'));
  app.use('/api/achievements', require('../src/routes/achievements'));
  app.use('/api/emergency', require('../src/routes/emergency'));
  app.use('/api/urge', require('../src/routes/urge'));
  app.use('/api/training', require('../src/routes/training'));
  app.use('/api/community', require('../src/routes/community'));
  app.use('/api/library', require('../src/routes/library'));
  app.use('/api/ai', require('../src/routes/ai'));
  app.use('/api/family', require('../src/routes/family'));
  app.use('/api/assessment', require('../src/routes/assessment'));
  app.use('/api/payments', require('../src/routes/payments'));
  app.use('/api/admin', require('../src/routes/admin'));
  app.use('/api/programs', require('../src/routes/programs'));
} catch (e) {
  console.error('Route load error:', e.message);
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

module.exports = app;
