const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const Student = require("../models/Student");
const auth = require("../middleware/auth");
const Test = require("../models/Test");
const Problem = require("../models/Problem");

// --------------------
// FORGOT PASSWORD
// --------------------
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const student = await Student.findOne({ email });

    if (!student)
      return res.status(404).json({ message: "Email not found" });

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Save token + expiry
    student.resetPasswordToken = resetToken;
    student.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await student.save();

    // --------------------------------------------
    // SEND EMAIL CONTAINING RESET LINK
    // --------------------------------------------
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Password Reset Link",
      html: `
        <p>You requested to reset your password.</p>
        <p>Click below to set a new password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link is valid for 1 hour only.</p>
      `,
    });

    return res.json({
      message: "Reset link sent to your email!",
    });

  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// --------------------
// RESET PASSWORD
// --------------------
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const student = await Student.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!student) 
    return res.status(400).json({ message: "Invalid or expired token" });

    student.password = password;
  student.resetPasswordToken = undefined;
  student.resetPasswordExpires = undefined;

  await student.save();
  res.json({ message: "Password reset successfully!" });
});



// --------------------
// MULTER SETUP
// --------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `student_${req.user.id}${ext}`);
  },
});
const upload = multer({ storage });

// --------------------
// REGISTER STUDENT
// --------------------
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, rollNumber, password, department } = req.body;

    const existingEmail = await Student.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "Email already registered" });

    const existingRoll = await Student.findOne({ rollNumber });
    if (existingRoll)
      return res.status(400).json({ message: "Roll number already registered" });

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStudent = new Student({
      fullName,
      email,
      rollNumber,
      department,
      password: hashedPassword,
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

// --------------------
// GET ALL STUDENTS
// --------------------
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find({}, "-password");
    res.json({ success: true, students });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --------------------
// GET PROFILE (Protected)
// --------------------
router.get("/profile", auth, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------
// UPDATE PROFILE (Protected, with image)
// --------------------
router.put("/profile", auth, upload.single("profileImage"), async (req, res) => {
  try {
    const { fullName, department, rollNumber, email } = req.body;

    // -----------------------------
    // Check if email is already used
    // -----------------------------
    if (email) {
      const existingEmailUser = await Student.findOne({
        email,
        _id: { $ne: req.user.id }   // Exclude current user
      });

      if (existingEmailUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // -----------------------------
    // Check if roll number is used
    // -----------------------------
    if (rollNumber) {
      const existingRollUser = await Student.findOne({
        rollNumber,
        _id: { $ne: req.user.id }   // Exclude current user
      });

      if (existingRollUser) {
        return res.status(400).json({ message: "Roll number already in use" });
      }
    }

    // -----------------------------
    // Prepare update data
    // -----------------------------
    const updateData = {
      fullName,
      department,
      rollNumber,
      email,
    };

    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }

    // -----------------------------
    // Update document
    // -----------------------------
    const updatedStudent = await Student.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updatedStudent);

  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// --------------------
// STUDENT COUNT
// --------------------
router.get("/count", async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error("Student count error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------
// STUDENT DASHBOARD STATS
// --------------------
router.get("/stats", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;

    const recentTests = await Test.find({}, "title date createdAt")
      .sort({ createdAt: -1 })
      .limit(limit);

    const recentChallenges = await Problem.find({}, "title createdAt")
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json({ success: true, recentTests, recentChallenges });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
