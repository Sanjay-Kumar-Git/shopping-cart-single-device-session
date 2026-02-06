const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
 name: {
  type: String,
  required: true
 },
 price: {
  type: Number,
  required: true
 },
 isAvailable: {
  type: Boolean,
  default: true   // By default item is in stock
 }
},{ timestamps: true })

module.exports = mongoose.model("Item", itemSchema)
