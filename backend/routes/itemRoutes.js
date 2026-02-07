const express = require("express")
const router = express.Router()

const Item = require("../models/Item")

// ======================
// CREATE ITEM
// ======================
router.post("/", async(req,res)=>{
 try{

  const item = new Item({
   name:req.body.name,
   price:req.body.price,
   isAvailable:req.body.isAvailable ?? true,
   imageUrl:req.body.imageUrl,
   description:req.body.description,
   category:req.body.category
  })

  await item.save()
  res.send(item)

 }catch(err){
  res.status(500).send("Error creating item")
 }
})


// ======================
// GET ALL ITEMS
// ======================
router.get("/", async(req,res)=>{
 try{

  const items = await Item.find()
  res.send(items)

 }catch(err){
  res.status(500).send("Error fetching items")
 }
})

module.exports = router
