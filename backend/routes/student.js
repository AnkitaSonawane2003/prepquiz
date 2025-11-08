// // routes/student.js
// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const Student = require("../models/Student");
// const auth = require("../middleware/auth"); // JWT middleware

// // --------------------
// // REGISTER STUDENT
// // --------------------
// // Register Student
// router.post("/register", async (req, res) => {
//   try {
//     let { fullName, email, rollNumber, password, department } = req.body;

//     email = email.toLowerCase();

//     if (!fullName || !email || !rollNumber || !password || !department) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check email uniqueness
//     const existingEmail = await Student.findOne({ email });
//     if (existingEmail)
//       return res.status(400).json({ message: "Email already registered" });

//     // Check roll number uniqueness
//     const existingRoll = await Student.findOne({ rollNumber });
//     if (existingRoll)
//       return res.status(400).json({ message: "Roll number already registered" });


//     const newStudent = new Student({
//       fullName,
//       email,
//       rollNumber,
//       password: hashedPassword,
//       department,
//     });

//     await newStudent.save();

//     console.log("New student registered:", {
//       fullName,
//       email,
//       rollNumber,
//       department,
//     });

//     res.status(201).json({ message: "Student registered successfully!" });
//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Login Student
// router.post("/login", async (req, res) => {
//   try {
//     const email = req.body.email.toLowerCase();
//     const { password } = req.body;

//     console.log("Login attempt for email:", email);

//     const student = await Student.findOne({ email });

//     if (!student) {
//       console.log("No student found with email:", email);
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, student.password);
//     console.log("Password match result:", isMatch);

//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: student._id },
//       process.env.JWT_SECRET || "prep-quiz",
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: student._id,
//         fullName: student.fullName,
//         email: student.email,
//         rollNumber: student.rollNumber,
//         department: student.department,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });




// // Get all students (for admin / staff usage)
// router.get("/students", async (req, res) => {
  
//   try {
//     const students = await Student.find({}, "-password"); // exclude password field
//     res.json({ success: true, students });
//   } catch (err) {
//     console.error("Error fetching students:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });


// // --------------------
// // GET STUDENT PROFILE (Protected)
// // --------------------
// router.get("/profile", auth, async (req, res) => {
//   try {
//     const studentId = req.user.id; // From token

//     const student = await Student.findById(studentId).select("-password");
//     if (!student) return res.status(404).json({ message: "Student not found" });

//     res.json(student);
//   } catch (err) {
//     console.error("Profile fetch error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });




// // GET /api/student/count
// router.get('/count', async (req, res) => {
//   try {
//     const count = await Student.countDocuments();
//     res.json({ count });
//   } catch (err) {
//     console.error("Student count error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// module.exports = router;
// routes/student.js
// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const Student = require("../models/Student");
// const auth = require("../middleware/auth");
// const Test = require("../models/Test");
// const Problem = require("../models/Problem");

// // --------------------
// // Register Student
// // --------------------
// router.post("/register", async (req, res) => {
//   try {
//     const { fullName, email, rollNumber, password, department } = req.body;

//     const existingEmail = await Student.findOne({ email });
//     if (existingEmail)
//       return res.status(400).json({ message: "Email already registered" });

//     const existingRoll = await Student.findOne({ rollNumber });
//     if (existingRoll)
//       return res.status(400).json({ message: "Roll number already registered" });

//     const newStudent = new Student({ fullName, email, rollNumber, password, department });
//     await newStudent.save();

//     res.status(201).json({ message: "Student registered successfully!" });
//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // --------------------
// // Login Student
// // --------------------
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     // console.log("Login attempt for email:", email);

//     const student = await Student.findOne({ email });

//     if (!student) {
//       console.log("Student not found");
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, student.password);

//     // (Optional fallback for dev) — comment out in production
//     // if (!isMatch && password === student.password) {
//     //   console.warn("⚠️ Plaintext password matched");
//     // }

//     if (!isMatch) {
//       console.log("Password did not match");
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: student._id },
//       process.env.JWT_SECRET || "prep-quiz",
//       { expiresIn: "1d" }
//     );

//     res.json({ token, message: "Login successful" });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // --------------------
// // GET ALL STUDENTS (Admin/Staff)
// // --------------------
// router.get("/students", async (req, res) => {
//   try {
//     const students = await Student.find({}, "-password"); // exclude password
//     res.json({ success: true, students });
//   } catch (err) {
//     console.error("Error fetching students:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // --------------------
// // GET STUDENT PROFILE (Protected)
// // --------------------
// router.get("/profile", auth, async (req, res) => {
//   try {
//     const studentId = req.user.id;
//     const student = await Student.findById(studentId).select("-password");
//     if (!student) return res.status(404).json({ message: "Student not found" });

//     res.json(student);
//   } catch (err) {
//     console.error("Profile fetch error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // --------------------
// // STUDENT COUNT
// // --------------------
// router.get("/count", async (req, res) => {
//   try {
//     const count = await Student.countDocuments();
//     res.json({ count });
//   } catch (err) {
//     console.error("Student count error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// router.get("/stats", async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit) || 3;

//     const recentTests = await Test.find({}, "title date createdAt")
//       .sort({ createdAt: -1 })
//       .limit(limit);

//     const recentChallenges = await Problem.find({}, "title createdAt")
//       .sort({ createdAt: -1 })
//       .limit(limit);

//     res.json({
//       success: true,
//       recentTests,
//       recentChallenges,
//     });
//   } catch (err) {
//     console.error("Error fetching student stats:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });


// module.exports = router;
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const Student = require("../models/Student");
const auth = require("../middleware/auth");
const Test = require("../models/Test");
const Problem = require("../models/Problem");

// --------------------
// Multer setup for profile image upload
// --------------------
// Storage setup for uploaded profile images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // ✅ make sure this folder exists in backend root
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `student_${req.user.id}${ext}`);
  },
});

const upload = multer({ storage });

// --------------------
// Register Student
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

    const newStudent = new Student({
      fullName,
      email,
      rollNumber,
      password,
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
// Login Student
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
// GET ALL STUDENTS (Admin/Staff)
// --------------------
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find({}, "-password"); // exclude password
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
    const studentId = req.user.id;
    const student = await Student.findById(studentId).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------
// UPDATE STUDENT PROFILE (Protected)
// --------------------
// --------------------
// UPDATE STUDENT PROFILE (with image)
// --------------------
router.put("/profile", auth, upload.single("profileImage"), async (req, res) => {
  try {
    const studentId = req.user.id;
    const updateData = {
      fullName: req.body.fullName,
      department: req.body.department,
      rollNumber: req.body.rollNumber,
    };

    // ✅ if a new file is uploaded
    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }

    const updatedStudent = await Student.findByIdAndUpdate(studentId, updateData, {
      new: true,
    }).select("-password");

    if (!updatedStudent)
      return res.status(404).json({ message: "Student not found" });

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

    res.json({
      success: true,
      recentTests,
      recentChallenges,
    });
  } catch (err) {
    console.error("Error fetching student stats:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
