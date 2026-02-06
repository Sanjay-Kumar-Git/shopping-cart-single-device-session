const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User")
const auth = require("../middleware/auth")

// ======================
// SIGNUP
// ======================
router.post("/", async(req,res)=>{
 try{

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
   username: req.body.username,
   password: hashedPassword
  })

  await user.save()

  res.send("User Created")

 }catch(err){
  res.status(500).send("Error Creating User")
 }
})


// ======================
// LOGIN (Single Device)
// ======================
router.post("/login", async(req,res)=>{
 try{

  const user = await User.findOne({ username: req.body.username })
  if(!user){
   return res.status(400).send("Invalid username/password")
  }

  // 🔥 SINGLE DEVICE RESTRICTION
  if(user.token){
   return res.status(403).send("You cannot login on another device")
  }

  const validPass = await bcrypt.compare(req.body.password, user.password)
  if(!validPass){
   return res.status(400).send("Invalid username/password")
  }

  const token = jwt.sign(
   { _id: user._id },
   process.env.JWT_SECRET
  )

  user.token = token
  await user.save()

  res.send({ token })

 }catch(err){
  res.status(500).send("Login Error")
 }
})


// ======================
// LOGOUT
// ======================
router.post("/logout", auth, async(req,res)=>{
 try{

  req.user.token = null
  await req.user.save()

  res.send("Logged Out Successfully")

 }catch(err){
  res.status(500).send("Logout Error")
 }
})

module.exports = router
