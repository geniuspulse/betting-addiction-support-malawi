const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/db');

// Import routes
const assessmentRoutes = require('./routes/assessment');
const checkinsRoutes = require('./routes/checkins');
const walletRoutes = require('./routes/wallet');
const achievementsRoutes = require('./routes/achievements');
const emergencyRoutes = require('./routes/emergency');
const urgeRoutes = require('./routes/urge');
const trainingRoutes = require('./routes/training');
const communityRoutes = require('./routes/community');
const libraryRoutes = require('./routes/library');
const aiRoutes = require('./routes/ai');
const familyRoutes = require('./routes/family');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Dummy Auth Middleware to inject a demo user
app.use((req, res, next) => {
  req.user = {
    id: '11111111-1111-1111-1111-111111111111',
    username: 'DemoUser',
    email: 'demo@basm.mw',
  };
  next();
});

// Register routes
app.use('/api/assessment', assessmentRoutes);
app.use('/api/checkins', checkinsRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/urge', urgeRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/family', familyRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'BASM Backend API running successfully.' });
});

// Sync database and start server
const startServer = async () => {
  try {
    // In production, we'd use migrations, but for rapid delivery, we sync models
    const syncForce = process.env.NODE_ENV === 'test-force' ? true : false;
    await sequelize.sync({ force: syncForce });
    console.log('Database synced successfully.');
    
    app.listen(PORT, () => {
      console.log(`BASM Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database sync failed or Server start error:', error);
  }
};

startServer();

module.exports = app;
