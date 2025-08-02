const mongoose = require("mongoose");

module.exports = mongoose.Schema({
  filterId: { type: mongoose.Schema.Types.ObjectId, ref: "Filter", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  value: { type: String, required: true }
});
