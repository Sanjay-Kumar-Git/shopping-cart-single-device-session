import { useEffect, useState } from "react"
import { ShoppingCart, Package, LogOut, Loader2 } from "lucide-react"
import API from "../api/axios"
import { logout } from "../utils/auth"
import { useNavigate } from "react-router-dom"

function Dashboard() {

 const navigate = useNavigate()

 const [items, setItems] = useState([])
 const [loading, setLoading] = useState(true)
 const [addingId, setAddingId] = useState(null)

 // ================= FETCH PRODUCTS =================
 useEffect(() => {
  loadProducts()
 }, [])

 const loadProducts = async () => {
  try {
   const res = await API.get("/items")
   setItems(res.data || [])
  } catch (err) {
   console.error(err)
  } finally {
   setLoading(false)
  }
 }

 // ================= ADD TO CART =================
 const addToCart = async (id) => {
  try {
   setAddingId(id)
   await API.post("/carts", { itemId: id })
  } catch (err) {
   console.error(err)
  } finally {
   setAddingId(null)
  }
 }

 // ================= NAVIGATE CART =================
 const goToCart = () => {
  navigate("/cart")
 }

 // ================= NAVIGATE ORDERS =================
 const goToOrders = () => {
  navigate("/orders")
 }

 // ================= LOGOUT =================
 const handleLogout = async() => {
  await logout()
  navigate("/")
 }

 // ================= LOADING =================
 if (loading) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="animate-spin text-blue-600" size={40}/>
   </div>
  )
 }

 return (
  <div className="min-h-screen bg-white">

   {/* NAVBAR */}
   <header className="border-b bg-white sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

     <h1 className="text-2xl font-bold text-blue-600">
      ShopEase
     </h1>

     <div className="flex items-center gap-4">

      <NavBtn icon={<ShoppingCart size={16}/>} onClick={goToCart}>
       Cart
      </NavBtn>

      <NavBtn icon={<Package size={16}/>} onClick={goToOrders}>
       Orders
      </NavBtn>

      <button
       onClick={handleLogout}
       className="flex items-center gap-2 text-red-600 text-sm font-semibold"
      >
       <LogOut size={16}/> Logout
      </button>

     </div>

    </div>
   </header>

   {/* PAGE TITLE */}
   <div className="max-w-7xl mx-auto px-6 pt-8 pb-2">
    <h2 className="text-xl font-semibold text-gray-800">
     Products
    </h2>
   </div>

   {/* PRODUCT GRID */}
   <main className="max-w-7xl mx-auto px-6 pb-10">

    {items.length === 0 && (
     <p className="text-gray-500">No products available</p>
    )}

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

     {items.map(item => (

      <div
       key={item._id}
       className="group border rounded-lg overflow-hidden hover:shadow-md transition bg-white"
      >

       {/* IMAGE */}
       <div className="aspect-square bg-gray-50">
        <img
         src={item.imageUrl}
         alt={item.name}
         className="w-full h-full object-cover group-hover:scale-105 transition"
        />
       </div>

       {/* CONTENT */}
       <div className="p-4">

        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
         {item.name}
        </h3>

        <p className="text-blue-600 font-bold mt-2">
         ₹ {item.price}
        </p>

        <p className={`text-xs mt-1 font-medium
         ${item.isAvailable ? "text-green-600" : "text-red-500"}
        `}>
         {item.isAvailable ? "In Stock" : "Out of Stock"}
        </p>

        <button
         disabled={!item.isAvailable || addingId === item._id}
         onClick={() => addToCart(item._id)}
         className="w-full mt-3 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-300 text-sm font-semibold flex justify-center items-center gap-2"
        >
         {addingId === item._id && (
          <Loader2 size={14} className="animate-spin"/>
         )}
         {addingId === item._id ? "Adding..." : "Add to Cart"}
        </button>

       </div>

      </div>

     ))}

    </div>

   </main>

  </div>
 )
}

// ================= NAV BUTTON =================
function NavBtn({ icon, children, ...props }) {
 return (
  <button
   {...props}
   className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition"
  >
   {icon}
   {children}
  </button>
 )
}

export default Dashboard
