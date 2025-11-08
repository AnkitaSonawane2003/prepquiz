// const express = require("express");
// const router = express.Router();
// const {
//   createTestAttempt,
//   getAllTestAttempts,
//   getTestAttemptById,
//   getMyTestAttempts,
// } = require("../controllers/testAttemptController");
// const authMiddleware = require("../middleware/auth");
// const Test = require("../models/Test");
// const TestAttempt = require("../models/TestAttempt");

// // ✅ Create a new test attempt for a student
// router.post("/:testId", authMiddleware, createTestAttempt);

// // ✅ Submit a test attempt
// router.post("/:testId/submit", authMiddleware, async (req, res) => {
//   try {
//     const { testId } = req.params;
//     const studentId = req.user._id;
//     const { answers = {}, timeTaken = 0 } = req.body;

//     const test = await Test.findById(testId).lean();
//     if (!test) {
//       return res.status(404).json({ success: false, message: "Test not found" });
//     }

//     const existingAttempt = await TestAttempt.findOne({
//       test: testId,
//       student: studentId,
//     });

//     if (existingAttempt && existingAttempt.totalObtained >= 0) {
//       return res
//         .status(400)
//         .json({ success: false, message: "You have already submitted this test" });
//     }

//     let totalMarks = 0;
//     let totalObtained = 0;

//     const attemptAnswers = (test.questions || [])
//       .filter((q) => q && q._id) // ✅ ensure valid questions only
//       .map((q) => {
//         try {
//           const qId = q._id.toString();
//           totalMarks += Number(q.marks || 0);

//           const studentAns = (answers[qId] || "").toString().trim();
//           let marksObtained = 0;
//           let graded = false;

//           if (q.type === "MCQ" && q.correctAnswer) {
//             graded = true;
//             if (
//               studentAns &&
//               q.correctAnswer &&
//               studentAns.toUpperCase() ===
//                 q.correctAnswer.toString().toUpperCase()
//             ) {
//               marksObtained = Number(q.marks || 0);
//             }
//           }

//           totalObtained += marksObtained;

//           return {
//             question: q._id,
//             answer: studentAns,
//             marksObtained,
//             graded,
//           };
//         } catch (innerErr) {
//           console.error("Error grading question:", innerErr);
//           return null; // skip invalid question gracefully
//         }
//       })
//       .filter(Boolean); // remove any null entries

//     const newAttempt = new TestAttempt({
//       test: test._id,
//       student: studentId,
//       answers: attemptAnswers,
//       totalObtained,
//       totalMarks,
//       timeTaken: Number(timeTaken || 0),
//     });

//     await newAttempt.save();

//     res.json({
//       success: true,
//       message: "Test submitted successfully",
//       attemptId: newAttempt._id,
//       score: totalObtained,
//       totalMarks,
//     });
//   } catch (err) {
//     console.error("POST /api/testattempts/:testId/submit error:", err);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error while submitting test" });
//   }
// });

// // ✅ Get all test attempts (admin/teacher)
// router.get("/", authMiddleware, getAllTestAttempts);

// // ✅ Get logged-in student's attempts
// router.get("/my", authMiddleware, getMyTestAttempts);

// // ✅ Get a specific test attempt by ID
// router.get("/:id", authMiddleware, getTestAttemptById);

// module.exports = router;
// const express = require("express");
// const TestAttempt = require("../models/TestAttempt");

// const router = express.Router();
// const {
//   createTestAttempt,
//   submitTestAttempt,
//   getAllTestAttempts,
//   getTestAttemptById,
//   getMyTestAttempts,
//   getMyTestAttemptForTest, // ✅ new
// } = require("../controllers/testAttemptController");
// const authMiddleware = require("../middleware/auth");


