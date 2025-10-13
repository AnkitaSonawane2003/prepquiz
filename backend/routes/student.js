// routes/student.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const auth = require("../middleware/auth"); // JWT middleware

// --------------------
// REGISTER STUDENT
// --------------------
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, rollNumber, password, department } = req.body;

    // Validate Input
    if (!fullName || !email || !rollNumber || !password || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingEmail = await Student.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "Email already registered" });

    // Check if roll number already exists
    const existingRoll = await Student.findOne({ rollNumber });
    if (existingRoll)
      return res.status(400).json({ message: "Roll number already registered" });

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      fullName,
      email,
      rollNumber,
      password: hashedPassword,
      department,
    });

    await newStudent.save();

    res.status(201).json({ message: "Student registered successfully!" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------
// LOGIN STUDENT
// --------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate Token
    const token = jwt.sign(
      { id: student._id },
      process.env.JWT_SECRET || "prep-quiz",
      { expiresIn: "1d" }
    );

    // Return token + user info
    res.json({
      message: "Login successful",
      token,
      user: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        rollNumber: student.rollNumber,
        department: student.department,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// Get all students (for admin / staff usage)
router.get("/students", async (req, res) => {
   console.log("GET /students route hit");
  try {
    const students = await Student.find({}, "-password"); // exclude password field
    res.json({ success: true, students });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// --------------------
// GET STUDENT PROFILE (Protected)
// --------------------
router.get("/profile", auth, async (req, res) => {
  try {
    const studentId = req.user.id; // From token

    const student = await Student.findById(studentId).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});




// GET /api/student/count
router.get('/count', async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error("Student count error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
