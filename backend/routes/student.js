// routes/student.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const auth = require("../middleware/auth"); // Use your existing auth.js middleware

// --------------------
// Register student
// --------------------
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, rollNumber, password, department } = req.body;

    // Check if email or rollNumber already exists
    const existingEmail = await Student.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "Email already registered" });

    const existingRoll = await Student.findOne({ rollNumber });
    if (existingRoll)
      return res.status(400).json({ message: "Roll number already registered" });

    const newStudent = new Student({ fullName, email, rollNumber, password, department });
    await newStudent.save();

    res.status(201).json({ message: "Student registered successfully!" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------
// Login student
// --------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });

    if (!student) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: student._id },
      process.env.JWT_SECRET || "prep-quiz",
      { expiresIn: "1d" }
    );

    res.json({ token, message: "Login successful" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// Get all students (for admin / staff usage)
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find({}, "-password"); // exclude password field
    res.json({ success: true, students });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// --------------------
// Get logged-in student profile
// --------------------
router.get("/profile", auth, async (req, res) => {
  try {
    const studentId = req.user.id; // obtained from auth middleware
    const student = await Student.findById(studentId).select("-password"); // exclude password
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
