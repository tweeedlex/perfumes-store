const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  filterId: { type: mongoose.Schema.Types.ObjectId, ref: "Filter", required: true },
  value: { type: String, required: true }
});

schema.index({ filterId: 1, value: 1 }, { unique: true });

module.exports = schema;