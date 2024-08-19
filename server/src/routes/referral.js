const express = require("express");
const router = express.Router();
const Referral = require("../models/Referral");
const upload = require("../middlewares/upload");

// Create a new referral with file upload
router.post("/create", upload.single("avatarFile"), async (req, res) => {
  try {
    // Check if a referral with the same email already exists
    const existingReferral = await Referral.findOne({ email: req.body.email });
    if (existingReferral) {
      return res
        .status(400)
        .json({ message: "A referral with this email already exists" });
    }

    // Create and save the new referral
    const referral = new Referral({
      ...req.body,
      avatarFile: req.file ? req.file.path : null, // Save the file path if a file is uploaded
    });
    await referral.save();
    res.status(201).json(referral);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all referrals
router.get("/", async (req, res) => {
  try {
    // Get page and limit from query parameters, or set defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the starting index of the items to be fetched
    const startIndex = (page - 1) * limit;

    // Fetch referrals with pagination and sorting by createdAt (latest first)
    const referrals = await Referral.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    // Get the total count of referrals for pagination info
    const totalReferrals = await Referral.countDocuments();

    // Return the referrals along with pagination details
    res.status(200).json({
      totalReferrals,
      currentPage: page,
      totalPages: Math.ceil(totalReferrals / limit),
      limit,
      referrals,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a referral by ID with optional file upload
router.put("/:id", upload.single("avatarFile"), async (req, res) => {
  try {
    // Fetch the existing referral
    const existingReferral = await Referral.findById(req.params.id);
    if (!existingReferral) {
      return res.status(404).json({ message: "Referral not found" });
    }

    // Update the referral with new data
    const updateData = {
      ...req.body,
      avatarFile: req.file ? req.file.path : existingReferral.avatarFile, // Update file if a new one is uploaded
    };

    const referral = await Referral.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(referral);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a referral by ID
router.delete("/:id", async (req, res) => {
  try {
    const referral = await Referral.findByIdAndDelete(req.params.id);
    if (!referral) {
      return res.status(404).json({ message: "Referral not found" });
    }

    // Optionally, delete the associated file
    if (referral.avatarFile) {
      const fs = require('fs');
      fs.unlink(referral.avatarFile, (err) => {
        if (err) console.error("Failed to delete file:", err);
      });
    }

    res.status(200).json({ message: "Referral deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
