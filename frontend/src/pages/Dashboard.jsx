import { useEffect, useState } from "react"
import API from "../api/axios"

function Dashboard(){

 const [items, setItems] = useState([])
 const [loading, setLoading] = useState(true)

 useEffect(()=>{
  fetchItems()
 },[])

 const fetchItems = async ()=>{
  try{
   const res = await API.get("/items")
   setItems(res.data)
  }catch(err){
   alert("Error fetching items")
  }finally{
   setLoading(false)
  }
 }

 // ADD TO CART
 const addToCart = async(itemId)=>{
  try{
   await API.post("/carts",{ itemId })
   alert("Added to cart")
  }catch(err){
   alert("Error adding to cart")
  }
 }

 // VIEW CART
 const viewCart = async ()=>{
  try{
   const res = await API.get("/carts")
   alert(JSON.stringify(res.data,null,2))
  }catch(err){
   alert("Error fetching cart")
  }
 }

 // CHECKOUT
 const checkout = async ()=>{
  try{
   await API.post("/orders")
   alert("Order placed successfully")
  }catch(err){
   alert("Checkout failed")
  }
 }

 // VIEW ORDERS
 const viewOrders = async ()=>{
  try{
   const res = await API.get("/orders")
   alert(JSON.stringify(res.data,null,2))
  }catch(err){
   alert("Error fetching orders")
  }
 }

 if(loading){
  return <div className="p-10">Loading Items...</div>
 }

 return (
  <div className="min-h-screen bg-gray-50">

   {/* TOP BAR */}
   <div className="bg-white shadow p-4 flex justify-between">
    <h1 className="text-xl font-bold">Shopping Dashboard</h1>

    <div className="flex gap-3">
     <button onClick={viewCart}
      className="bg-gray-200 px-4 py-2 rounded">
      Cart
     </button>

     <button onClick={viewOrders}
      className="bg-gray-200 px-4 py-2 rounded">
      Orders
     </button>

     <button onClick={checkout}
      className="bg-blue-600 text-white px-4 py-2 rounded">
      Checkout
     </button>
    </div>
   </div>

   {/* ITEMS GRID */}
   <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
    {items.map(item=>(
     <div key={item._id}
      className="bg-white p-5 rounded shadow hover:shadow-lg cursor-pointer"
      onClick={()=>addToCart(item._id)}
     >
      <h2 className="font-bold text-lg">{item.name}</h2>
      <p className="text-gray-600">₹ {item.price}</p>

      {!item.isAvailable && (
       <p className="text-red-500 text-sm mt-2">Out of Stock</p>
      )}
     </div>
    ))}
   </div>

  </div>
 )
}

export default Dashboard
