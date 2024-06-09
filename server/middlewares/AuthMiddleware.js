const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/User.js");

const jwtValidation = (req, res, next) => {
  try {
    // Get Token from Header
    const token = req.headers?.authorization?.split(" ")[1]; // Gets rid of "Bearer"
    if (!token || validator.isEmpty(token)) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // decode token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (
      !decoded.id ||
      !validator.isMongoId(decoded.id) ||
      !decoded.email ||
      !decoded.username
    ) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    // Assign id to req.body
    req.body.id = decoded.id;

    next();
  } catch (error) {
    console.error("JWT validation error:", error);
    return res.status(401).json({
      message: "jwtValidation Failed",
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    let { id } = req.body;
    const user = await User.findOne({ _id: id });
    if (!user || !user.admin) {
      return res.status(403).json({
        message: "Unauthorized: Not an Admin",
      });
    }
    next();
  } catch (error) {
    console.error("isAdmin error:", error);
    return res.status(500).json({
      message: "isAdmin Failed",
    });
  }
};

module.exports = { jwtValidation, isAdmin };
