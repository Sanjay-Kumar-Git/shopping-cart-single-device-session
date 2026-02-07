const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({

 name:{
  type:String,
  required:true
 },

 price:{
  type:Number,
  required:true
 },

 isAvailable:{
  type:Boolean,
  default:true
 },

 imageUrl:{
  type:String,
  required:true
 },

 description:{
  type:String,
  default:""
 },

 category:{
  type:String,
  default:"general"
 }

},{ timestamps:true })

module.exports = mongoose.model("Item", itemSchema)
