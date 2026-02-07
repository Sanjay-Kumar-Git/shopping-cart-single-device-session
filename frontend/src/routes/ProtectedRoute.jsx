import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {

 // Adjust this if your token key is different
 const token = localStorage.getItem("token")

 if (!token) {
  return <Navigate to="/" replace />
 }

 return children
}

export default ProtectedRoute
