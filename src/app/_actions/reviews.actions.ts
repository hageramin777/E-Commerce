"use server"

import { getMyToken } from "@/utils/getMyToken"
import { ReviewsResponseType } from "@/types/review.type"

export async function getProductReviews(productId: string): Promise<ReviewsResponseType | null> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`
    )
    const finalRes = await res.json()
    return finalRes
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function createReview(productId: string, title: string, ratings: number) {
  const token = await getMyToken()
  if (!token) return { ok: false, message: "You must be logged in" }

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
      {
        method: "POST",
        headers: {
          token: token as string,
          "Content-Type": "application/json",
        },
body: JSON.stringify({
  review: title,
  rating: ratings,
}),
      }
    )
    const finalRes = await res.json()
    return { ok: res.ok, data: finalRes }
  } catch (error) {
    console.log(error)
    return { ok: false, message: "Something went wrong" }
  }
}

export async function deleteReview(reviewId: string) {
  const token = await getMyToken()
  if (!token) return { ok: false, message: "You must be logged in" }

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`, {
      method: "DELETE",
      headers: { token: token as string },
    })
    return { ok: res.ok }
  } catch (error) {
    console.log(error)
    return { ok: false, message: "Something went wrong" }
  }
}