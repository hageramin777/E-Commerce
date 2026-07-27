"use client"

import { Heart } from "lucide-react"
import { useState, useTransition } from "react"
import toast from "react-hot-toast"
import { addToWishlist, removeFromWishlist } from "@/app/_actions/wishlist.actions"

export default function AddToWishlistBtn({ productId }: { productId: string }) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleToggle() {
    startTransition(async () => {
      if (isInWishlist) {
        const res = await removeFromWishlist(productId)
        if (res.ok) {
          setIsInWishlist(false)
          toast.success("Removed from wishlist")
        }
      } else {
        const res = await addToWishlist(productId)
        if (res.ok) {
          setIsInWishlist(true)
          toast.success("Added to wishlist")
        } else {
          toast.error("You must be logged in")
        }
      }
    })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      aria-label="Add to wishlist"
      className={isInWishlist ? "text-red-500" : "text-gray-400 hover:text-red-500"}
    >
      <Heart className={`size-4 ${isInWishlist ? "fill-red-500" : ""}`} />
    </button>
  )
}
