const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
 userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
 },
 items: [
  {
   itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
   },
   quantity: Number,
   priceAtTime: Number,
   totalPrice: Number
  }
 ],
 orderTotal: Number,
 status: {
  type: String,
  default: "PLACED"
 },
 placedAt: {
  type: Date,
  default: Date.now
 }
},{ timestamps: true })

module.exports = mongoose.model("Order", orderSchema)
