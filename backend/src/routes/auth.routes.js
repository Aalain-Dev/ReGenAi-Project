const { Router } = require("express");
const { registerUser, loginUser, logoutController, getme } = require("../controller/auth.controller");
const authmiddleware = require("../middleware/auth.middleware");
const authrouter = Router();

authrouter.post("/register",registerUser);
authrouter.post("/login",loginUser);
authrouter.post("/logout",logoutController);
authrouter.get("/get-me",authmiddleware, getme);

module.exports = authrouter;