const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// -----------------------------
// Register teacher
// -----------------------------
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, department, phone } = req.body;
    const lowerEmail = email.toLowerCase();

    const existingTeacher = await Teacher.findOne({ email: lowerEmail });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = new Teacher({
      fullName,
      email: lowerEmail,
      password: hashedPassword,
      department,
      phone: phone || '',
    });

    await newTeacher.save();
    res.status(201).json({ message: 'Teacher registered successfully!' });
  } catch (err) {
    console.error('Teacher registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// -----------------------------
// Login teacher
// -----------------------------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const lowerEmail = email.toLowerCase();

    const teacher = await Teacher.findOne({ email: lowerEmail });
    if (!teacher) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: teacher._id, email: teacher.email },
      process.env.JWT_SECRET || 'secretKey',
      { expiresIn: '1d' }
    );

    res.json({ token, message: 'Login successful', teacherId: teacher._id });
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


// -----------------------------
// Get logged-in teacher profile
// -----------------------------
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user.id).select('-password');
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.json(teacher);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// -----------------------------
// Update logged-in teacher profile
// -----------------------------
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { fullName, department, phone } = req.body;

    const updatedData = {};
    if (fullName) updatedData.fullName = fullName;
    if (department) updatedData.department = department;
    if (phone) updatedData.phone = phone;

    const teacher = await Teacher.findByIdAndUpdate(
      req.user.id,
      updatedData,
      { new: true }
    ).select('-password');

    res.json(teacher);
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
