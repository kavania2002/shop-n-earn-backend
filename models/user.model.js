const mongoose = require("mongoose");

const userType = Object.freeze({
  USER: "user",
  OWNER: "owner",
});

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: String,
    password: String,
    upi: String,
    city: String,
    longitude: Number,
    latitude: Number,
    mobile: Number,
    type: {
      type: String,
      enum: Object.values(userType),
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = new mongoose.model("User", userSchema);
