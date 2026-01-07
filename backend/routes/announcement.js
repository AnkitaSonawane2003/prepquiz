const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Create schema + model
const announcementSchema = new mongoose.Schema({
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Announcement = mongoose.model('Announcement', announcementSchema);

// POST: Add new announcement
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ success: false, message: "Message is required" });

    const newAnn = new Announcement({ message });
    await newAnn.save();
    res.status(201).json({ success: true, message: "Announcement added!" });
  } catch (err) {
    console.error("Add announcement error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/announcement?limit=3
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const announcements = await Announcement.find()
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json({ success: true, announcements });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;
