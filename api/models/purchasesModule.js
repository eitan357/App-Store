const mongoose = require("mongoose");

let purchasesSchema = new mongoose.Schema({
  customerId: String,
  productId: String,
  date: Date,
  quantity: Number,
});

module.exports = mongoose.model("purchases", purchasesSchema);
