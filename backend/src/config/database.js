const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (e) {
    // Don't start a half-broken server: a DB we can't reach means every
    // request would fail. Crash loudly so the platform restarts us.
    console.error("MongoDB connection failed:", e.message);
    process.exit(1);
  }
};

module.exports = connectDb;
