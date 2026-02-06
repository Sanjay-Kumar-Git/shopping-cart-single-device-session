require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const userRoutes = require("./routes/userRoutes")
const itemRoutes = require("./routes/itemRoutes")
const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require("./routes/orderRoutes")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err))

// Routes
app.use("/api/users", userRoutes)
app.use("/api/items", itemRoutes)
app.use("/api/carts", cartRoutes)
app.use("/api/orders", orderRoutes)

// Health Check
app.get("/", (req,res)=>{
 res.send("API Running")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
 console.log(`Server running on port ${PORT}`)
})
