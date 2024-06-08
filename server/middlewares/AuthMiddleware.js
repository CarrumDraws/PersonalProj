const jwt = require("jsonwebtoken");
const validator = require("validator");

const jwtValidation = (req, res, next) => {
  // Get Token from Header
  const token = req.headers?.authorization?.split(" ")[1]; // Gets rid of "Bearer"
  if (!token || validator.isEmpty(token)) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  // decode token
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(decoded);
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
};

module.exports = jwtValidation;
