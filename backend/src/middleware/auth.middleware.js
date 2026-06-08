const { tokenblackist } = require("../models/blacklisttoken.model");
const jwt = require('jsonwebtoken');

const authmiddleware = async(req, res, next) => {
    const token = req.cookies.token;
    if (!token)
{
  return res.status(400).json({
    message:"Token Not Found"
  })
}
  try {
    const blacklisted = await tokenblackist.findOne({
        token
    })
     if (blacklisted) {
            return res.status(401).json({ message: "Invalid token" });
        } 
        const decode =  jwt.verify(token,process.env.JWT)
        req.user = decode
        next()
  } catch (e) {
      if (e.name === 'JsonWebTokenError' || e.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
  }


module.exports = authmiddleware;
