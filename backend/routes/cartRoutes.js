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

router.patch("/:itemId/inc", auth, async (req,res)=>{
 try{

  const cart = await Cart.findOne({ userId:req.user._id })
  if(!cart) return res.status(404).send("Cart not found")

  const cartItem = cart.items.find(
   i => i.itemId.toString() === req.params.itemId
  )

  if(!cartItem) return res.status(404).send("Item not in cart")

  const item = await Item.findById(req.params.itemId)

  cartItem.quantity += 1
  cartItem.totalPrice = cartItem.quantity * item.price

  await cart.save()

  res.send(cart)

 }catch(err){
  res.status(500).send("Increase qty failed")
 }
})

router.patch("/:itemId/dec", auth, async (req,res)=>{
 try{

  const cart = await Cart.findOne({ userId:req.user._id })
  if(!cart) return res.status(404).send("Cart not found")

  const cartItemIndex = cart.items.findIndex(
   i => i.itemId.toString() === req.params.itemId
  )

  if(cartItemIndex === -1)
   return res.status(404).send("Item not in cart")

  const item = await Item.findById(req.params.itemId)

  cart.items[cartItemIndex].quantity -= 1

  if(cart.items[cartItemIndex].quantity <= 0){
   cart.items.splice(cartItemIndex,1)
  }else{
   cart.items[cartItemIndex].totalPrice =
    cart.items[cartItemIndex].quantity * item.price
  }

  await cart.save()

  res.send(cart)

 }catch(err){
  res.status(500).send("Decrease qty failed")
 }
})

router.delete("/:itemId", auth, async (req,res)=>{
 try{

  const cart = await Cart.findOne({ userId:req.user._id })
  if(!cart) return res.status(404).send("Cart not found")

  cart.items = cart.items.filter(
   i => i.itemId.toString() !== req.params.itemId
  )

  await cart.save()

  res.send(cart)

 }catch(err){
  res.status(500).send("Remove item failed")
 }
})


module.exports = router
