// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const Teacher = require('../models/Teacher');
// const verifyToken = require('../middleware/auth');
// const Test = require('../models/Test');
// const Problem = require('../models/Problem'); // coding challenges model
// const router = express.Router();

// // -----------------------------
// // Register teacher
// // -----------------------------
// router.post('/register', async (req, res) => {
//   try {
//     const { fullName, email, password, department, phone } = req.body;
//     const lowerEmail = email.toLowerCase();

//     const existingTeacher = await Teacher.findOne({ email: lowerEmail });
//     if (existingTeacher) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newTeacher = new Teacher({
//       fullName,
//       email: lowerEmail,
//       password: hashedPassword,
//       department,
//       phone: phone || '',
//     });

//     await newTeacher.save();
//     res.status(201).json({ message: 'Teacher registered successfully!' });
//   } catch (err) {
//     console.error('Teacher registration error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // -----------------------------
// // Login teacher
// // -----------------------------
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const lowerEmail = email.toLowerCase();

//     const teacher = await Teacher.findOne({ email: lowerEmail });
//     if (!teacher) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, teacher.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign(
//       { id: teacher._id, email: teacher.email },
//       process.env.JWT_SECRET || 'secretKey',
//       { expiresIn: '1d' }
//     );

//     res.json({ token, message: 'Login successful', teacherId: teacher._id });
//   } catch (err) {
//     console.error('Teacher login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });



// // In your teacher routes file

// // Get all teachers
// router.get('/all', async (req, res) => {
//   try {
//     const teachers = await Teacher.find({}, '-password'); // exclude password field
//     res.json({ success: true, teachers });
//   } catch (err) {
//     console.error('Error fetching teachers:', err);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });




// // GET /api/teacher/count
// router.get('/count', async (req, res) => {
//   try {
//     const count = await Teacher.countDocuments();
//     res.json({ count });
//   } catch (err) {
//     console.error("Teacher count error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// // -----------------------------
// // Get logged-in teacher profile
// // -----------------------------
// router.get('/profile', verifyToken, async (req, res) => {
//   try {
//     const teacher = await Teacher.findById(req.user.id).select('-password');
//     if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
//     res.json(teacher);
//   } catch (err) {
//     console.error('Get profile error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // -----------------------------
// // Update logged-in teacher profile
// // -----------------------------
// router.put('/profile', verifyToken, async (req, res) => {
//   try {
//     const { fullName, department, phone } = req.body;

//     const updatedData = {};
//     if (fullName) updatedData.fullName = fullName;
//     if (department) updatedData.department = department;
//     if (phone) updatedData.phone = phone;

//     const teacher = await Teacher.findByIdAndUpdate(
//       req.user.id,
//       updatedData,
//       { new: true }
//     ).select('-password');

//     res.json(teacher);
//   } catch (err) {
//     console.error('Update profile error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// router.get('/stats', async (req, res) => {
//   try {
//     const testsCreated = await Test.countDocuments();
//     const codingChallengesCreated = await Problem.countDocuments();

//     res.json({
//       success: true,
//       stats: {
//         testsCreated,
//         codingChallengesCreated
//       }
//     });
//   } catch (err) {
//     console.error("Error fetching counts:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });


// module.exports = router;
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const Teacher = require('../models/Teacher');
// const verifyToken = require('../middleware/auth');
// const Test = require('../models/Test');
// const Problem = require('../models/Problem');

// const router = express.Router();

// // -----------------------------
// // Register Teacher
// // -----------------------------
// router.post('/register', async (req, res) => {
//   try {
//     const { fullName, email, password, department, phone } = req.body;
//     const lowerEmail = email.toLowerCase();

//     const existingTeacher = await Teacher.findOne({ email: lowerEmail });
//     if (existingTeacher) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newTeacher = new Teacher({
//       fullName,
//       email: lowerEmail,
//       password: hashedPassword,
//       department,
//       phone: phone || '',
//     });

//     await newTeacher.save();
//     res.status(201).json({ message: 'Teacher registered successfully!' });
//   } catch (err) {
//     console.error('Teacher registration error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // -----------------------------
// // Login Teacher
// // -----------------------------
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const lowerEmail = email.toLowerCase();

//     const teacher = await Teacher.findOne({ email: lowerEmail });
//     if (!teacher) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, teacher.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign(
//       { id: teacher._id, email: teacher.email },
//       process.env.JWT_SECRET || 'secretKey',
//       { expiresIn: '1d' }
//     );

//     res.json({ token, message: 'Login successful', teacherId: teacher._id });
//   } catch (err) {
//     console.error('Teacher login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // -----------------------------
// // Get all teachers
// // -----------------------------
// router.get('/all', async (req, res) => {
//   try {
//     const teachers = await Teacher.find({}, '-password');
//     res.json({ success: true, teachers });
//   } catch (err) {
//     console.error('Error fetching teachers:', err);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

// // -----------------------------
// // Get teacher count
// // -----------------------------
// router.get('/count', async (req, res) => {
//   try {
//     const count = await Teacher.countDocuments();
//     res.json({ count });
//   } catch (err) {
//     console.error('Teacher count error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // -----------------------------
// // Get teacher profile
// // -----------------------------
// router.get('/profile', verifyToken, async (req, res) => {
//   try {
//     const teacher = await Teacher.findById(req.user.id).select('-password');
//     if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
//     res.json(teacher);
//   } catch (err) {
//     console.error('Get profile error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // -----------------------------
// // Update teacher profile
// // -----------------------------
// router.put('/profile', verifyToken, async (req, res) => {
//   try {
//     const { fullName, department, phone } = req.body;

