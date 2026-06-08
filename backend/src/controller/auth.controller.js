const { tokenblackist } = require("../models/blacklisttoken.model");
const userModel = require("../models/user.models");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Fields Not Found",
      });
    }

    const exsistingUser = await userModel.find({
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
      { id: user._id, username: createuser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.cookie("token", token);
    res.status(201).json({
      message: "user registered successfully",
      token,
    });
  } catch (e) {
    console.error("Error registering user:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const loginUser = (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password is missing",
      });
    }
    const User = await userModel.findOne({
email
    })
    if (!User){
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const match =  await bcrypt.compare(password , User.password)
     if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
     const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.cookies("token", token)
   res.status(200).json({
      message: "user logged in successfully",
      token,
    });
  } catch (e) {
     console.error("Error logging in user:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logoutController = (req,res)=>{
  const token = req.cookies.token

if (!token)
{
  return res.status(400).json({
    message:"Token Not Found"
  })
}
try{
const token_blacklist = await tokenblackist.create({
  token
})
res.clearCookie("token")
res.status(200).json({
      message: "user logged out successfully",
      token,
    });

}
catch(e){
  console.error("Error in logging out user:", e);
    return res.status(500).json({ message: "Internal server error" });
}
}
module.exports = { registerUser, loginUser,logoutController };
