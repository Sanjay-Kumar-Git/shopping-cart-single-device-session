import { useEffect, useState, useRef } from "react"
import { ShoppingCart, Package, LogOut, Loader2 } from "lucide-react"
import API from "../api/axios"
import { logout } from "../utils/auth"
import { useNavigate } from "react-router-dom"
import ProductSkeleton from "../components/ProductSkeleton"
import ProductSearch from "../components/ProductSearch"



function Dashboard() {

 const navigate = useNavigate()

 const [items, setItems] = useState([])
 const [loading, setLoading] = useState(true)
 const [addingId, setAddingId] = useState(null)
 const [addedSuccessId, setAddedSuccessId] = useState(null)
 const [searchTerm, setSearchTerm] = useState("")


 // ⭐ REFS FOR FLY ANIMATION
 const cartIconRef = useRef(null)
 const productImgRefs = useRef({})

 // ================= FETCH PRODUCTS =================
 useEffect(() => {
  loadProducts()
 }, [])

 const filteredItems = items.filter(item =>
 item.name.toLowerCase().includes(searchTerm.toLowerCase())
)


 const loadProducts = async () => {
  try {
   const res = await API.get("/api/items")
   setItems(res.data || [])
  } catch (err) {
   console.error(err)
  } finally {
   setLoading(false)
  }
 }

 // ================= AMAZON FLY ANIMATION =================
 const flyToCart = (id) => {

  const img = productImgRefs.current[id]
  const cart = cartIconRef.current

  if (!img || !cart) return

  const imgRect = img.getBoundingClientRect()
  const cartRect = cart.getBoundingClientRect()

  const clone = img.cloneNode(true)

  clone.style.position = "fixed"
  clone.style.left = imgRect.left + "px"
  clone.style.top = imgRect.top + "px"
  clone.style.width = imgRect.width + "px"
  clone.style.height = imgRect.height + "px"
  clone.style.zIndex = 9999
  clone.style.pointerEvents = "none"
  clone.style.transition = "all 0.8s cubic-bezier(.2,.8,.2,1)"

  document.body.appendChild(clone)

  requestAnimationFrame(() => {
   clone.style.left = cartRect.left + "px"
   clone.style.top = cartRect.top + "px"
   clone.style.width = "40px"
   clone.style.height = "40px"
   clone.style.opacity = "0.5"
  })

  setTimeout(() => {
   clone.remove()
  }, 800)
 }

 // ================= ADD TO CART =================
 const addToCart = async (id) => {
  try {
   setAddingId(id)

   // ⭐ TRIGGER FLY ANIMATION
   flyToCart(id)

   await API.post("/carts", { itemId: id })

   setAddedSuccessId(id)
   setTimeout(() => setAddedSuccessId(null), 800)

  } catch (err) {
   console.error(err)
  } finally {
   setAddingId(null)
  }
 }

 // ================= NAVIGATION =================
 const goToCart = () => navigate("/cart")
 const goToOrders = () => navigate("/orders")

 const handleLogout = async () => {
  await logout()
  navigate("/")
 }

 // ================= LOADING =================
 if (loading) {
  return (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
   {[...Array(8)].map((_,i)=>(
    <ProductSkeleton key={i} />
   ))}
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
     <div className="max-w-8xl mt-5  mx-auto px-6 pb-4">
 <ProductSearch
  value={searchTerm}
  onChange={setSearchTerm}
 /> 
</div>


     <div className="flex items-center gap-4">

      {/* ⭐ CART ICON REF ADDED */}
      <NavBtn
       icon={<ShoppingCart ref={cartIconRef} size={16}/>}
       onClick={goToCart}
      >
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

   {/* TITLE */}
   <div className="max-w-7xl mx-auto px-6 pt-8 pb-2">
    <h2 className="text-xl font-semibold text-gray-800">
     Products
    </h2>
   </div>

   {/* PRODUCTS */}
   <main className="max-w-7xl mx-auto px-6 pb-10">

    {filteredItems.length === 0 && (
     <p className="text-gray-500">No products available</p>
    )}

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

     {filteredItems.map(item => (

      <div
       key={item._id}
       className="group border rounded-lg overflow-hidden hover:shadow-md transition bg-white"
      >

       {/* ⭐ IMAGE REF ADDED */}
       <div className="aspect-square bg-gray-50">
        <img
         ref={(el) => productImgRefs.current[item._id] = el}
         src={item.imageUrl}
         alt={item.name}
         className="w-full h-full object-cover group-hover:scale-105 transition"
        />
       </div>

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
         className={`w-full mt-3 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-300 text-sm font-semibold flex justify-center items-center gap-2 active:scale-95
         ${addedSuccessId === item._id ? "scale-105 ring-2 ring-green-400 bg-green-600" : ""}
         `}
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
