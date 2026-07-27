"use client"

import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { createCashOrder, createVisaOrder } from "@/app/_actions/orders.actions"
import { getUserCart } from "@/app/_actions/cart.actions"
import { shippingAddressType } from "@/types/order.type"
import { CartContext } from "@/app/_context/CartContext"

interface PaymentFormValues {
  city: string
  details: string
  phone: string
  postalCode: string
  type: "cash" | "visa"
}

export default function PaymentPage() {
  const router = useRouter()
  const { setNumberOfCartItems } = useContext(CartContext)
  const [isLoading, setIsLoading] = useState(false)
  const [cartId, setCartId] = useState<string>("")
  const [cartTotal, setCartTotal] = useState<number>(0)

  const { register, handleSubmit } = useForm<PaymentFormValues>({
    defaultValues: {
      city: "",
      details: "",
      phone: "",
      postalCode: "",
      type: "cash",
    },
  })

 useEffect(() => {
  async function fetchCart() {
    const cart = await getUserCart()

    setCartId(cart?.cartId ?? "")
    setCartTotal(cart?.data?.totalCartPrice ?? 0)
  }

  fetchCart()
}, [])

  async function handlePayment(value: PaymentFormValues) {
    console.log(value)
    setIsLoading(true)

    const userData: shippingAddressType = {
      shippingAddress: {
        city: value.city,
        details: value.details,
        phone: value.phone,
        postalCode: value.postalCode,
      },
    }

    try {
      if (value.type === "cash") {
        const res = await createCashOrder(cartId, userData)
        console.log("cash order", res)

        if (res.status === "success") {
          toast.success("Order placed successfully!")
          setNumberOfCartItems(0)
          router.push("/allorders")
        } else {
          toast.error(res.message || "Failed to place order")
        }
      } else if (value.type === "visa") {
        const res = await createVisaOrder(cartId, userData)
        console.log(res)

        if (res.session?.url) {
          window.open(res.session.url)
        } else {
          toast.error(res.message || "Failed to create payment session")
        }
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Complete Your Order</h1>

      <form onSubmit={handleSubmit(handlePayment)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            {...register("city")}
            placeholder="e.g. Cairo, Alexandria, Giza"
            className="w-full border rounded-lg px-3 py-2.5 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Street Address</label>
          <textarea
            {...register("details")}
            placeholder="Street name, building number, floor, apartment..."
            className="w-full border rounded-lg px-3 py-2.5 text-sm resize-none h-20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            {...register("phone")}
            placeholder="01xxxxxxxxx"
            className="w-full border rounded-lg px-3 py-2.5 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Postal Code</label>
          <input
            {...register("postalCode")}
            placeholder="12345"
            className="w-full border rounded-lg px-3 py-2.5 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Payment Method</label>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 border rounded-lg px-4 py-2.5 flex-1 cursor-pointer">
              <input type="radio" value="cash" {...register("type")} defaultChecked />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2 border rounded-lg px-4 py-2.5 flex-1 cursor-pointer">
              <input type="radio" value="visa" {...register("type")} />
              Pay Online
            </label>
          </div>
        </div>

        <div className="flex justify-between text-sm border-t pt-3">
          <span className="text-gray-500">Total</span>
          <span className="font-semibold text-emerald-600">{cartTotal} EGP</span>
        </div>

        <button
          type="submit"
          disabled={isLoading || !cartId}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-medium py-2.5 rounded-lg"
        >
          {isLoading ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  )
}