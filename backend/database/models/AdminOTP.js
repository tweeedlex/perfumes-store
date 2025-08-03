const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminId: { type: mongoose.Types.ObjectId, required: true, ref: "Admin" },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

module.exports = adminSchema;
