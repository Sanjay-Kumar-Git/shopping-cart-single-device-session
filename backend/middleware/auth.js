const jwt = require("jsonwebtoken")
const User = require("../models/User")

const auth = async (req,res,next)=>{
 try {

  const token = req.header("Authorization")

  if(!token){
   return res.status(401).send("Access Denied")
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET)

  const user = await User.findById(verified._id)

  // 🔥 SINGLE DEVICE CHECK
  if(!user || user.token !== token){
   return res.status(401).send("Session Invalid")
  }

  req.user = user
  next()

 } catch(err){
  res.status(400).send("Invalid Token")
 }
}

module.exports = auth
