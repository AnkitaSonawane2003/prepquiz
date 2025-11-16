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
const Problem = require("../models/Problem");

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

// ✅ Move this route ABOVE others
router.get("/problems-solved/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Fetch all submissions for this user
    const submissions = await Submission.find({ user: email });

    if (!submissions.length) {
      return res.json({ success: true, solvedCount: 0 });
    }

    // Extract unique problem IDs (so multiple submissions for same problem count once)
    const uniqueProblems = new Set(submissions.map((s) => s.problemId.toString()));

    res.json({ success: true, solvedCount: uniqueProblems.size });
  } catch (err) {
    console.error("Error fetching problems solved count:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get latest submission for specific user & problem
router.get("/:user/:problemId", async (req, res) => {
  try {
    const { user, problemId } = req.params;
    const submission = await Submission.findOne({ user, problemId }).sort({ createdAt: -1 });
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

// ✅ Get all evaluations (Coding)
// ✅ Get all evaluations (Coding) with student name
router.get("/all-evaluations", async (req, res) => {
  try {
    const evaluations = await Submission.aggregate([
      { $sort: { createdAt: -1 } }, // latest submissions first
      {
        $group: {
          _id: { user: "$user", problemId: "$problemId" },
          totalSubmissions: { $sum: 1 },
          lastSubmission: { $first: "$createdAt" },
        },
      },
      // Lookup problem info
      {
        $lookup: {
          from: "problems",
          localField: "_id.problemId",
          foreignField: "_id",
          as: "problemInfo",
        },
      },
      { $unwind: "$problemInfo" },
      // Lookup student info
   {
  $lookup: {
    from: "students",       // collection name
    localField: "_id.user", // submission's user email
    foreignField: "email",  // students collection field
    as: "studentInfo",
  }
},
{ $unwind: "$studentInfo" },
{
  $project: {
    email: "$_id.user",
    fullName: "$studentInfo.fullName",
    problemName: "$problemInfo.title",
    totalSubmissions: 1,
    lastSubmission: 1,
  },
},

    ]);

    res.status(200).json(evaluations);
  } catch (err) {
    console.error("Error fetching coding evaluations:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// router.get("/all-evaluations", async (req, res) => {
//   try {
//     const evaluations = await Submission.aggregate([
//       { $sort: { createdAt: -1 } }, // latest submissions first
//       {
//         $group: {
//           _id: { user: "$user", problemId: "$problemId" },
//           totalSubmissions: { $sum: 1 },
//           lastSubmission: { $first: "$createdAt" },
//         },
//       },
//       {
//         $lookup: {
//           from: "problems",
//           localField: "_id.problemId",
//           foreignField: "_id",
//           as: "problemInfo",
//         },
//       },
//       { $unwind: "$problemInfo" },
//       {
//         $project: {
//           email: "$_id.user",
//           problemName: "$problemInfo.title",
//           totalSubmissions: 1,
//           lastSubmission: 1,
//         },
//       },
//     ]);

//     res.status(200).json(evaluations);
//   } catch (err) {
//     console.error("Error fetching coding evaluations:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// });
module.exports = router;
