"use client"

import { Trash2 } from "lucide-react"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { clearCart } from "@/app/_actions/cart.actions"

export default function ClearCartBtn() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleClear() {
    startTransition(async () => {
      const res = await clearCart()
      if (res.ok) {
        toast.success("Cart cleared")
        router.refresh()
      } else {
        toast.error("Failed to clear cart")
      }
    })
  }

  return (
    <button
      onClick={handleClear}
      disabled={isPending}
      className="text-gray-500 text-sm flex items-center gap-1 hover:text-red-500"
    >
      <Trash2 className="size-4" /> Clear all items
    </button>
  )
}