import { toast, Flip } from "react-toastify";

export default function Toaster(text) {
  return toast.dark(text, {
    position: "top-right",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    draggable: false,
    transition: Flip,
  });
}
