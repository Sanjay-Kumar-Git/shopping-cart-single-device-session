const express = require("express")
const router = express.Router()

const Order = require("../models/Order")
const Cart = require("../models/Cart")
const auth = require("../middleware/auth")


// ======================
// CHECKOUT → CREATE ORDER
// ======================
router.post("/", auth, async(req,res)=>{
 try{

  const cart = await Cart.findOne({ userId: req.user._id })

  if(!cart || cart.items.length === 0){
   return res.status(400).send("Cart is empty")
  }

  // Calculate Total
  const orderTotal = cart.items.reduce(
   (sum, item)=> sum + item.totalPrice,
   0
  )

  const order = new Order({
   userId: req.user._id,
   items: cart.items,
   orderTotal
  })

  await order.save()

  // 🔥 CLEAR CART AFTER ORDER
  cart.items = []
  await cart.save()

  res.send(order)

 }catch(err){
  res.status(500).send("Order creation failed")
 }
})


// ======================
// ORDER HISTORY
// ======================
router.get("/", auth, async(req,res)=>{
 try{

  const orders = await Order.find({
   userId: req.user._id
  }).populate("items.itemId")

  res.send(orders)

 }catch(err){
  res.status(500).send("Error fetching orders")
 }
})

module.exports = router
