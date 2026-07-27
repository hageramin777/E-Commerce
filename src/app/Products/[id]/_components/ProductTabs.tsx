"use client"

import { useState } from "react"
import { Package, Star, Truck } from "lucide-react"
import { ReviewType } from "@/types/review.type"
import WriteReview from "./WriteReview";
interface ProductTabsProps {
  product: {
    description: string
    category?: { name: string }
    subcategory?: { name: string }[]
    brand?: { name: string }
    sold?: number
  }
  reviews: ReviewType[]
  productId: string
}

export default function ProductTabs({ product, reviews, productId }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "shipping">("details")
console.log(reviews)

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => {

    const count = reviews.filter((r) => r.rating === star).length

    const percent = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0
    return { star, percent }
  })

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0"


  return (
    <div className="border rounded-xl">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("details")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 ${
            activeTab === "details"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500"
          }`}
        >
          <Package className="size-4" /> Product Details
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 ${
            activeTab === "reviews"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500"
          }`}
        >
          <Star className="size-4" /> Reviews ({reviews.length})
        </button>
        <button
          onClick={() => setActiveTab("shipping")}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 ${
            activeTab === "shipping"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500"
          }`}
        >
          <Truck className="size-4" /> Shipping & Returns
        </button>
      </div>

      {/* Product Details tab */}
      {activeTab === "details" && (
        <div className="p-6">
          <h3 className="font-semibold mb-2">About this Product</h3>
          <p className="text-gray-600 text-sm mb-6">{product.description}</p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <h4 className="font-semibold mb-2">Product Information</h4>
              <div className="flex justify-between">
                <span className="text-gray-500">Category</span>
                <span>{product.category?.name}</span>
              </div>
              {product.subcategory?.[0] && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Subcategory</span>
                  <span>{product.subcategory[0].name}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Brand</span>
                <span>{product.brand?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Items Sold</span>
                <span>{product.sold ?? 0}+ sold</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              <h4 className="font-semibold mb-2">Key Features</h4>
              <p className="text-emerald-600 flex items-center gap-1">✓ Premium Quality Product</p>
              <p className="text-emerald-600 flex items-center gap-1">✓ 100% Authentic Guarantee</p>
              <p className="text-emerald-600 flex items-center gap-1">✓ Fast & Secure Packaging</p>
              <p className="text-emerald-600 flex items-center gap-1">✓ Quality Tested</p>
            </div>
          </div>
        </div>
      )}

      {/* Reviews tab */}
      {activeTab === "reviews" && (
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6 -[220px_1fr] gap-10 items-center">
            <div className="text-center border-r pr-8">
             <p className="text-6xl font-bold text-gray-900">
                {avgRating}</p>
              <div className="flex justify-center gap-0.5 my-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${
                      i < Math.round(Number(avgRating))
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">Based on {reviews.length} reviews</p>
            </div>

            <div className="space-y-2">
              {ratingCounts.map(({ star, percent }) => (
                <div key={star} className="flex items-center gap-2 text-sm">
                  <span className="w-12 text-gray-500">{star} star</span>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-10 text-gray-500 text-right">{percent}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t mt-6 pt-6">
            {reviews.length === 0 ? (
              <div className="text-center text-gray-400 py-6">
                <Star className="size-8 mx-auto mb-2" />
                Customer reviews will be displayed here.
              </div>
            ) : (
              <div className="space-y-4 mb-6">
                {reviews.map((review) => (
                  <div key={review._id} className="border-b pb-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">{review.user.name}</p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`size-3 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{review.title}</p>
                  </div>
                ))}
              </div>
            )}

            <WriteReview productId={productId} />
          </div>
        </div>
      )}

      {/* Shipping tab */}
      {activeTab === "shipping" && (
        <div className="p-6 text-sm text-gray-600 space-y-3">
          <p>🚚 Free delivery on orders over 500 EGP.</p>
          <p>📦 Estimated delivery: 2-5 business days.</p>
          <p>↩️ Returns accepted within 14 days of delivery.</p>
        </div>
      )}
    </div>
  )
}
