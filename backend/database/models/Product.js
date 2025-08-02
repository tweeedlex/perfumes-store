const mongoose = require("mongoose");

module.exports = mongoose.Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	discountPrice: { type: Number },
	label: { type: String },
	stock: { type: Number, default: 1 },
	description: { type: String }
});
