const mongoose = require("mongoose");

import categoryModel from "./category.model";

const storeSchema = new mongoose.Schema(
  {
    name: String,
    shopId: String,
    email: String,
    password: String,
    upi: String,
    city: String,
    longitude: Number,
    latitude: Number,
    mobile: Number,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      // * check that user type should be owner
      ref: "User",
    },
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

export default new mongoose.model("Store", storeSchema);
