const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher'); // Teacher mongoose model

const router = express.Router();

// Register teacher
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, department } = req.body;

    // Normalize email to lowercase
    const lowerEmail = email.toLowerCase();

    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ email: lowerEmail });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new teacher
    const newTeacher = new Teacher({
      fullName,
      email: lowerEmail,
      password: hashedPassword,
      department,
    });

    await newTeacher.save();

    res.status(201).json({ message: 'Teacher registered successfully!' });
  } catch (err) {
    console.error('Teacher registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login teacher
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const lowerEmail = email.toLowerCase();

    const teacher = await Teacher.findOne({ email: lowerEmail });
    if (!teacher) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Sign JWT token with a secret key (same as Student's or set your own)
    const token = jwt.sign(
      { id: teacher._id, email: teacher.email },
      process.env.JWT_SECRET || 'secretKey', // make sure to use a proper env var in production
      { expiresIn: '1d' }
    );

    res.json({ token, message: 'Login successful' });
  } catch (err) {
    console.error('Teacher login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



// In your teacher routes file

// Get all teachers
router.get('/all', async (req, res) => {
  try {
    const teachers = await Teacher.find({}, '-password'); // exclude password field
    res.json({ success: true, teachers });
  } catch (err) {
    console.error('Error fetching teachers:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});




// GET /api/teacher/count
router.get('/count', async (req, res) => {
  try {
    const count = await Teacher.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error("Teacher count error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
