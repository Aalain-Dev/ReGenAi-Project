require("dotenv").config();
const { resmune, jobDescription, selfDescription } = require("./src/services/temp.js");
const app = require("./src/app.js");
const connectDb = require("./src/config/database.js");
const generateInterviewReport = require("./src/services/ai.services.js");
generateInterviewReport({
  resmune,
  jobDescription,
  selfDescription,
});
connectDb();
app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});