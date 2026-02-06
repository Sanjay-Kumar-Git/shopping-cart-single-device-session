const express = require("express")
const router = express.Router()

const Cart = require("../models/Cart")
const Item = require("../models/Item")
const auth = require("../middleware/auth")


// ======================
// ADD ITEM TO CART
// ======================
router.post("/", auth, async(req,res)=>{
 try{

  const { itemId } = req.body

  const item = await Item.findById(itemId)
  if(!item) return res.status(404).send("Item not found")

  if(!item.isAvailable){
   return res.status(400).send("Item out of stock")
  }

  let cart = await Cart.findOne({ userId: req.user._id })

  if(!cart){
   cart = new Cart({
    userId: req.user._id,
    items: []
   })
  }

  // 🔥 CHECK IF ITEM ALREADY EXISTS
  const existingItem = cart.items.find(
    i => i.itemId.toString() === itemId
  )

  if(existingItem){
   existingItem.quantity += 1
   existingItem.totalPrice = existingItem.quantity * existingItem.priceAtTime
  }else{
   cart.items.push({
    itemId,
    quantity: 1,
    priceAtTime: item.price,
    totalPrice: item.price
   })
  }

  await cart.save()

  res.send(cart)

 }catch(err){
  res.status(500).send("Cart Error")
 }
})



// ======================
// GET USER CART
// ======================
router.get("/", auth, async(req,res)=>{
 try{

  const cart = await Cart.findOne({ userId: req.user._id })
   .populate("items.itemId")

  res.send(cart || { items: [] })

 }catch(err){
  res.status(500).send("Error fetching cart")
 }
})

module.exports = router
