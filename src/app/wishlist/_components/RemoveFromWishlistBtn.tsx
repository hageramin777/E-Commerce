"use client"

import { X } from "lucide-react"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { removeFromWishlist } from "@/app/_actions/wishlist.actions"

export default function RemoveFromWishlistBtn({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleRemove() {
    startTransition(async () => {
      const res = await removeFromWishlist(productId)
      if (res.ok) {
        toast.success("Removed from wishlist")
        router.refresh()
      } else {
        toast.error("Failed to remove")
      }
    })
  }

  return (
    <button
      onClick={handleRemove}
      disabled={isPending}
      className="absolute top-2 right-2 z-10 bg-white shadow rounded-full size-7 flex items-center justify-center hover:bg-red-50 hover:text-red-500"
    >
      <X className="size-4" />
    </button>
  )
}