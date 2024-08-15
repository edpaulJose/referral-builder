const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const referralRoutes = require('./routes/referral');

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Referral API routes
app.use('/api/referrals', referralRoutes);

mongoose.connect(process.env.SERVER_MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
