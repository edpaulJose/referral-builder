const express = require('express');
const router = express.Router();
const Referral = require('../models/Referral');

// Create a new referral
router.post('/create', async (req, res) => {
  try {
    // Check if a referral with the same email already exists
    const existingReferral = await Referral.findOne({ email: req.body.email });
    if (existingReferral) {
      return res.status(400).json({ message: 'A referral with this email already exists' });
    }

    // Create and save the new referral
    const referral = new Referral(req.body);
    await referral.save();
    res.status(201).json(referral);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all referrals
router.get('/', async (req, res) => {
  try {
    // Get page and limit from query parameters, or set defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the starting index of the items to be fetched
    const startIndex = (page - 1) * limit;

    // Fetch referrals with pagination
    const referrals = await Referral.find()
      .skip(startIndex)
      .limit(limit);

    // Get the total count of referrals for pagination info
    const totalReferrals = await Referral.countDocuments();

    // Return the referrals along with pagination details
    res.status(200).json({
      totalReferrals,
      currentPage: page,
      totalPages: Math.ceil(totalReferrals / limit),
      referrals
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Update a referral by ID
router.put('/:id', async (req, res) => {
  try {
    const referral = await Referral.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Options: return the updated document and run validation
    );
    if (!referral) {
      return res.status(404).json({ message: 'Referral not found' });
    }
    res.status(200).json(referral);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
