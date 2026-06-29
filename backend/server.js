require("dotenv").config();

const app = require("./src/app.js");
const connectDb = require("./src/config/database.js");
const generateInterviewReportGroq = require("./src/services/groq.service.js");
connectDb();
app.listen(process.env.PORT, () => {
  console.log("App Connected Successfully")
});
