import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "../src/pages/login"
import Register from "../src/pages/register"
import Dashboard from "../src/pages/dashboard"
import Cart from "../src/pages/cart"

function App(){
 return (
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/cart" element={<Cart/>}/>
   </Routes>
  </BrowserRouter>
 )
}

export default App
