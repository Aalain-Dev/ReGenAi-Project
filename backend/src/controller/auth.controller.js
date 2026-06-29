const { tokenblackist } = require("../models/blacklisttoken.model");
const userModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieOptions = require("../utils/cookieOptions");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

const signToken = (user) =>
  jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      return res.status(400).json({
        message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "An account with this email already exists" });
    }

    const hash = await bcrypt.hash(password, 12);
    const createdUser = await userModel.create({
      username,
      email,
      password: hash,
    });

    const token = signToken(createdUser);
    res.cookie("token", token, cookieOptions);
    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken(user);
    res.cookie("token", token, cookieOptions);
    res.status(200).json({ message: "User logged in successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logoutController = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: "Token not found" });
  }
  try {
    await tokenblackist.create({ token });
    res.clearCookie("token", cookieOptions);
    res.status(200).json({ message: "User logged out successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getme = async (req, res) => {
  try {
    const finduser = await userModel.findById(req.user.id);
    if (!finduser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "user details",
      user: {
        user_id: finduser._id,
        username: finduser.username,
        email: finduser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { registerUser, loginUser, logoutController, getme };
