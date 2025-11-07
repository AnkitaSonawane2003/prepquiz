const express = require("express");
const router = express.Router();
const {
  createTestAttempt,
  getAllTestAttempts,
  getTestAttemptById,
  getMyTestAttempts,
} = require("../controllers/testAttemptController");
const authMiddleware = require("../middleware/auth");
const Test = require("../models/Test");
const TestAttempt = require("../models/TestAttempt");

// ✅ Create a new test attempt for a student
router.post("/:testId", authMiddleware, createTestAttempt);

// ✅ Submit a test attempt
router.post("/:testId/submit", authMiddleware, async (req, res) => {
  try {
    const { testId } = req.params;
    const studentId = req.user._id;
    const { answers = {}, timeTaken = 0 } = req.body;

    const test = await Test.findById(testId).lean();
    if (!test) {
      return res.status(404).json({ success: false, message: "Test not found" });
    }

    const existingAttempt = await TestAttempt.findOne({
      test: testId,
      student: studentId,
    });

    if (existingAttempt && existingAttempt.totalObtained >= 0) {
      return res
        .status(400)
        .json({ success: false, message: "You have already submitted this test" });
    }

    let totalMarks = 0;
    let totalObtained = 0;

    const attemptAnswers = (test.questions || [])
      .filter((q) => q && q._id) // ✅ ensure valid questions only
      .map((q) => {
        try {
          const qId = q._id.toString();
          totalMarks += Number(q.marks || 0);

          const studentAns = (answers[qId] || "").toString().trim();
          let marksObtained = 0;
          let graded = false;

          if (q.type === "MCQ" && q.correctAnswer) {
            graded = true;
            if (
              studentAns &&
              q.correctAnswer &&
              studentAns.toUpperCase() ===
                q.correctAnswer.toString().toUpperCase()
            ) {
              marksObtained = Number(q.marks || 0);
            }
          }

          totalObtained += marksObtained;

          return {
            question: q._id,
            answer: studentAns,
            marksObtained,
            graded,
          };
        } catch (innerErr) {
          console.error("Error grading question:", innerErr);
          return null; // skip invalid question gracefully
        }
      })
      .filter(Boolean); // remove any null entries

    const newAttempt = new TestAttempt({
      test: test._id,
      student: studentId,
      answers: attemptAnswers,
      totalObtained,
      totalMarks,
      timeTaken: Number(timeTaken || 0),
    });

    await newAttempt.save();

    res.json({
      success: true,
      message: "Test submitted successfully",
      attemptId: newAttempt._id,
      score: totalObtained,
      totalMarks,
    });
  } catch (err) {
    console.error("POST /api/testattempts/:testId/submit error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error while submitting test" });
  }
});

// ✅ Get all test attempts (admin/teacher)
router.get("/", authMiddleware, getAllTestAttempts);

// ✅ Get logged-in student's attempts
router.get("/my", authMiddleware, getMyTestAttempts);

// ✅ Get a specific test attempt by ID
router.get("/:id", authMiddleware, getTestAttemptById);

module.exports = router;