// router.get("/total-submitted", async (req, res) => {
//   try {
//     const totalSubmitted = await TestAttempt.countDocuments();
//     res.status(200).json({ success: true, totalSubmitted });
//   } catch (err) {
//     console.error("❌ Error fetching total submitted tests:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// });
// // GET /api/test-attempt/per-student
// router.get("/per-student", async (req, res) => {
//   try {
//     const attempts = await TestAttempt.aggregate([...]);
//     res.status(200).json({ success: true, attempts });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });


// // 🧩 Create a new test attempt for a student
// router.post("/:testId", authMiddleware, createTestAttempt);

// // 🧩 Submit a test attempt
// router.post("/:testId/submit", authMiddleware, submitTestAttempt);

// // 🧩 Get all test attempts (admin/teacher)
// router.get("/", authMiddleware, getAllTestAttempts);

// // 🧩 Get logged-in student’s attempts
// router.get("/my", authMiddleware, getMyTestAttempts);

// // 🧩 Get logged-in student’s attempt for a specific test
// router.get("/:testId/my", authMiddleware, getMyTestAttemptForTest);

// // 🧩 Get a specific test attempt by ID
// router.get("/:id", authMiddleware, getTestAttemptById);
// // Get total test attempts submitted by students


// module.exports = router;

// const express = require("express");
// const TestAttempt = require("../models/TestAttempt");

// const router = express.Router();
// const {
//   createTestAttempt,
//   submitTestAttempt,
//   getAllTestAttempts,
//   getTestAttemptById,
//   getMyTestAttempts,
//   getMyTestAttemptForTest,
// } = require("../controllers/testAttemptController");

// // 🧩 Get total submitted test attempts
// router.get("/total-submitted", async (req, res) => {
//   try {
//     const totalSubmitted = await TestAttempt.countDocuments();
//     res.status(200).json({ success: true, totalSubmitted });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // 🧩 Get test attempts aggregated per student (for admin dashboard)
// router.get("/per-student", async (req, res) => {
//   try {
//     const attempts = await TestAttempt.aggregate([
//   {
//     $group: {
//       _id: "$student",
//       totalSubmissions: { $sum: 1 },
//       lastSubmission: { $max: "$createdAt" },
//     },
//   },
//   {
//     $lookup: {
//       from: "users", // correct collection name
//       localField: "_id",
//       foreignField: "_id",
//       as: "student",
//     },
//   },
//   { $unwind: "$student" },
//   {
//     $project: {
//       _id: 0,
//       email: "$student.email",
//       totalSubmissions: 1,
//       lastSubmission: 1,
//     },
//   },
// ]);


//     res.status(200).json({ success: true, attempts });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // 🧩 Create a new test attempt
// router.post("/:testId", createTestAttempt);

// // 🧩 Submit a test attempt
// router.post("/:testId/submit", submitTestAttempt);

// // 🧩 Get all test attempts
// router.get("/", getAllTestAttempts);

// // 🧩 Get logged-in student’s attempts
// router.get("/my", getMyTestAttempts);

// // 🧩 Get logged-in student’s attempt for a specific test
// router.get("/:testId/my", getMyTestAttemptForTest);

// // 🧩 Get a specific test attempt by ID
// router.get("/:id", getTestAttemptById);

// module.exports = router;
// const express = require("express");
// const router = express.Router();
// const {
//   createTestAttempt,
//   getAllTestAttempts,
//   getTestAttemptById,
//   getMyTestAttempts,
// } = require("../controllers/testAttemptController");
// const authMiddleware = require("../middleware/auth");
// const Test = require("../models/Test");
// const TestAttempt = require("../models/TestAttempt");

// // ✅ Create a new test attempt for a student
// router.post("/:testId", authMiddleware, createTestAttempt);

// // ✅ Submit a test attempt
// router.post("/:testId/submit", authMiddleware, async (req, res) => {
//   try {
//     const { testId } = req.params;
//     const studentId = req.user._id;
//     const { answers = {}, timeTaken = 0 } = req.body;

//     const test = await Test.findById(testId).lean();
//     if (!test) {
//       return res.status(404).json({ success: false, message: "Test not found" });
//     }

