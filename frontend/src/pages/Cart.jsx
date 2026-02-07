import { useEffect, useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext"
import CartSkeleton from "../components/CartSkeleton"


function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const toast = useToast()

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await API.get("/api/carts");
      setCart(res.data);
    } catch (err) {
      console.log("Cart load failed", err);
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = async (itemId) => {
    try {
      await API.patch(`/api/carts/${itemId}/inc`);
      loadCart();
    } catch (err) {
      console.log(err);
    }
  };

  const decreaseQty = async (itemId) => {
    try {
      await API.patch(`/api/carts/${itemId}/dec`);
      loadCart();
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await API.delete(`/api/carts/${itemId}`);
      loadCart();
    } catch (err) {
      console.log(err);
    }
  };

  const checkout = async () => {
    try {
      setCheckoutLoading(true);
      await API.post("/api/orders");
      toast.success("Order placed successfully")
      loadCart();
    } catch {
     toast.error("Checkout failed")
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
  <div className="max-w-5xl mx-auto p-6 space-y-4">
   {[...Array(3)].map((_,i)=>(
    <CartSkeleton key={i} />
   ))}
  </div>
 );
  }

  const items = cart?.items || [];
  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-gray-100 rounded transition"
          >
            <ArrowLeft />
          </button>

          <h1 className="text-lg font-semibold text-gray-900">
            Shopping Cart ({items.length})
          </h1>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT → CART ITEMS */}
        <div className="lg:col-span-2">
          {items.length === 0 && (
            <div className="bg-white border p-12 text-center text-gray-500">
              Your cart is empty
            </div>
          )}

          <div className="bg-white border">
            {items.map((item) => (
              <div
                key={item.itemId._id}
                className="p-6 border-b last:border-b-0 flex gap-6"
              >
                {/* IMAGE */}
                <img
                  src={item.itemId.imageUrl}
                  alt={item.itemId.name}
                  className="w-28 h-28 object-cover border bg-gray-50"
                />

                {/* DETAILS */}
                <div className="flex-grow">
                  <h3 className="text-sm font-medium text-gray-900">
                    {item.itemId.name}
                  </h3>

                  <p className="text-lg font-semibold text-blue-600 mt-1">
                    ₹ {item.itemId.price}
                  </p>

                  {/* QTY */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex border">
                      <div className="inline-flex rounded-md border border-gray-300 overflow-hidden shadow-sm">
                        <button
                          onClick={() => decreaseQty(item.itemId._id)}
                          className="
   h-10 w-10
   bg-white
   text-gray-700
   hover:bg-gray-50
   active:bg-gray-100
   active:translate-y-[1px]
   transition
   font-medium
  "
                        >
                          −
                        </button>

                        <div
                          className="
  h-10 min-w-[48px]
  flex items-center justify-center
  bg-white
  border-x
  font-semibold
  text-sm
 "
                        >
                          {item.quantity}
                        </div>

                        <button
                          onClick={() => increaseQty(item.itemId._id)}
                          className="
   h-10 w-10
   bg-white
   text-gray-700
   hover:bg-gray-50
   active:bg-gray-100
   active:translate-y-[1px]
   transition
   font-medium
  "
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.itemId._id)}
                      className="
  text-sm
  font-semibold
  text-red-600
  hover:text-red-700
  active:text-red-800
  transition
 "
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* ITEM TOTAL */}
                <div className="text-right min-w-[120px]">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="font-semibold">₹ {item.totalPrice}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT → ORDER SUMMARY */}
        {items.length > 0 && (
          <div className="bg-white border p-6 h-fit sticky top-24">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            <div className="flex justify-between text-sm mb-2">
              <span>Items Total</span>
              <span>₹ {total}</span>
            </div>

            <div className="flex justify-between text-sm mb-4">
              <span>Delivery</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="border-t pt-4 flex justify-between font-semibold">
              <span>Order Total</span>
              <span className="text-blue-600">₹ {total}</span>
            </div>

            <button
              onClick={checkout}
              disabled={checkoutLoading}
              className="
  w-full h-12
  bg-blue-600
  text-white
  font-semibold
  text-sm
  rounded-md
  shadow-sm
  hover:bg-blue-700
  active:bg-blue-800
  active:translate-y-[1px]
  transition
  disabled:bg-gray-300
  disabled:shadow-none
  flex items-center justify-center
 "
            >
              {checkoutLoading ? "Processing Order..." : "Proceed to Checkout"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
