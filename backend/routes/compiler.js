const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.post("/run", async (req, res) => {
  try {
    const { language_id, code, stdin } = req.body;

    if (!code || !language_id) {
      return res.status(400).json({ success: false, message: "Missing code or language_id" });
    }

    // ✅ Use the open Judge0 endpoint (no API key required)
    const response = await fetch("https://ce.judge0.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_code: code,
        language_id,
        stdin,
      }),
    });

    const result = await response.json();
    console.log("Judge0 Result:", result);

    res.json({
      success: true,
      stdout: result.stdout,
      stderr: result.stderr,
      compile_output: result.compile_output,
      status: result.status ? result.status.description : "No status",
    });
  } catch (error) {
    console.error("Compiler Error:", error);
    res.status(500).json({ success: false, message: "Server error while running code" });
  }
});

module.exports = router;
