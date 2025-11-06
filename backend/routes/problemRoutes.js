// // backend/routes/problemRoutes.js
// const express = require("express");
// const router = express.Router();
// const Problem = require("../models/Problem");

// // Add new problem (teacher)
// router.post("/add", async (req, res) => {
//   try {
//     const {
//       title,
//       difficulty,
//       type,
//       description,
//       inputFormat,
//       outputFormat,
//       sampleInput,
//       sampleOutput,
//       tags,
//     } = req.body;

//     if (!title || !description) {
//       return res.status(400).json({ success: false, message: "Title and description are required" });
//     }

//     const tagsArray = typeof tags === "string"
//       ? tags.split(",").map(t => t.trim()).filter(Boolean)
//       : Array.isArray(tags) ? tags : [];

//     const newProblem = new Problem({
//       title,
//       difficulty,
//       type,
//       description,
//       inputFormat,
//       outputFormat,
//       sampleInput,
//       sampleOutput,
//       tags: tagsArray,
//     });

//     await newProblem.save();
//     res.status(201).json({ success: true, message: "Problem saved", problem: newProblem });
//   } catch (err) {
//     console.error("Error saving problem:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // Get all problems (student)
// router.get("/", async (req, res) => {
//   try {
//     const problems = await Problem.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, problems });
//   } catch (err) {
//     console.error("Error fetching problems:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// module.exports = router;
// backend/routes/geminiRoutes.js
// const express = require("express");
// const Problem = require("../models/Problem");

// const router = express.Router();
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Initialize Gemini client
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Generate DSA questions based on topic & difficulty
// router.post("/generate-dsa", async (req, res) => {
//   try {
//     const { topic, difficulty } = req.body;

//     // Validation
//     if (!topic || !difficulty) {
//       return res.status(400).json({ success: false, message: "Both topic and difficulty are required." });
//     }

//     // Construct a better prompt
//     const prompt = `
//       Generate 3 DSA coding problems for the topic "${topic}" with ${difficulty} difficulty.
//       Each problem should include:
//       1. Title
//       2. Description
//       3. Input format
//       4. Output format
//       5. Sample input/output
//       Keep them well formatted in JSON array format:
//       [
//         {
//           "title": "",
//           "description": "",
//           "inputFormat": "",
//           "outputFormat": "",
//           "sampleInput": "",
//           "sampleOutput": ""
//         }
//       ]
//     `;

//     // Generate with Gemini API
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//     const result = await model.generateContent(prompt);

//     // Clean and parse JSON output
//     const text = result.response.text().trim();
//     const jsonStart = text.indexOf("[");
//     const jsonEnd = text.lastIndexOf("]") + 1;
//     const jsonText = text.slice(jsonStart, jsonEnd);
//     const problems = JSON.parse(jsonText);

//     res.status(200).json({ success: true, problems });
//   } catch (err) {
//     console.error("Error generating problems:", err);
//     res.status(500).json({ success: false, message: "Failed to generate problems." });
//   }
// });


// // Get all problems (student)
// router.get("/", async (req, res) => {
//   try {
//     const problems = await Problem.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, problems });
//   } catch (err) {
//     console.error("Error fetching problems:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });



// // ✅ Get single problem by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const problem = await Problem.findById(req.params.id);
//     if (!problem) return res.status(404).json({ success: false, message: "Problem not found" });
//     res.json({ success: true, problem });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });


// // ✅ Get count of problems solved by a specific student
// router.get("/problems-solved/:studentId", async (req, res) => {
//   try {
//     const { studentId } = req.params;

//     // Count how many problems this student has solved
//     const solvedCount = await Problem.countDocuments({
//       solvedBy: studentId, // assuming your Problem model stores which students solved it
//       status: "solved",    // or however you track solved state
//     });

//     res.status(200).json({ success: true, solvedCount });
//   } catch (err) {
//     console.error("Error fetching solved problems count:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });



// module.exports = router;
// backend/routes/problemRoutes.js
const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");

// ✅ Add new problem (teacher)
router.post("/add", async (req, res) => {
  try {
    const {
      title,
      difficulty,
      type,
      description,
      inputFormat,
      outputFormat,
      sampleInput,
      sampleOutput,
      tags,
    } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Title and description are required" });
    }

    const tagsArray =
      typeof tags === "string"
        ? tags.split(",").map((t) => t.trim()).filter(Boolean)
        : Array.isArray(tags)
        ? tags
        : [];

    const newProblem = new Problem({
      title,
      difficulty,
      type,
      description,
      inputFormat,
      outputFormat,
      sampleInput,
      sampleOutput,
      tags: tagsArray,
    });

    await newProblem.save();
    res.status(201).json({ success: true, message: "Problem saved", problem: newProblem });
  } catch (err) {
    console.error("Error saving problem:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get all problems (student)
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, problems });
  } catch (err) {
    console.error("Error fetching problems:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get single problem by ID
router.get("/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem)
      return res.status(404).json({ success: false, message: "Problem not found" });
    res.json({ success: true, problem });
  } catch (err) {
    console.error("Error fetching problem:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Mark a problem as solved by a student
router.post("/:id/solve", async (req, res) => {
  try {
    const { studentId } = req.body; // From frontend
    const { id } = req.params;

    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem not found" });
    }

    // Prevent duplicates
    if (!problem.solvedBy.includes(studentId)) {
      problem.solvedBy.push(studentId);
      problem.status = "solved";
      await problem.save();
    }

    res.status(200).json({ success: true, message: "Problem marked as solved" });
  } catch (err) {
    console.error("Error updating problem status:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get count of problems solved by a specific student
router.get("/problems-solved/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    const solvedCount = await Problem.countDocuments({
      solvedBy: studentId,
      status: "solved",
    });

    res.status(200).json({ success: true, solvedCount });
  } catch (err) {
    console.error("Error fetching solved problems count:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