//     const existingAttempt = await TestAttempt.findOne({
//       test: testId,
//       student: studentId,
//     });

//     if (existingAttempt && existingAttempt.totalObtained >= 0) {
//       return res
//         .status(400)
//         .json({ success: false, message: "You have already submitted this test" });
//     }

//     let totalMarks = 0;
//     let totalObtained = 0;

//     const attemptAnswers = (test.questions || [])
//       .filter((q) => q && q._id) // ✅ ensure valid questions only
//       .map((q) => {
//         try {
//           const qId = q._id.toString();
//           totalMarks += Number(q.marks || 0);

//           const studentAns = (answers[qId] || "").toString().trim();
//           let marksObtained = 0;
//           let graded = false;

//           if (q.type === "MCQ" && q.correctAnswer) {
//             graded = true;
//             if (
//               studentAns &&
//               q.correctAnswer &&
//               studentAns.toUpperCase() ===
//                 q.correctAnswer.toString().toUpperCase()
//             ) {
//               marksObtained = Number(q.marks || 0);
//             }
//           }

//           totalObtained += marksObtained;

//           return {
//             question: q._id,
//             answer: studentAns,
//             marksObtained,
//             graded,
//           };
//         } catch (innerErr) {
//           console.error("Error grading question:", innerErr);
//           return null; // skip invalid question gracefully
//         }
//       })
//       .filter(Boolean); // remove any null entries

//     const newAttempt = new TestAttempt({
//       test: test._id,
//       student: studentId,
//       answers: attemptAnswers,
//       totalObtained,
//       totalMarks,
//       timeTaken: Number(timeTaken || 0),
//     });

//     await newAttempt.save();

//     res.json({
//       success: true,
//       message: "Test submitted successfully",
//       attemptId: newAttempt._id,
//       score: totalObtained,
//       totalMarks,
//     });
//   } catch (err) {
//     console.error("POST /api/testattempts/:testId/submit error:", err);
//     res
//       .status(500)
//       .json({ success: false, message: "Server error while submitting test" });
//   }
// });

// // ✅ Get all test attempts (admin/teacher)
// router.get("/", authMiddleware, getAllTestAttempts);

// // ✅ Get logged-in student's attempts
// router.get("/my", authMiddleware, getMyTestAttempts);

// // ✅ Get a specific test attempt by ID
// router.get("/:id", authMiddleware, getTestAttemptById);

// module.exports = router;
const express = require("express");
const TestAttempt = require("../models/TestAttempt");

const router = express.Router();
const {
  createTestAttempt,
  submitTestAttempt,
  getAllTestAttempts,
  getTestAttemptById,
  getMyTestAttempts,
  getMyTestAttemptForTest, 
  getTestAttemptsPerStudent, // ✅ new
} = require("../controllers/testAttemptController");
const authMiddleware = require("../middleware/auth");


router.get("/total-submitted", async (req, res) => {
  try {
    const totalSubmitted = await TestAttempt.countDocuments();
    res.status(200).json({ success: true, totalSubmitted });
  } catch (err) {
    console.error("❌ Error fetching total submitted tests:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});
router.get("/per-student", authMiddleware, getTestAttemptsPerStudent);


// 🧩 Create a new test attempt for a student
router.post("/:testId", authMiddleware, createTestAttempt);

// 🧩 Submit a test attempt
router.post("/:testId/submit", authMiddleware, submitTestAttempt);

// 🧩 Get all test attempts (admin/teacher)
router.get("/", authMiddleware, getAllTestAttempts);

// 🧩 Get logged-in student’s attempts
router.get("/my", authMiddleware, getMyTestAttempts);

// 🧩 Get logged-in student’s attempt for a specific test
router.get("/:testId/my", authMiddleware, getMyTestAttemptForTest);

// 🧩 Get a specific test attempt by ID
router.get("/:id", authMiddleware, getTestAttemptById);
// Get total test attempts submitted by students
// 🧩 Get total test attempts per student (dashboard / evaluations)




module.exports = router;
