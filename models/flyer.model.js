const mongoose = require("mongoose");

const flyerSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: {
    data: Buffer,
    contentType: String,
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
  },
});

module.exports = new mongoose.model("Flyer", flyerSchema);
