// Main DB Connection Logic Happens Here!
const generateToken = require("../utils/generateToken.js");

const bcrypt = require("bcryptjs");

const User = require("../models/User.js");

const signup = async (req, res) => {
  try {
    // Isnt the unique aspect automatic? : Yes, but it'll throw an ugly error
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (existingUser)
      return res.status(400).json({ message: "User Already Exists" });

    req.body.password = await bcrypt.hash(
      req.body.password,
      Number(process.env.SALT)
    );

    const user = new User(req.body);
    await user.save();

    // Stores ID, email, username
    const token = generateToken(user._id, req.body.email, req.body.username);

    // Generate + Return { jwt: {data}, user: {data} }
    res.status(200).json({ token: token, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    let user;
    // check if email exists
    if (email) {
      console.log("Hello");
      user = await User.findOne({ email }).lean().exec();
      if (!user) {
        return res.status(401).json({ message: "Invalid Email" });
      }
    } else {
      user = await User.findOne({ username }).lean().exec();
      if (!user) {
        return res.status(401).json({ message: "Invalid Username" });
      }
    }
    console.log(user);

    // check if Password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Stores ID, email, username
    const token = generateToken(user._id, user.email, user.username);

    // Generate + Return { jwt: {data}, user: {data} }
    res.status(200).json({ token: token, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getFavorites = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findById(id).populate({
      path: "likes", // the field in User you want to populate
      select: "-_id -__v", // Exclude '__v' and '-todos' from return
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.likes);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, email, username, password } = req.body;
    console.log(id + " " + email + " " + username + " " + password);

    const existingUser = await User.findOne({ email: email });

    if (existingUser && existingUser._id != id)
      return res.status(400).json({ message: "Email Already Taken" });

    req.body.password = await bcrypt.hash(password, Number(process.env.SALT));

    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // Stores ID, email, username
    const token = generateToken(id, email, username);

    // Generate + Return { jwt: {data}, user: {data} }
    res.status(200).json({ token: token, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { getFavorites, updateUser, signup, login };
