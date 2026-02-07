import { useEffect, useState } from "react"
import { Loader2, ArrowLeft } from "lucide-react"
import API from "../api/axios"
import { useNavigate } from "react-router-dom"
import OrdersSkeleton from "../components/OrdersSkeleton"


function Orders(){

 const navigate = useNavigate()

 const [orders,setOrders] = useState([])
 const [loading,setLoading] = useState(true)

 useEffect(()=>{
  loadOrders()
 },[])

 const loadOrders = async ()=>{
  try{
   const res = await API.get("/api/orders")
   setOrders(res.data || [])
  }catch(err){
   console.log("Orders load failed", err)
  }finally{
   setLoading(false)
  }
 }

 if(loading){
  return (
  <div className="max-w-6xl mx-auto p-6 space-y-6">
   {[...Array(3)].map((_,i)=>(
    <OrdersSkeleton key={i} />
   ))}
  </div>
 )
 }

 return (
  <div className="min-h-screen bg-gray-100">

   {/* HEADER */}
   <div className="bg-white border-b">
    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-4">

     <button
      onClick={()=>navigate("/dashboard")}
      className="p-2 rounded hover:bg-gray-100 transition"
     >
      <ArrowLeft/>
     </button>

     <h1 className="text-lg font-semibold text-gray-900">
      Order History
     </h1>

    </div>
   </div>

   {/* CONTENT */}
   <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

    {orders.length === 0 && (
     <div className="bg-white border p-10 text-center text-gray-500 text-sm">
      No orders placed yet
     </div>
    )}

    {orders.map(order=>{

     const total = order.items.reduce(
      (sum,i)=> sum + i.totalPrice,0
     )

     return (
      <div
       key={order._id}
       className="bg-white border"
      >

       {/* ORDER META HEADER */}
       <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">

        <div>
         <p className="text-xs text-gray-500 uppercase tracking-wide">
          Order ID
         </p>

         <p className="font-medium text-sm text-gray-900">
          {order._id}
         </p>
        </div>

        <div className="text-right">
         <p className="text-xs text-gray-500 uppercase tracking-wide">
          Placed On
         </p>

         <p className="font-medium text-sm text-gray-900">
          {new Date(order.createdAt).toLocaleDateString()}
         </p>
        </div>

       </div>

       {/* ITEMS LIST */}
       <div className="divide-y">

        {order.items.map(item=>(

         <div
          key={item._id}
          className="px-6 py-5 flex gap-5"
         >

          {/* IMAGE */}
          <img
           src={item.itemId.imageUrl}
           alt={item.itemId.name}
           className="w-20 h-20 object-cover border bg-gray-50"
          />

          {/* DETAILS */}
          <div className="flex-grow">

           <h3 className="text-sm font-medium text-gray-900">
            {item.itemId.name}
           </h3>

           <p className="text-xs text-gray-500 mt-1">
            Quantity: {item.quantity}
           </p>

          </div>

          {/* PRICE */}
          <div className="text-right min-w-[120px] flex flex-col justify-center">

           <p className="text-xs text-gray-500">
            Item Total
           </p>

           <p className="text-sm font-semibold text-blue-600">
            ₹ {item.totalPrice}
           </p>

          </div>

         </div>

        ))}

       </div>

       {/* ORDER TOTAL */}
       <div className="px-6 py-4 border-t flex justify-between items-center">

        <span className="font-semibold text-gray-900">
         Order Total
        </span>

        <span className="text-lg font-bold text-blue-600">
         ₹ {total}
        </span>

       </div>

      </div>
     )
    })}

   </div>

  </div>
 )
}

export default Orders
