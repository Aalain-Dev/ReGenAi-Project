const mongoose = require("mongoose");

const blacklisttoken = new mongoose.Schema(
  {
    toke: {
      typr: String,
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