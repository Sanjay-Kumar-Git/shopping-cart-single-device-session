import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Mail, Lock, User, Loader2, ShoppingBag } from "lucide-react"
import API from "../api/axios"

function Register() {

 const navigate = useNavigate()

 const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
 })

 const [loading, setLoading] = useState(false)
 const [error, setError] = useState("")
 const [success, setSuccess] = useState("")

 // ---------------- HANDLE INPUT ----------------
 const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value })
 }

 // ---------------- VALIDATION ----------------
 const validate = () => {
  if (!form.name || !form.email || !form.password) {
   setError("Please fill all required fields")
   return false
  }

  if (form.password.length < 6) {
   setError("Password must be at least 6 characters")
   return false
  }

  if (form.password !== form.confirmPassword) {
   setError("Passwords do not match")
   return false
  }

  return true
 }

 // ---------------- REGISTER ----------------
 const handleRegister = async (e) => {
  e.preventDefault()
  setError("")
  setSuccess("")

  if (!validate()) return

  setLoading(true)

  try {

   await API.post("/users", {
    name: form.name.trim(),
    email: form.email.trim(),
    password: form.password
   })

   setSuccess("Account created successfully!")

   setTimeout(() => navigate("/"), 1500)

  } catch (err) {
   setError(
    err?.response?.data?.message ||
    "Registration failed. Please try again."
   )
  } finally {
   setLoading(false)
  }
 }

 return (
  <div className="min-h-screen bg-blue-50 flex flex-col">

   {/* MAIN */}
   <div className="flex flex-1 items-center justify-center px-4 py-12">

    <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">

     {/* TOP BLUE STRIP */}
     <div className="bg-blue-600 text-white p-6 text-center">
      <h2 className="text-2xl font-bold">Join ShopEase</h2>
      <p className="text-sm text-blue-100 mt-1">
       Create account & unlock exclusive deals
      </p>
     </div>

     {/* FORM SECTION */}
     <div className="p-8">

      {error && (
       <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded mb-4 text-center">
        {error}
       </div>
      )}

      {success && (
       <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded mb-4 text-center">
        {success}
       </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">

       <Input
        icon={<User size={18}/>}
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
       />

       <Input
        icon={<Mail size={18}/>}
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
       />

       <Input
        icon={<Lock size={18}/>}
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
       />

       <Input
        icon={<Lock size={18}/>}
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
       />

       <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition disabled:opacity-60"
       >
        {loading && <Loader2 className="animate-spin" size={18}/>}
        {loading ? "Creating Account..." : "Create Account"}
       </button>

      </form>

      {/* LOGIN LINK */}
      <p className="text-sm text-center mt-6 text-gray-600">
       Already have an account?{" "}
       <Link to="/" className="text-blue-600 font-semibold hover:underline">
        Sign In
       </Link>
      </p>

      {/* TRUST */}
      <p className="text-xs text-gray-400 text-center mt-4">
       🔒 Secure • Fast checkout • Trusted by thousands
      </p>

     </div>
    </div>

   </div>
  </div>
 )
}

// ---------------- INPUT ----------------
function Input({ icon, type="text", ...props }) {
 return (
  <div className="relative">
   <div className="absolute left-3 top-3 text-gray-400">
    {icon}
   </div>

   <input
    type={type}
    {...props}
    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-400 outline-none transition"
   />
  </div>
 )
}

export default Register
