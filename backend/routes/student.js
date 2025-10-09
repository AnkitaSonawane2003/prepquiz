const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");

// Register student
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, department } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ message: "Student already exists" });

    const newStudent = new Student({ fullName, email, password, department });
    await newStudent.save();

    res.status(201).json({ message: "Student registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login student
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });

    if (!student) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: student._id }, "secretKey", { expiresIn: "1d" });

    res.json({ token, message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
