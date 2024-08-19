const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  homeName: { type: String, required: true },
  street: { type: String, required: true },
  suburb: { type: String, required: true },
  state: { type: String, required: true },
  postcode: { type: String, required: true },
  country: { type: String, required: true },
  avatarFile: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const Referral = mongoose.model("Referral", referralSchema);

module.exports = Referral;
