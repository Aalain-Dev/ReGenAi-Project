const { Router } = require("express");
const authmiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/file.middleware");
const { getallreports, getsinglereport, generatereport } = require("../controller/Interview.controller");
const interviewrouter = Router();


// This will upload a file. 
interviewrouter.post("/",
authmiddleware,
upload.single("resume"),
generatereport
)

// We will get all the reports. 
interviewrouter.get("/getallreports",
authmiddleware,
getallreports
)

// This will get a single file. 
interviewrouter.get("/getreports/:id",
authmiddleware,
getsinglereport
)
module.exports = interviewrouter