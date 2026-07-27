import { getUserCart } from "@/app/_actions/cart.actions"
import { auth } from "@/lib/nextauth.config"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, ArrowLeft, Trash2 } from "lucide-react"
import CartItem from "./_components/CartItem"
import ClearCartBtn from "./_components/ClearCartBtn"

export default async function CartPage() {
  const session = await auth()
  const cart = await getUserCart()

  const items = cart?.data?.products ?? []
  const total = cart?.data?.totalCartPrice ?? 0

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/" className="text-emerald-600 hover:underline">Home</Link>
        <span className="mx-1">/</span>
        <span>Shopping Cart</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="bg-emerald-600 rounded-lg size-9 flex items-center justify-center">
          <ShoppingCart className="size-5 text-white" />
        </div>
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
      </div>
      <p className="text-gray-500 mb-6">
        You have <span className="text-emerald-600 font-medium">{items.length} item{items.length !== 1 && "s"}</span> in your cart
      </p>

      {items.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          Your cart is empty.{" "}
          <Link href="/products" className="text-emerald-600 hover:underline">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Items list */}
          <div className="md:col-span-2 bg-white border rounded-xl p-5">
            {items.map((item) => (
           <CartItem key={item.product._id} item={item} />
            ))}

            <div className="flex items-center justify-between pt-4 mt-2 border-t">
              <Link href="/products" className="text-emerald-600 text-sm flex items-center gap-1 hover:underline">
                <ArrowLeft className="size-4" /> Continue Shopping
              </Link>
              <ClearCartBtn />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white border rounded-xl overflow-hidden h-fit">
            <div className="bg-gray-900 text-white px-5 py-3">
              <h2 className="font-semibold">Order Summary</h2>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal ({items.length} items)</span>
                <span>{total} EGP</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="text-emerald-600">Calculated at checkout</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-3">
                <span>Estimated Total</span>
                <span className="text-emerald-600">{total} EGP</span>
              </div>

              {session ? (
                <Link
                  href="/payment"
                  className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg mt-2"
                >
                  Checkout
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg mt-2"
                  >
                    Login to Checkout
                  </Link>
                  <p className="text-center text-xs text-gray-500 mt-2">
                    Don&apos;t have an account?{" "}
                    <Link href="/login/signup" className="text-emerald-600 hover:underline">
                      Sign up
                    </Link>
                  </p>
                </>
              )}

              <ul className="text-xs text-gray-500 space-y-1 pt-3 border-t mt-3">
                <li>✓ Your cart items will be saved</li>
                <li>✓ Track your orders easily</li>
                <li>✓ Access exclusive member deals</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
