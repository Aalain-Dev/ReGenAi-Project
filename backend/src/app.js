const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()
const authrouter = require("./routes/auth.routes")
const cors  = require("cors")
const interviewrouter = require("./routes/interview.routes")
const allowedOrigins = [
  'http://localhost:5173',
];
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
}
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser());

app.use("/api/auth",authrouter)
app.use("/api/reports",interviewrouter)

module.exports = app