const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");
const Student = require("../models/Student"); // ✅ You missed this line earlier

// Get evaluation for a user based on email
router.get("/user/:email", async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    console.log("Fetching evaluation for:", email);

    const submissions = await Submission.find({ user: email });

    if (!submissions || submissions.length === 0) {
      return res.status(404).json({ message: "No evaluation found for this user" });
    }

    const uniqueProblems = new Set(submissions.map((s) => s.problemId));

    const evaluation = {
      email,
      totalSubmissions: submissions.length,
      uniqueProblemsSolved: uniqueProblems.size,
      score: uniqueProblems.size * 10,
      lastSubmissionDate: submissions[submissions.length - 1].createdAt,
    };

    res.status(200).json(evaluation);
  } catch (error) {
    console.error("Error fetching evaluation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Route: Get all evaluations (grouped by student)
// ✅ Route: Get all evaluations (grouped by student)
router.get("/all-evaluations", async (req, res) => {
  try {
    // 1️⃣ Fetch all submissions
    const submissions = await Submission.find();

    if (!submissions || submissions.length === 0) {
      return res.status(404).json({ message: "No submissions found" });
    }

    // 2️⃣ Group submissions by user (email)
    const grouped = {};
    submissions.forEach((sub) => {
      if (!grouped[sub.user]) {
        grouped[sub.user] = {
          email: sub.user,
          totalSubmissions: 0,
          lastSubmission: sub.createdAt,
        };
      }

      grouped[sub.user].totalSubmissions++;

      if (sub.createdAt > grouped[sub.user].lastSubmission) {
        grouped[sub.user].lastSubmission = sub.createdAt;
      }
    });

    // 3️⃣ Fetch all students from Students collection
    const students = await Student.find();

    // 4️⃣ Create a lookup map for email → student name
    const studentMap = {};
    students.forEach((stu) => {
      studentMap[stu.email] = stu.name; // ✅ your Students model has 'name'
    });

    // 5️⃣ Merge submission data with student names
    const result = Object.values(grouped).map((g) => ({
      fullName: studentMap[g.email] || "Unnamed Student",
      totalSubmissions: g.totalSubmissions,
      lastSubmission: g.lastSubmission,
      email: g.email, // keep this for internal logic (you can hide it on frontend)
    }));

    // 6️⃣ Send the combined data
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching evaluations:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
