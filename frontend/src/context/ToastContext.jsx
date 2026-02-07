import { createContext, useContext, useState, useCallback } from "react"
import Toast from "../components/Toast"

const ToastContext = createContext()

export const useToast = () => useContext(ToastContext)

export function ToastProvider({ children }) {

 const [toasts, setToasts] = useState([])

 const removeToast = (id) => {
  setToasts(prev => prev.filter(t => t.id !== id))
 }

 const showToast = useCallback((type, message) => {

  const id = Date.now()

  setToasts(prev => [...prev, { id, type, message }])

  setTimeout(() => {
   removeToast(id)
  }, 3000)

 }, [])

 const toast = {
  success: (msg) => showToast("success", msg),
  error: (msg) => showToast("error", msg),
  info: (msg) => showToast("info", msg)
 }

 return (
  <ToastContext.Provider value={toast}>

   {children}

   {/* Toast Container */}
   <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3">
    {toasts.map(t => (
     <Toast
      key={t.id}
      type={t.type}
      message={t.message}
      onClose={() => removeToast(t.id)}
     />
    ))}
   </div>

  </ToastContext.Provider>
 )
}
