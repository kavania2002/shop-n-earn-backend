const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    longitude: Number,
    latitude: Number,
    address: String,
    email: String,
    mobile: Number,
    password: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = new mongoose.model("User", userSchema);
