const mongoose = require("mongoose");

const blacklisttoken = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const tokenblackist = mongoose.model("BlacklisttokenSchema", blacklisttoken)

module.exports = {
    tokenblackist
}