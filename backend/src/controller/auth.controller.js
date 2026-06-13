const { tokenblackist } = require("../models/blacklisttoken.model");
const userModels = require("../models/user.models");
const userModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Fields Not Found",
      });
    }

    const exsistingUser = await userModel.findOne({
      email,
    });
    if (exsistingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }
    const hash = await bcrypt.hash(password, 10);
    const createuser = await userModel.create({
      username,
      email,
      password: hash,
    });
    const token = jwt.sign(
      { id: createuser._id, username: createuser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.cookie("token", token);
    res.status(201).json({
      message: "user registered successfully",
      token,
    });
  } catch (e) {
    console.error("Error registering user:", e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password is missing",
      });
    }
    const User = await userModel.findOne({
      email,
    });
    console.log(User);
    if (!User) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const match = await bcrypt.compare(password, User.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: User._id, username: User.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.cookie("token", token);
    res.status(200).json({
      message: "user logged in successfully",
      token,
    });
  } catch (e) {
    console.error("Error logging in user:", e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logoutController = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      message: "Token Not Found",
    });
  }
  try {
    const token_blacklist = await tokenblackist.create({
      token,
    });
    res.clearCookie("token");
    res.status(200).json({
      message: "user logged out successfully",
      token,
    });
  } catch (e) {
    console.error("Error in logging out user:", e);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getme = async (req, res) => {
  const user = req.user.id;
  try {
    const finduser = await userModel.findById(user);
    res.status(200).json({
      message: "user details",
      user_id: finduser._id,
      username: finduser.username,
      email: finduser.email,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error from get me controller",
      error: e.message,
    });
  }
};
module.exports = { registerUser, loginUser, logoutController, getme };
