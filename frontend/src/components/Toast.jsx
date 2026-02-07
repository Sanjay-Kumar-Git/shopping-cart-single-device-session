import { CheckCircle2, XCircle, Info } from "lucide-react"

const icons = {
 success: <CheckCircle2 size={18} />,
 error: <XCircle size={18} />,
 info: <Info size={18} />
}

const colors = {
 success: "bg-green-600",
 error: "bg-red-600",
 info: "bg-blue-600"
}

function Toast({ type = "info", message, onClose }) {

 return (
  <div
   className={`
    flex items-center gap-3
    text-white px-4 py-3
    rounded-md shadow-lg
    ${colors[type]}
    animate-slideIn
   `}
  >

   {icons[type]}

   <span className="text-sm font-medium flex-grow">
    {message}
   </span>

   <button
    onClick={onClose}
    className="text-white/80 hover:text-white text-sm"
   >
    ✕
   </button>

  </div>
 )
}

export default Toast
