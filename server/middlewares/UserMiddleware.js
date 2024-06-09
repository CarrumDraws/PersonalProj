const validator = require("validator");

const createUserValidation = (req, res, next) => {
  const { username, password, email } = req.body;

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

  if (!validator.isAlphanumeric(username)) {
    return res.status(400).json({ message: "Username must be alphanumeric!" });
  }
  // {
  //   minLength: 8,
  //   minLowercase: 1,
  //   minUppercase: 1,
  //   minNumbers: 1,
  //   minSymbols: 1,
  //   returnScore: false,
  //   pointsPerUnique: 1,
  //   pointsPerRepeat: 0.5,
  //   pointsForContainingLower: 10,
  //   pointsForContainingUpper: 10,
  //   pointsForContainingNumber: 10,
  //   pointsForContainingSymbol: 10,
  // };
  // if (!validator.isStrongPassword(password)) {
  //   return res.status(400).json({ message: "Password is too weak!" });
  // }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid Email!" });
  }

  next();
};

const loginUserValidation = (req, res, next) => {
  const { email, username, password } = req.body;
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

const updateUserValidation = (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    validator.isEmpty(username) ||
    validator.isEmpty(email) ||
    validator.isEmpty(password)
  ) {
    return res.status(400).json({ message: "Missing required Fields!" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Email is invalid!" });
  }

  next();
};

module.exports = {
  createUserValidation,
  loginUserValidation,
  updateUserValidation,
};
