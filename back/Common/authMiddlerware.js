const jwt = require("jsonwebtoken");

// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization;
//   // const token = req.sign;
//   console.log("token Backend", token);

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   jwt.verify(token.split(" ")[1], "hdfjhdjkhfuidfhjsdfhj", (err, decoded) => {
//     if (err) {
//       console.log("Token verification error:", err);
//       return res.status(401).json({ message: "Failed to authenticate token" });
//     }

//     req.user = decoded;

//     console.log("Decoded token:", decoded);

//     next();
//   });
// };

// module.exports = authenticate;

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if authorization header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "No token provided or Invalid authorization header format",
    });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  // Log token for debugging purposes (optional)
  console.log("Token:", token);

  jwt.verify(token, "hdfjhdjkhfuidfhjsdfhj", (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      // Handle specific errors (optional)
      if (err.name === "JsonWebTokenError") {
        // JWT malformed or invalid signature
        return res.status(401).json({ message: "Invalid token" });
      } else if (err.name === "TokenExpiredError") {
        // Expired token
        return res.status(401).json({ message: "Token expired" });
      } else {
        // Other errors
        return res.status(500).json({ message: "Internal server error" }); // Generic error for unexpected issues
      }
    }

    req.user = decoded; // Store decoded user data in request object
    console.log("Decoded token:", decoded);
    next();
  });
};

module.exports = authenticate;
