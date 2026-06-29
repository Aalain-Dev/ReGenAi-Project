const { Router } = require("express");
const authmiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/file.middleware");
const { getallreports, getsinglereport, generatereport } = require("../controller/Interview.controller");
const interviewrouter = Router();


/**
 * @openapi
 * /api/reports:
 *   post:
 *     tags: [Reports]
 *     summary: Generate an interview report from a resume
 *     description: >
 *       Uploads a PDF resume, extracts its text, and generates a tailored
 *       interview report. Subject to a daily generation limit per user.
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [resume]
 *             properties:
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: PDF resume file
 *               selfDescription:
 *                 type: string
 *               jobDescription:
 *                 type: string
 *     responses:
 *       200:
 *         description: Report created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: report created
 *                 storedata:
 *                   $ref: '#/components/schemas/InterviewReport'
 *       400:
 *         description: Resume file missing or text could not be extracted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       429:
 *         description: Daily report generation limit reached
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       503:
 *         description: Report generation service unavailable
 *       500:
 *         description: Failed to generate report
 */
interviewrouter.post("/",
authmiddleware,
upload.single("resume"),
generatereport
)

/**
 * @openapi
 * /api/reports/getallreports:
 *   get:
 *     tags: [Reports]
 *     summary: List the current user's reports
 *     description: Returns all reports for the user (resume and self description omitted), newest first.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Reports fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/InterviewReport'
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Failed to fetch reports
 */
interviewrouter.get("/getallreports",
authmiddleware,
getallreports
)

/**
 * @openapi
 * /api/reports/getreports/{id}:
 *   get:
 *     tags: [Reports]
 *     summary: Get a single report by id
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Report id (Mongo ObjectId)
 *     responses:
 *       200:
 *         description: Report fetched
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: report fetched
 *                 data:
 *                   $ref: '#/components/schemas/InterviewReport'
 *       400:
 *         description: Invalid report id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       404:
 *         description: Report not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Failed to fetch report
 */
interviewrouter.get("/getreports/:id",
authmiddleware,
getsinglereport
)
module.exports = interviewrouter
