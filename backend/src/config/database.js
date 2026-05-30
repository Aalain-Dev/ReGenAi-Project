const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    
    if (connect) {
      console.log("Connected To Database");
    } else {
      console.log("Failed to connect to database");
    }
  } catch (e) {
    console.log(e.message)
  }
};

module.exports = connectDb;