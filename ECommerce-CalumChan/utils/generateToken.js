const jwt = require("jsonwebtoken");

// Stores ID, email, username
const generateToken = (id, email, username) => {
  const token = jwt.sign(
    { id, email, username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

module.exports = generateToken;
