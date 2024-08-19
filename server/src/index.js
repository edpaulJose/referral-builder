const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const referralRoutes = require('./routes/referral');
const cors = require('cors');

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Use CORS middleware
app.use(cors({
  origin: process.env.CLIENT_DOMAIN, // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

const PORT = process.env.SERVER_PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Referral API routes
app.use('/uploads', express.static('uploads'));

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
