import { getUserOrders } from "@/app/_actions/orders.actions"
import Link from "next/link"
import Image from "next/image"
import { Package } from "lucide-react"

interface OrderType {
  _id: string
  id: number
  totalOrderPrice: number
  isPaid: boolean
  isDelivered: boolean
  paymentMethodType: string
  createdAt: string
  cartItems: {
    _id: string
    count: number
    price: number
    product: {
      title: string
      imageCover: string
    }
  }[]
}

export default async function page() {
  const orders: OrderType[] = await getUserOrders()

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-600 rounded-lg size-9 flex items-center justify-center">
          <Package className="size-5 text-white" />
        </div>
        <h1 className="text-2xl font-bold">My Orders</h1>
      </div>

      {!orders || orders.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          You haven&apos;t placed any orders yet.{" "}
          <Link href="/products" className="text-emerald-600 hover:underline">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-xl p-5 bg-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium">Order #{order.id}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full ${
                      order.isPaid ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full ${
                      order.isDelivered ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.isDelivered ? "Delivered" : "Processing"}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {order.cartItems.map((item) => (
                  <div key={item._id} className="size-14 shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t mt-3 pt-3">
                <p className="text-sm text-gray-500">
                  {order.cartItems.length} item{order.cartItems.length !== 1 && "s"} ·{" "}
                  {order.paymentMethodType === "cash" ? "Cash on Delivery" : "Online Payment"}
                </p>
                <p className="font-semibold text-emerald-600">{order.totalOrderPrice} EGP</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}