const jwt = require("jsonwebtoken");
const validator = require("validator");

const getProductsValidation = (req, res, next) => {
  try {
    // Check Token from Header
    const token = req.headers?.authorization?.split(" ")[1];
    if (token && !validator.isEmpty(token)) {
      // decode token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      if (decoded.id && validator.isMongoId(decoded.id)) {
        req.body.id = decoded.id; // Assign id to req.body
      }
    }

    const { page, brand, type } = req.query;

    if (!page || !validator.isNumeric(page)) {
      return res.status(400).json({ message: "invalid Page" });
    }
    req.body.page = page; // Convert page to integer

    // Handle brand and type as arrays or null
    req.body.brand = brand ? (Array.isArray(brand) ? brand : [brand]) : null;
    req.body.type = type ? (Array.isArray(type) ? type : [type]) : null;

    next();
  } catch (error) {
    console.error("getProductsValidation error:", error);
    return res.status(401).json({
      message: "getProductsValidation Failed",
    });
  }
};

module.exports = {
  getProductsValidation,
};
