import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ShoppingBag,
  Lock,
  User,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Truck,
  CreditCard,
} from "lucide-react";
import API from "../api/axios";
import { saveToken } from "../utils/auth";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/users/login", { username, password });
      saveToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 403) {
        setError("Active session detected on another device. Please logout there first.");
      } else {
        setError("Invalid username or password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">

      {/* LEFT BRAND PANEL */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-16 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <ShoppingBag size={36} />
            <h1 className="text-3xl font-bold">ShopEase</h1>
          </div>

          <h2 className="text-4xl font-extrabold leading-tight mb-6">
            Your Smart Shopping Destination
          </h2>

          <p className="text-blue-100 text-lg">
            Shop smarter with secure checkout, real-time cart tracking, and fast delivery.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="space-y-4 text-blue-100">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} />
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center gap-3">
            <Truck size={20} />
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard size={20} />
            <span>Easy Checkout</span>
          </div>
        </div>
      </div>

      {/* RIGHT LOGIN PANEL */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 border border-gray-100">

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 text-sm mt-2">
              Login to continue shopping
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-500 mt-0.5" size={18} />
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Username */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Username
              </label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  required
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="password"
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            New to ShopEase?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Create Account
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;
