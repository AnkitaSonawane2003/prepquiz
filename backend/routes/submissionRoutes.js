// const express = require("express");
// const router = express.Router();
// const Submission = require("../models/Submission");

// // Save a new submission
// router.post("/", async (req, res) => {
//   try {
//     const { problemId, code, language, output, user } = req.body;

//     // Save new submission
//     const submission = await Submission.create({
//       problemId,
//       code,
//       language,
//       output,
//       user,
//     });

//     res.json({ success: true, submission });
//   } catch (error) {
//     console.error("Error saving submission:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // Get the latest submission for a user & problem
// router.get("/:user/:problemId", async (req, res) => {
//   try {
//     const { user, problemId } = req.params;
//     const submission = await Submission.findOne({ user, problemId }).sort({
//       createdAt: -1,
//     });
//     res.json({ success: true, submission });
//   } catch (error) {
//     console.error("Error fetching submission:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// module.exports = router;
// const express = require("express");
// const router = express.Router();
// const Submission = require("../models/Submission");

// // ✅ Save a new submission
// router.post("/", async (req, res) => {
//   try {
//     const { problemId, code, language, output, user } = req.body;

//     if (!problemId || !code || !language || !user) {
//       return res.status(400).json({ success: false, message: "Missing fields" });
//     }

//     const submission = await Submission.create({
//       problemId,
//       code,
//       language,
//       output,
//       user,
//     });

//     res.json({ success: true, submission });
//   } catch (error) {
//     console.error("Error saving submission:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // ✅ Get the latest submission for a specific user & problem
// router.get("/:user/:problemId", async (req, res) => {
//   try {
//     const { user, problemId } = req.params;

//     const submission = await Submission.findOne({ user, problemId }).sort({
//       createdAt: -1,
//     });

//     res.json({ success: true, submission });
//   } catch (error) {
//     console.error("Error fetching submission:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });


// // ✅ Get all submissions for a specific user
// router.get("/user/:userEmail", async (req, res) => {
//   try {
//     const { userEmail } = req.params;

//     // Fetch all submissions by this user, sorted by creation date descending
//     const submissions = await Submission.find({ user: userEmail }).sort({ createdAt: -1 });

//     res.json({ success: true, submissions });
//   } catch (error) {
//     console.error("Error fetching submissions for user:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });


// module.exports = router;
// const express = require("express");
// const router = express.Router();
// const Submission = require("../models/Submission");

// // ✅ Save a new submission
// router.post("/", async (req, res) => {
//   try {
//     const { problemId, code, language, output, user } = req.body;

//     if (!problemId || !code || !language || !user) {
//       return res.status(400).json({ success: false, message: "Missing fields" });
//     }

//     const submission = await Submission.create({
//       problemId,
//       code,
//       language,
//       output,
//       user,
//     });

//     res.json({ success: true, submission });
//   } catch (error) {
//     console.error("Error saving submission:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // ✅ Get the latest submission for a specific user & problem
// router.get("/:user/:problemId", async (req, res) => {
//   try {
//     const { user, problemId } = req.params;

//     const submission = await Submission.findOne({ user, problemId }).sort({
//       createdAt: -1,
//     });

//     res.json({ success: true, submission });
//   } catch (error) {
//     console.error("Error fetching submission:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // ✅ Get all submissions for a specific user
// router.get("/user/:userEmail", async (req, res) => {
//   try {
//     const { userEmail } = req.params;

//     // Fetch all submissions by this user, sorted by creation date descending
//     const submissions = await Submission.find({ user: userEmail }).sort({ createdAt: -1 });

//     res.json({ success: true, submissions });
//   } catch (error) {
//     console.error("Error fetching submissions for user:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // ✅ Get count of unique problems solved by a specific user
// router.get("/problems-solved/:userEmail", async (req, res) => {
//   try {
//     const { userEmail } = req.params;

//     // Find all submissions by the user and get unique problemIds
//     const submissions = await Submission.find({ user: userEmail }).select("problemId");
//     const uniqueProblems = new Set(submissions.map((s) => s.problemId));

//     res.json({ success: true, solvedCount: uniqueProblems.size });
//   } catch (error) {
//     console.error("Error fetching problems solved:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Submission = require("../models/Submission");

// ✅ Save a new submission
router.post("/", async (req, res) => {
  try {
    const { problemId, code, language, output, user } = req.body;

    if (!problemId || !code || !language || !user) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const submission = await Submission.create({
      problemId,
      code,
      language,
      output,
      user,
    });

    res.json({ success: true, submission });
  } catch (error) {
    console.error("Error saving submission:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get the latest submission for a specific user & problem
router.get("/:user/:problemId", async (req, res) => {
  try {
    const { user, problemId } = req.params;

    const submission = await Submission.findOne({ user, problemId }).sort({
      createdAt: -1,
    });

    res.json({ success: true, submission });
  } catch (error) {
    console.error("Error fetching submission:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get all submissions for a specific user
router.get("/user/:userEmail", async (req, res) => {
  try {
    const { userEmail } = req.params;

    const submissions = await Submission.find({ user: userEmail }).sort({ createdAt: -1 });

    res.json({ success: true, submissions });
  } catch (error) {
    console.error("Error fetching submissions for user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get count of unique problems solved by a specific user
// routes/submissionRoutes.js
router.get("/problems-solved/:email", async (req, res) => {
  try {
    const studentEmail = req.params.email;
    const student = await User.findOne({ email: studentEmail });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    const solvedCount = await Submission.countDocuments({ student: student._id });
    res.json({ success: true, solvedCount });
  } catch (err) {
    console.error("Error fetching submission:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;
