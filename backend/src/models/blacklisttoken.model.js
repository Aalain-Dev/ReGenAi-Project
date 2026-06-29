const mongoose = require("mongoose");

const blacklisttoken = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    // Auto-remove blacklisted tokens once they would have expired anyway,
    // so this collection doesn't grow forever. Matches the 1h JWT expiry.
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 60 * 60 * 1000),
      index: { expires: 0 },
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
