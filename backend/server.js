require("dotenv").config();
const {
  resmune,
  jobDescription,
  selfDescription,
} = require("./src/services/temp.js");
const app = require("./src/app.js");
const connectDb = require("./src/config/database.js");
const generateInterviewReportOpenRouter = require("./src/services/openrouter.service.js");
const generateInterviewReportGroq = require("./src/services/groq.service.js");
const generateInterviewReportGemini = require("./src/services/gemini.service.js");
// generateInterviewReportGemini({
//   resmune,   
//   jobDescription,
//   selfDescription,
// });

// generateInterviewReportOpenRouter({
//   resmune,
//   jobDescription,
//   selfDescription,
// });
// generateInterviewReportGroq({
//   resmune, 
//   jobDescription,
//   selfDescription,
// });
connectDb();
app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
