const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/generate-dsa", async (req, res) => {
  try {
    const { topic, difficulty } = req.body;

    if (!topic)
      return res.status(400).json({ success: false, message: "Topic required" });

    const prompt = `
Generate a DSA problem in STRICT JSON ONLY.

{
  "title": "",
  "difficulty": "${difficulty}",
  "description": "",
  "inputFormat": "",
  "outputFormat": "",
  "sampleInput": "",
  "sampleOutput": "",
  "tags": "comma,separated,list",
  "hiddenTestCases": [
    { "input": "2", "output": "4" },
    { "input": "5", "output": "25" }
  ]
}

Topic: ${topic}
DO NOT return markdown. Return only pure JSON.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();

    const clean = raw.replace(/```json|```/g, "").trim();
    const jsonMatch = clean.match(/\{[\s\S]*\}/);

    if (!jsonMatch) throw new Error("No JSON detected");

    const parsed = JSON.parse(jsonMatch[0]);

    // Ensure hidden test cases always exist
    if (!parsed.hiddenTestCases || parsed.hiddenTestCases.length === 0) {
      parsed.hiddenTestCases = [
        { input: "3", output: "6" },
        { input: "7", output: "14" }
      ];
    }

    return res.json({ success: true, problem: parsed });

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
