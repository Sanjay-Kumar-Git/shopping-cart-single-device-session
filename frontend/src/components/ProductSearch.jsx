import { Search } from "lucide-react"

function ProductSearch({ value, onChange }) {

 return (
  <div className="w-full max-w-md relative">

   {/* ICON */}
   <Search
    size={18}
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
   />

   <input
    type="text"
    placeholder="Search products..."
    value={value}
    onChange={(e)=>onChange(e.target.value)}
    className="
     w-full
     h-11
     pl-10
     pr-4
     border border-gray-300
     rounded-md
     focus:outline-none
     focus:ring-2
     focus:ring-blue-500
     focus:border-transparent
     text-sm
     bg-white
    "
   />

  </div>
 )
}

export default ProductSearch
