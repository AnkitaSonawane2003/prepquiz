// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");
// const connectDB = require("./config/db");
// const testRoutes = require("./routes/testRoutes");

// // 📦 Load Environment Variables
// dotenv.config();

// // Initialize App
// const app = express();
// const PORT = process.env.PORT || 5000;

// // ⚙️ Connect to MongoDB Atlas
// connectDB()
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch((err) => console.error("❌ MongoDB connection failed:", err));

// // 🧩 Middleware Setup
// app.use(cors());
// app.use(express.json());

// // 🚀 API ROUTES
// app.use("/api/auth", require("./routes/auth"));         // Admin login
// app.use("/api/admin", require("./routes/admin"));       // Admin creation
// app.use("/api/teacher", require("./routes/teacher"));   // Teacher registration & login
// app.use("/api/student", require("./routes/student"));   // Student registration & login
// app.use("/api/announcement", require("./routes/announcement"));
// app.use("/api/tests", testRoutes);                      // ✅ Tests route
// app.use("/api/contact", require("./routes/contact"));
// app.use('/api/problems', require('./routes/problemRoutes'));

// // ========================================
// // 🌍 Serve React Frontend (Production Mode)
// // ========================================
// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1, "frontend", "dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"));
//   });
// }

// // ========================================
// // 🟢 Start the Server
// // ========================================
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const connectDB = require("./config/db");
const testRoutes = require("./routes/testRoutes");
const geminiRoutes = require("./routes/geminiRoutes");

// 📦 Load Environment Variables
dotenv.config();

// Initialize App
const app = express();
const PORT = process.env.PORT || 5000;

// ⚙️ Middleware Setup
app.use(cors());
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(morgan("dev")); // log all incoming requests

// ✅ Basic Route to Check Server
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🚀 API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/teacher", require("./routes/teacher"));
app.use("/api/student", require("./routes/student"));
app.use("/api/announcement", require("./routes/announcement"));
app.use("/api/tests", testRoutes); // ✅ Keep this for your test system
app.use("/api/contact", require("./routes/contact"));
app.use("/api/problems", require("./routes/problemRoutes"));

app.use("/api/gemini", geminiRoutes);

// ========================================
// 🌍 Serve React Frontend (Production Mode)
// ========================================

app.use("/api/generate-questions", require("./routes/generateQuestions"));


// 🌍 Serve Frontend (Production Mode)
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
