// routes/admin.js
const express = require('express'); 
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
router.post('/create', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Store password as plain text (NOT recommended for production)
    const newAdmin = new Admin({ email, password });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
