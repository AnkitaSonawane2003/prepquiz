// backend/routes/testAttemptRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth"); // expects function exported
const {
  createTestAttempt,
  submitTestAttempt,
  getAllTestAttempts,
  getTestAttemptById,
  getMyTestAttempts,
  getMyTestAttemptForTest,
  getTestAttemptsPerStudent,
} = require("../controllers/testAttemptController");
const TestAttempt = require("../models/TestAttempt");

// quick sanity: make sure middleware is a function
if (typeof authMiddleware !== "function") {
  console.error("[testAttemptRoutes] authMiddleware is not a function. Check backend/middleware/auth.js export.");
  throw new Error("authMiddleware invalid");
}

// route: total submitted (public/admin)
router.get("/total-submitted", async (req, res) => {
  try {
    const totalSubmitted = await TestAttempt.countDocuments();
    res.status(200).json({ success: true, totalSubmitted });
  } catch (err) {
    console.error("❌ Error fetching total submitted tests:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// protected: per-student aggregates (admin/teacher)
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

module.exports = router;
