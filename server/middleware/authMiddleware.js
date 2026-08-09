const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.protect = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No token provided.",
      });
    }

    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", decoded);   // 👈 Add this

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {

    console.log("Allowed Roles:", roles);      // 👈 Add this
    console.log("User Role:", req.user.role);  // 👈 Add this

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    next();
  };
};