// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const connectDB = require("./config/db");

// 📦 Load Environment Variables
dotenv.config();

// Initialize App
const app = express();
const PORT = process.env.PORT || 5000;

// ⚙️ Middleware Setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ✅ Basic Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🚀 API Routes
try {
  app.use("/api/auth", require("./routes/auth"));
  app.use("/api/admin", require("./routes/admin"));
  app.use("/api/teacher", require("./routes/teacher"));
  app.use("/api/student", require("./routes/student"));
  app.use("/api/announcement", require("./routes/announcement"));
  app.use("/api/tests", require("./routes/testRoutes"));
  app.use("/api/contact", require("./routes/contact"));
  app.use("/api/problems", require("./routes/problemRoutes"));
  app.use("/api/gemini", require("./routes/geminiRoutes"));
  app.use("/api/submissions", require("./routes/submissionRoutes"));
  app.use("/api/compiler", require("./routes/compiler"));
  app.use("/api/evaluation", require("./routes/evaluation"));
  app.use("/api/generate-questions", require("./routes/generateQuestions"));
} catch (err) {
  console.error("❌ Failed to load routes:", err);
}

// 🌍 Serve Frontend (Production)
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "frontend", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"));
  });
}

// ⚠️ 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// 🛠️ Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// 🟢 Connect DB and Start Server
(async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
  }
})();
