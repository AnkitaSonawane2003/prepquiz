const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher'); // Teacher model
const verifyToken = require('../middleware/auth'); // import middleware here

const router = express.Router();

// 🔹 Teacher Registration
router.post('/teacher', async (req, res) => {
  try {
    const { fullName, email, password, department } = req.body;

    const lowerEmail = email.toLowerCase();

    const existingTeacher = await Teacher.findOne({ email: lowerEmail });
    if (existingTeacher) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = new Teacher({
      fullName,
      email: lowerEmail,
      password: hashedPassword,
      department
    });

    await newTeacher.save();
    res.status(201).json({ message: "Teacher registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 Teacher Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email: email.toLowerCase() });
    if (!teacher) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: teacher._id, email: teacher.email },
      process.env.JWT_SECRET || "prep-quiz",
      { expiresIn: "1h" }
    );

    res.json({ token, message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔐 Protected route - Teacher dashboard example
router.get('/teacherpage', verifyToken, async (req, res) => {
  try {
    // You can also fetch teacher info if needed
    const teacher = await Teacher.findById(req.user.id).select('-password'); // exclude password
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json({
      message: "Welcome to the Teacher Dashboard!",
      teacher,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
