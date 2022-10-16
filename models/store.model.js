const mongoose = require("mongoose");
const Tier = require("../models/tier.model");

const storeSchema = new mongoose.Schema(
  {
    name: String,
    shopId: String,
    email: String,
    isStore: { type: Boolean, default: true },
    password: String,
    upi: String,
    city: String,
    longitude: Number,
    latitude: Number,
    mobile: Number,
    tierIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tier" }],
    image: {
      data: Buffer,
      contentType: String,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = new mongoose.model("Store", storeSchema);
