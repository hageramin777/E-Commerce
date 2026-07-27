import { Heart, RefreshCw, Eye, Star, Plus } from "lucide-react"
import { ProductType } from "@/types/productType"
import Link from "next/link";
import AddToCartBtn from "@/app/components/AddToCartBtn"
import AddToWishlistBtn from "@/app/components/AddToWishlistBtn"

interface ProductCardProps {
  product: ProductType
}

export default function ProductCard({ product }: ProductCardProps) {



  const hasDiscount =
    product.priceAfterDiscount && product.priceAfterDiscount < product.price
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount!) / product.price) * 100
      )
    : 0

  return (
    <div className="p-3 border rounded-xl relative bg-white">
      {hasDiscount && (
        <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
          -{discountPercent}%
        </span>
      )}

      <div className="absolute top-4 right-3 flex flex-col gap-2 z-10">
        <AddToWishlistBtn productId={product._id} />
        <button aria-label="Compare" className="text-gray-400 hover:text-black">
          <RefreshCw className="size-4" />
        </button>
      <Link
        href={`/Products/${product._id}`}
        aria-label="Quick view"
        className="text-gray-400 hover:text-black"
      >
        <Eye className="size-4" />
      </Link>
      </div>

      <img
        src={product.imageCover}
        alt={product.title}
        className="w-full h-[220px] object-contain"
      />

      <p className="text-gray-400 text-xs mt-3">{product.category?.name}</p>
      <h3 className="text-sm font-semibold line-clamp-1">{product.title}</h3>

      <div className="flex items-center gap-1 mt-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`size-3 ${
              i < Math.round(product.ratingsAverage)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">
          {product.ratingsAverage} ({product.ratingsQuantity ?? 0})
        </span>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1.5">
          {hasDiscount ? (
            <>
              <span className="text-sm font-semibold text-green-600">
                {product.priceAfterDiscount} EGP
              </span>
              <span className="text-xs text-gray-400 line-through">
                {product.price} EGP
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold">{product.price} EGP</span>

          

          )}
        </div>
      <AddToCartBtn productId={product._id} />
      </div>
    </div>
  )
}