const mongoose = require("mongoose");

module.exports = mongoose.Schema({
  contact: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  shipping: {
    // to be implemented with Nova Post API integration
  },
  paymentMethod: {
    // to be implemented with payment system integration
  }
});
