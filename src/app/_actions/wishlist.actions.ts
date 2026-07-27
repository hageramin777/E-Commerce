"use server"

import { getMyToken } from "@/utils/getMyToken"
import { WishlistResponseType } from "@/types/wishlist.type"

export async function getUserWishlist(): Promise<WishlistResponseType | null> {
  const token = await getMyToken()
  if (!token) return null

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        token: token as string,
      },
    })
    const finalRes = await res.json()
    return finalRes
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function addToWishlist(productId: string) {
  const token = await getMyToken()
  if (!token) return { ok: false, message: "You must be logged in" }

  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    })
    const finalRes = await res.json()
    return { ok: res.ok, data: finalRes }
  } catch (error) {
    console.log(error)
    return { ok: false, message: "Something went wrong" }
  }
}

export async function removeFromWishlist(productId: string) {
  const token = await getMyToken()
  if (!token) return { ok: false, message: "You must be logged in" }

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    })
    const finalRes = await res.json()
    return { ok: res.ok, data: finalRes }
  } catch (error) {
    console.log(error)
    return { ok: false, message: "Something went wrong" }
  }
}
