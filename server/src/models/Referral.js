const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;