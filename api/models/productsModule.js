const mongoose = require("mongoose");

let productsSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

module.exports = mongoose.model("products", productsSchema);
