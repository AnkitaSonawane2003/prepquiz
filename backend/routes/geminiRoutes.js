// const express = require("express");
// const dotenv = require("dotenv");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// dotenv.config();
// const router = express.Router();

// // Initialize Gemini client
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // ✅ POST: Generate DSA problem
// router.post("/generate-dsa", async (req, res) => {
//   try {
//     const { topic } = req.body;

//     if (!topic) {
//       return res.status(400).json({ success: false, message: "Topic required." });
//     }

//     const prompt = `
//       You are a DSA question generator.
//       Generate one unique coding problem related to "${topic}".
//       Respond strictly in **valid JSON** format like this:
//       {
//         "title": "Problem title",
//         "difficulty": "Easy | Medium | Hard",
//         "description": "Full problem statement.",
//         "inputFormat": "Description of input format.",
//         "outputFormat": "Description of output format.",
//         "sampleInput": "example input",
//         "sampleOutput": "example output",
//         "tags": "comma,separated,tags"
//       }
//     `;

//     // ✅ Use Gemini 2.0 Flash (free) — 2.5 Pro is sometimes restricted
//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//     const result = await model.generateContent(prompt);
//     const text = result.response.text().trim();

//     console.log("🧩 Gemini raw response:", text);

//     // Try parsing JSON safely
//    let jsonResponse;
// try {
//   // 🧹 Clean any markdown or extra formatting
//   const cleanText = text.replace(/```json|```/g, "").trim();

//   // 🧩 Extract only JSON part from the text
//   const jsonMatch = cleanText.match(/\{[\s\S]*\}/);

//   if (jsonMatch) {
//     jsonResponse = JSON.parse(jsonMatch[0]);
//   } else {
//     throw new Error("No valid JSON found in AI response");
//   }
// } catch (err) {
//   console.error("JSON Parse Error:", err);
//   console.log("AI Raw Response:\n", text);

//   return res.json({
//     success: false,
//     message: "AI returned invalid format. Try again.",
//     raw: text, // 👀 optional, helps debug what AI sent
//   });
// }

//     res.json({ success: true, problem: jsonResponse });
//   } catch (error) {
//     console.error("Gemini Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to generate problem",
//       error: error.message,
//     });
//   }
// });

// module.exports = router;


// routes/geminiRoutes.js
const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Route: Generate DSA problem
router.post("/generate-dsa", async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ success: false, message: "Topic required." });

    const prompt = `
      You are a DSA question generator.
      Generate one unique coding problem related to "${topic}".
      Respond strictly in valid JSON like this:
      {
        "title": "Problem title",
        "difficulty": "Easy | Medium | Hard",
        "description": "Full problem statement.",
        "inputFormat": "Description of input format.",
        "outputFormat": "Description of output format.",
        "sampleInput": "example input",
        "sampleOutput": "example output",
        "tags": "comma,separated,tags"
      }
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    const cleanText = text.replace(/```json|```/g, "").trim();
    const match = cleanText.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No valid JSON found");

    const jsonResponse = JSON.parse(match[0]);
    res.json({ success: true, problem: jsonResponse });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate problem",
      error: error.message,
    });
  }
});

module.exports = router;
