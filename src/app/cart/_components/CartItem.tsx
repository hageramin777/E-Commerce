"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useState, useTransition } from "react"
import { updateCartItemQuantity, removeCartItem } from "@/app/_actions/cart.actions"
import { CartItemType } from "@/types/cart.type"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function CartItem({ item }: { item: CartItemType }) {
  const [count, setCount] = useState(item.count)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleUpdate(newCount: number) {
    if (newCount < 1) return
    setCount(newCount)
    startTransition(async () => {
      const res = await updateCartItemQuantity(item.product._id, newCount)
      if (res.ok) {
        router.refresh()
      } else {
        toast.error("Failed to update quantity")
      }
    })
  }

  function handleRemove() {
    startTransition(async () => {
      const res = await removeCartItem(item.product._id)
      if (res.ok) {
        toast.success("Item removed")
        router.refresh()
      } else {
        toast.error("Failed to remove item")
      }
    })
  }

  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-b-0">
      <div className="size-20 bg-gray-50 rounded-lg overflow-hidden shrink-0">
        <Image
          src={item.product.imageCover}
          alt={item.product.title}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium text-sm">{item.product.title}</h3>
        <p className="text-emerald-600 text-xs">{item.product.category?.name}</p>
        <p className="text-emerald-600 font-semibold mt-1">{item.price} EGP</p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => handleUpdate(count - 1)}
            disabled={isPending}
            className="size-7 border rounded-lg flex items-center justify-center hover:bg-gray-50"
          >
            <Minus className="size-3" />
          </button>
          <span className="w-6 text-center text-sm">{count}</span>
          <button
            onClick={() => handleUpdate(count + 1)}
            disabled={isPending}
            className="size-7 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center justify-center"
          >
            <Plus className="size-3" />
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="text-xs text-gray-400">Total</p>
        <p className="font-semibold">{item.price * count} EGP</p>
      </div>

      <button
        onClick={handleRemove}
        disabled={isPending}
        className="size-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  )
}