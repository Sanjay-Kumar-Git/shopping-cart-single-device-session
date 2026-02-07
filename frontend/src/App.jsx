import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
 return (
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<div>Login Page Coming</div>} />
    <Route path="/dashboard" element={<div>Dashboard Coming</div>} />
   </Routes>
  </BrowserRouter>
 )
}

export default App
