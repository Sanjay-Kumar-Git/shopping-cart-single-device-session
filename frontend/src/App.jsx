import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Dashboard from "../src/pages/Dashboard";
import Cart from "../src/pages/Cart";
import Orders from "../src/pages/Orders";
import { ToastProvider } from "./context/ToastContext";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
