function OrdersSkeleton() {

 return (
  <div className="bg-white border animate-pulse">

   <div className="px-6 py-4 border-b bg-gray-100 flex justify-between">

    <div className="space-y-2">
     <div className="h-3 w-24 bg-gray-200 rounded" />
     <div className="h-4 w-32 bg-gray-200 rounded" />
    </div>

    <div className="space-y-2 text-right">
     <div className="h-3 w-20 bg-gray-200 rounded" />
     <div className="h-4 w-24 bg-gray-200 rounded" />
    </div>

   </div>

   <div className="p-6 space-y-4">

    <div className="h-20 bg-gray-200 rounded" />
    <div className="h-20 bg-gray-200 rounded" />

   </div>

  </div>
 )
}

export default OrdersSkeleton
