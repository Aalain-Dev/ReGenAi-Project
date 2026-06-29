const { Router } = require("express");
const { registerUser, loginUser, logoutController, getme } = require("../controller/auth.controller");
const authmiddleware = require("../middleware/auth.middleware");
const { authLimiter } = require("../middleware/rateLimit.middleware");
const authrouter = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Creates an account and sets an httpOnly `token` session cookie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Missing fields, invalid email, or password too short
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: An account with this email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       429:
 *         description: Too many requests (rate limited)
 *       500:
 *         description: Internal server error
 */
authrouter.post("/register", authLimiter, registerUser);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Log in
 *     description: Authenticates a user and sets an httpOnly `token` session cookie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Email and password are required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       429:
 *         description: Too many requests (rate limited)
 *       500:
 *         description: Internal server error
 */
authrouter.post("/login", authLimiter, loginUser);

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Log out
 *     description: Blacklists the current token and clears the session cookie.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Token not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
authrouter.post("/logout", logoutController);

/**
 * @openapi
 * /api/auth/get-me:
 *   get:
 *     tags: [Auth]
 *     summary: Get the current authenticated user
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user details
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
authrouter.get("/get-me", authmiddleware, getme);

module.exports = authrouter;
