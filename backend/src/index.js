const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/programs', require('./routes/programs'));
app.use('/api/counsellors', require('./routes/counsellors'));
app.use('/api/sessions', require('./routes/sessions'));
app.use('/api/assessments', require('./routes/assessments'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'BASM API' }));

app.listen(PORT, () => console.log(`BASM API running on port ${PORT}`));
