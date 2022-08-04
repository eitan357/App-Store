const mongoose = require("mongoose");

let customersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  city: String,
});

module.exports = mongoose.model("customers", customersSchema);
