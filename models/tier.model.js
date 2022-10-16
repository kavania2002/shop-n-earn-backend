const mongoose = require("mongoose");

const tierSchema = new mongoose.Schema({
  name: String,
  description: String,
  level: Number,
  minValue: Number,
  maxValue: Number,
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
  amountToCoinRatio: Number,
  coinToAmountRatio: Number,

}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

module.exports = new mongoose.model("Tier", tierSchema);
