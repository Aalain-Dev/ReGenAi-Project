const { Router } = require("express");
const { registerUser, loginUser, logoutController, getme } = require("../controller/auth.controller");
const authmiddleware = require("../middleware/auth.middleware");
const { authLimiter } = require("../middleware/rateLimit.middleware");
const authrouter = Router();

authrouter.post("/register", authLimiter, registerUser);
authrouter.post("/login", authLimiter, loginUser);
authrouter.post("/logout", logoutController);
authrouter.get("/get-me", authmiddleware, getme);

module.exports = authrouter;