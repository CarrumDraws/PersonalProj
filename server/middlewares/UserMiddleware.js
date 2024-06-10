const validator = require("validator");

const createUserValidation = (req, res, next) => {
  const { username, password, email } = req.body;

  // Sanitize inputs
  req.body.username = validator.escape(username.trim());
  req.body.password = validator.escape(password.trim());
  req.body.email = validator.normalizeEmail(email.trim());

  // Validate inputs
  if (
    !username ||
    !password ||
    !email ||
    validator.isEmpty(username) ||
    validator.isEmpty(password) ||
    validator.isEmpty(email)
  ) {
    return res.status(400).json({ message: "Missing required fields!" });
  }

  if (
    !validator.isLength(username, { min: 5, max: 15 }) ||
    !validator.isAlphanumeric(username)
  ) {
    console.log("Username must be 5-15 characters long and alphanumeric!");
    return res.status(400).json({
      message: "Username must be 5-15 characters long and alphanumeric!",
    });
  }

  if (!validator.isEmail(email)) {
    console.log("Invalid Email!");
    return res.status(400).json({ message: "Invalid Email!" });
  }

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
  if (!passwordPattern.test(password)) {
    console.log(
      "Password must be 6-10 characters long and include uppercase, lowercase, number, and special character."
    );
    return res.status(400).json({
      message:
        "Password must be 6-10 characters long and include uppercase, lowercase, number, and special character.",
    });
  }

  next();
};

const loginUserValidation = (req, res, next) => {
  let { email, username, password } = req.body;

  if (email) {
    email = email.trim();
    req.body.email = validator.normalizeEmail(email);
  }

  if (username) {
    username = username.trim();
    req.body.username = validator.escape(username);
  }

  password = password.trim();
  req.body.password = validator.escape(password);

  // Validate inputs
  if (
    (!email && !username) ||
    !password ||
    (validator.isEmpty(email) && validator.isEmpty(username)) ||
    validator.isEmpty(password)
  ) {
    return res.status(400).json({ message: "Missing required fields!" });
  }

  next();
};

module.exports = {
  createUserValidation,
  loginUserValidation,
};
