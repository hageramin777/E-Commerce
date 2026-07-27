"use client"

import { addProductToCart } from "@/app/_actions/cart.actions"
import { Plus } from 'lucide-react';
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { CartContext } from "@/app/_context/CartContext";


export default function AddToCartBtn({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false)

const { setNumberOfCartItems } = useContext(CartContext);

  async function handleAddToCart() {
    setIsLoading(true)

    try {
      const result = await addProductToCart(productId)
      

      if (result.ok) {
        setNumberOfCartItems(result.data?.numOfCartItems ?? 0)
        toast.success("Added to cart successfully", {
          position: "top-center",
        })
      } else {
        toast.error(result.message || result.data?.message || "Failed to add to cart", {
          position: "top-center",
        })
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong", { position: "top-center" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      aria-label="Add to cart"
      className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white rounded-full size-7 flex items-center justify-center"
    >
      <Plus className="size-4" />
    </button>
  )
}