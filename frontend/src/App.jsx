import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "../src/pages/login"
import Dashboard from "../src/pages/dashboard"

function App(){
 return (
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
   </Routes>
  </BrowserRouter>
 )
}

export default App
