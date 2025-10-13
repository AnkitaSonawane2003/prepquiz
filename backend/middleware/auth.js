// middleware/auth.js
const jwt = require("jsonwebtoken");

/**
 * Middleware to verify JWT token sent in Authorization header.
 * Attaches decoded user info to req.user if token is valid.
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token part

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "prep-quiz");
    req.user = decoded; // attach user info to request object
    next(); // proceed to next middleware or route
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = verifyToken;
