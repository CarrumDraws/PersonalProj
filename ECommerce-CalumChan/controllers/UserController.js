// Main DB Connection Logic Happens Here!
const generateToken = require("../utils/generateToken.js");

const bcrypt = require("bcryptjs");

const User = require("../models/User.js");
const Product = require("../models/Product.js");

const signup = async (req, res) => {
  try {
    // Isnt the unique aspect automatic? : Yes, but it'll throw an ugly error
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User Already Exists" });
    }

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

const logout = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    let user;
    // check if email exists
    if (email) {
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
    const { id, email, username, password } = req.body;

    const user = await User.findById(id).populate({
      path: "favorites", // the field in User you want to populate
      select: "-__v", // Exclude '__v' and '-todos' from return
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json(error);
  }
};

const setFavorites = async (req, res) => {
  try {
    const { id, email, username, password } = req.body;
    const { productid } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const product = await Product.findById(productid);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Use .findIndex to find the index in user.favorites that matches productid
    const index = user.favorites.findIndex(
      // Cast fav._id's ObjectId type -> String
      (fav) => fav._id.toString() === productid
    );

    if (index === -1) user.favorites.push(product); // Add Product
    else user.favorites.splice(index, 1); // Remove Product

    await user.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    // Get all users that AREN'T admins
    const users = await User.find({ admin: false });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserFavorites = async (req, res) => {
  let { id } = req.params;

  try {
    // Get all users that AREN'T admins
    const user = await User.findById(id).populate({
      path: "favorites", // the field in User you want to populate
      select: "-_id -__v", // Exclude '__v' and '-todos' from return
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  getFavorites,
  setFavorites,
  getUsers,
  getUserFavorites,
};
