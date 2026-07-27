import { getUserWishlist } from "@/app/_actions/wishlist.actions"
import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import RemoveFromWishlistBtn from "./_components/RemoveFromWishlistBtn"

export default async function WishlistPage() {
  const wishlist = await getUserWishlist()
  const items = wishlist?.data ?? []

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-500 rounded-lg size-9 flex items-center justify-center">
          <Heart className="size-5 text-white" />
        </div>
        <h1 className="text-2xl font-bold">My Wishlist</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          Your wishlist is empty.{" "}
          <Link href="/products" className="text-emerald-600 hover:underline">
            Discover products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item._id} className="border rounded-xl p-3 relative">
              <RemoveFromWishlistBtn productId={item._id} />
              <Link href={`/product/${item._id}`}>
                <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2">
                  <Image
                    src={item.imageCover}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                <p className="text-emerald-600 font-semibold text-sm">{item.price} EGP</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}