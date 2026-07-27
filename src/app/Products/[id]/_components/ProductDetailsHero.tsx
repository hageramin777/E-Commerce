"use client"

import {
  addProductToCart,
  updateCartItemQuantity,
} from "@/app/_actions/cart.actions"
import { CartContext } from "@/app/_context/CartContext"
import AddToWishlistBtn from "@/app/components/AddToWishlistBtn"
import { ProductType } from "@/types/productType"
import {
  Bolt,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useContext, useMemo, useState } from "react"
import toast from "react-hot-toast"

interface Props {
  product: ProductType
  reviewsCount: number
}

export default function ProductDetailsHero({
  product,
  reviewsCount,
}: Props) {
  const router = useRouter()
  const { setNumberOfCartItems } = useContext(CartContext)
  const images = useMemo(
    () =>
      Array.from(
        new Set([
          product.imageCover,
          ...(product.images ?? []),
        ])
      ),
    [product.imageCover, product.images]
  )
  const [activeImage, setActiveImage] = useState(images[0])
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const unitPrice = product.priceAfterDiscount ?? product.price
  const available = product.quantity ?? 0
  const isInStock = available > 0
  const discount = product.priceAfterDiscount
    ? Math.round(
        ((product.price - product.priceAfterDiscount) /
          product.price) *
          100
      )
    : 0

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1))
  }

  function increaseQuantity() {
    setQuantity((current) =>
      Math.min(Math.max(available, 1), current + 1)
    )
  }

  async function handlePurchase(buyNow = false) {
    setIsLoading(true)

    try {
      const addResult = await addProductToCart(product._id)

      if (!addResult.ok) {
        toast.error(
          addResult.message ??
            addResult.data?.message ??
            "Failed to add product to cart"
        )
        return
      }

      const quantityResult = await updateCartItemQuantity(
        product._id,
        quantity
      )

      if (!quantityResult.ok) {
        toast.error(
          quantityResult.data?.message ??
            quantityResult.message ??
            "Failed to update quantity"
        )
        return
      }

      setNumberOfCartItems(
        quantityResult.data?.numOfCartItems ??
          addResult.data?.numOfCartItems ??
          0
      )
      toast.success("Added to cart successfully")

      if (buyNow) {
        router.push("/payment")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="grid gap-10 lg:grid-cols-[430px_1fr]">
      <div>
        <div className="flex h-[520px] items-center justify-center overflow-hidden border bg-gray-50">
          <Image
            src={activeImage}
            alt={product.title}
            width={650}
            height={650}
            priority
            className="h-full w-full object-contain"
          />
        </div>

        {images.length > 1 && (
          <div className="mt-2 grid grid-cols-4 gap-2">
            {images.slice(0, 4).map((image) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(image)}
                className={`h-28 overflow-hidden border-2 bg-gray-50 ${
                  activeImage === image
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.title} preview`}
                  width={160}
                  height={120}
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="py-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
            {product.category?.name}
          </span>
          {product.brand?.name && (
            <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">
              {product.brand.name}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            {product.title}
          </h1>
          <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border">
            <AddToWishlistBtn productId={product._id} />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`size-5 ${
                  index < Math.round(product.ratingsAverage)
                    ? "fill-amber-400 text-amber-400"
                    : "text-amber-400"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-600">
            {product.ratingsAverage} ({reviewsCount} reviews)
          </span>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <strong className="text-3xl font-bold text-slate-950 md:text-4xl">
            {unitPrice} EGP
          </strong>
          {product.priceAfterDiscount && (
            <>
              <span className="text-xl text-gray-400 line-through">
                {product.price} EGP
              </span>
              <span className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white">
                Save {discount}%
              </span>
            </>
          )}
        </div>

        <div className="mt-7">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
              isInStock
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            <span
              className={`size-2 rounded-full ${
                isInStock ? "bg-emerald-500" : "bg-red-500"
              }`}
            />
            {isInStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div className="my-8 border-t" />

        <p className="text-base leading-8 text-slate-600 md:text-lg">
          {product.description || "No product description available."}
        </p>

        <div className="mt-7">
          <label className="text-sm font-medium text-slate-700">
            Quantity
          </label>
          <div className="mt-3 flex flex-wrap items-center gap-5">
            <div className="flex h-14 w-52 items-center justify-between rounded-lg border px-5">
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity === 1}
                aria-label="Decrease quantity"
                className="text-gray-500 disabled:text-gray-300"
              >
                <Minus className="size-5" />
              </button>
              <span className="font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={increaseQuantity}
                disabled={!isInStock || quantity >= available}
                aria-label="Increase quantity"
                className="text-gray-600 disabled:text-gray-300"
              >
                <Plus className="size-5" />
              </button>
            </div>
            <span className="text-sm text-gray-500">
              {available} available
            </span>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between rounded-xl bg-gray-50 px-6 py-5">
          <span className="text-lg font-medium">Total Price:</span>
          <strong className="text-2xl font-bold text-emerald-600">
            {(unitPrice * quantity).toFixed(2)} EGP
          </strong>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handlePurchase(false)}
            disabled={isLoading || !isInStock}
            className="flex h-14 items-center justify-center gap-3 rounded-xl bg-emerald-600 font-semibold text-white shadow-md transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            <ShoppingCart className="size-5" />
            {isLoading ? "Adding..." : "Add to Cart"}
          </button>
          <button
            type="button"
            onClick={() => handlePurchase(true)}
            disabled={isLoading || !isInStock}
            className="flex h-14 items-center justify-center gap-3 rounded-xl bg-slate-900 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            <Bolt className="size-5 fill-current" />
            Buy Now
          </button>
        </div>
      </div>
    </section>
  )
}
