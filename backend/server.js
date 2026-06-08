require("dotenv").config();

const app = require("./src/app.js");
const connectDb = require("./src/config/database.js")

connectDb()
app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});