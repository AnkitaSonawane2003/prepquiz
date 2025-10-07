const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher'); // Teacher model
const router = express.Router();

// 🔹 Teacher Registration
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, department } = req.body;

    // Convert email to lowercase
    const lowerEmail = email.toLowerCase();

    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ email: lowerEmail });
    if (existingTeacher) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new teacher
    const newTeacher = new Teacher({
      fullName,
      email: lowerEmail, // store lowercase email
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

    // Convert email to lowercase for comparison
    const teacher = await Teacher.findOne({ email: email.toLowerCase() });
    if (!teacher) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
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

module.exports = router;
