function CartSkeleton() {

 return (
  <div className="bg-white border p-5 flex gap-5 animate-pulse">

   <div className="w-24 h-24 bg-gray-200" />

   <div className="flex-grow space-y-3">

    <div className="h-4 bg-gray-200 rounded w-1/2" />
    <div className="h-4 bg-gray-200 rounded w-1/3" />

    <div className="flex gap-2 mt-4">
     <div className="w-10 h-8 bg-gray-200 rounded" />
     <div className="w-10 h-8 bg-gray-200 rounded" />
     <div className="w-10 h-8 bg-gray-200 rounded" />
    </div>

   </div>

  </div>
 )
}

export default CartSkeleton
