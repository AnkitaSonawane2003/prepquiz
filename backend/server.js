// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Import routes
const testRoutes = require("./routes/testRoutes");
const geminiRoutes = require("./routes/geminiRoutes");
const testAttemptRoutes = require("./routes/testAttemptRoutes"); // ✅ newly added

// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS setup (allow frontend to communicate with backend)
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ✅ Base test route
app.get("/", (req, res) => res.send("PrepQuiz API is running 🚀"));

// ✅ API routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/teacher", require("./routes/teacher"));
app.use("/api/student", require("./routes/student"));
app.use("/api/announcement", require("./routes/announcement"));
app.use("/api/tests", testRoutes);
app.use("/api/testAttempts", testAttemptRoutes); // ✅ Added route for Test Attempts
app.use("/api/contact", require("./routes/contact"));
app.use("/api/problems", require("./routes/problemRoutes"));
app.use("/api/gemini", geminiRoutes);
app.use("/api/generate-questions", require("./routes/generateQuestions"));

// 🌍 Serve frontend (production build)
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "frontend", "dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
  );
}

// ❌ 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// 🧱 Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res
    .status(err.status || 500)
    .json({ success: false, message: err.message || "Internal Server Error" });
});

// 🟢 Connect DB and start server
(async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected Successfully");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
  }
})();
