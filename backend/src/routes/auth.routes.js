const { Router } = require("express");
const { registerUser, loginUser, logoutController } = require("../controller/auth.controller");
const authrouter = Router();

authrouter.post("/register",registerUser);
authrouter.post("/login",loginUser);
authrouter.post("/logout",logoutController);

module.exports = authrouter;
