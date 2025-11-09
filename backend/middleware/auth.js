const jwt = require("jsonwebtoken");
const Student = require("../models/Student"); // or User model, depending on your schema
const Teacher = require("../models/Teacher");

const verifyToken = async (req, res, next) => {
  try {
    // 1️⃣ Check for Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Authorization header missing" });
    }

    // 2️⃣ Ensure token starts with "Bearer "
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Invalid authorization format" });
    }

    // 3️⃣ Extract token
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Token not provided" });
    }

    // 4️⃣ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretKey");

    // 5️⃣ Find user (optional — comment this if token already contains all info)
    const user = await Student.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 6️⃣ Attach user object to request
    req.user = user; // ✅ This will have _id, name, email, etc.

    // 7️⃣ Continue to next middleware or route
    next();
  } catch (error) {
    console.error("❌ JWT verification failed:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};


const verifyTeacherToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Authorization header missing" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token not provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretKey");

    const teacher = await Teacher.findById(decoded.id).select("-password");
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    req.user = teacher; // ✅ attach teacher to req.user
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};




module.exports = verifyToken;