//     const updatedData = {};
//     if (fullName) updatedData.fullName = fullName;
//     if (department) updatedData.department = department;
//     if (phone) updatedData.phone = phone;

//     const teacher = await Teacher.findByIdAndUpdate(
//       req.user.id,
//       updatedData,
//       { new: true }
//     ).select('-password');

//     res.json(teacher);
//   } catch (err) {
//     console.error('Update profile error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // -----------------------------
// // ✅ Stats Route (Counts + Recent Tests + Challenges)
// // -----------------------------
// router.get('/stats', async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit) || 3; // default 3
//     const testsCreated = await Test.countDocuments();
//     const codingChallengesCreated = await Problem.countDocuments();

//     const recentTests = await Test.find({}, 'title date createdAt')
//       .sort({ createdAt: -1 })
//       .limit(limit);

//     const recentChallenges = await Problem.find({}, 'title createdAt')
//       .sort({ createdAt: -1 })
//       .limit(limit);

//     res.json({
//       success: true,
//       stats: {
//         testsCreated,
//         codingChallengesCreated,
//         recentTests,
//         recentChallenges,
//       },
//     });
//   } catch (err) {
//     console.error('Error fetching teacher stats:', err);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });
// module.exports = router;


// routes/teacher.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');
const Test = require('../models/Test');
const Problem = require('../models/Problem');
const auth = require("../middleware/auth");


const router = express.Router();
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

// -----------------------------
// Teacher Forgot Password
// -----------------------------
// -----------------------------
// Teacher Forgot Password
// -----------------------------
router.post("/forgot-password", async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ email: req.body.email.toLowerCase() });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    teacher.resetPasswordToken = token;
    teacher.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await teacher.save();

    const resetUrl = `${process.env.FRONTEND_URL}/teacher/reset-password/${token}`;

    // ✅ Send email using NodeMailer
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: teacher.email,
      subject: "Password Reset Link",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link is valid for 10 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset link sent to your email." });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------
// Teacher Reset Password
// -----------------------------
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) return res.status(400).json({ message: "Password is required" });

    // Find teacher with valid token and not expired
    const teacher = await Teacher.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!teacher) return res.status(400).json({ message: "Invalid or expired token" });

    // Hash new password and save
    const hashedPassword = await bcrypt.hash(password, 10);
    teacher.password = hashedPassword;
    teacher.resetPasswordToken = null;
    teacher.resetPasswordExpires = null;

    await teacher.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// Configure storage for profile images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


// ✅ Middleware to verify Teacher token
// const verifyTeacherToken = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return res.status(401).json({ message: "Authorization header missing" });

//     if (!authHeader.startsWith("Bearer ")) return res.status(401).json({ message: "Invalid authorization format" });

//     const token = authHeader.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Token not provided" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretKey");

//     const teacher = await Teacher.findById(decoded.id).select("-password");
//     if (!teacher) return res.status(404).json({ message: "Teacher not found" });

//     req.user = teacher; // attach teacher object
//     next();
//   } catch (err) {
//     console.error("JWT verification failed:", err);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// -----------------------------
// Register Teacher
// -----------------------------
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, department, phone } = req.body;
    const lowerEmail = email.toLowerCase();

    const existingTeacher = await Teacher.findOne({ email: lowerEmail });
    if (existingTeacher) return res.status(400).json({ message: 'Email already registered' });

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
// Login Teacher
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

// -----------------------------
// Get all teachers
// -----------------------------
router.get('/all', async (req, res) => {
  try {
    const teachers = await Teacher.find({}, '-password');
    res.json({ success: true, teachers });
  } catch (err) {
    console.error('Error fetching teachers:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// -----------------------------
// Get teacher count
// -----------------------------
router.get('/count', async (req, res) => {
  try {
    const count = await Teacher.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Teacher count error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// -----------------------------
// Get teacher profile
// -----------------------------
router.get('/profile', auth, async (req, res) => {
  try {
    res.json(req.user); // already fetched by middleware
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// -----------------------------
// Update teacher profile
// -----------------------------
// Update teacher profile with image
router.put(
  "/profile",
  auth,
  upload.single("profileImage"), // handle file
  async (req, res) => {
    try {
      const { fullName, department, phone } = req.body;
      const updatedData = {};
      if (fullName) updatedData.fullName = fullName;
      if (department) updatedData.department = department;
      if (phone) updatedData.phone = phone;
      if (req.file) updatedData.profileImage = `/uploads/${req.file.filename}`;

      const teacher = await Teacher.findByIdAndUpdate(
        req.user._id,
        updatedData,
        { new: true }
      ).select("-password");

      res.json(teacher);
    } catch (err) {
      console.error("Update profile error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// -----------------------------
// Teacher Stats (counts + recent tests + challenges)
// -----------------------------
router.get('/stats', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;

    const testsCreated = await Test.countDocuments();
    const codingChallengesCreated = await Problem.countDocuments();

    const recentTests = await Test.find({}, 'title date createdAt')
      .sort({ createdAt: -1 })
      .limit(limit);

    const recentChallenges = await Problem.find({}, 'title createdAt')
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json({
      success: true,
      stats: {
        testsCreated,
        codingChallengesCreated,
        recentTests,
        recentChallenges,
      },
    });
  } catch (err) {
    console.error('Error fetching teacher stats:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
