"use server"

import { CartResType } from "@/types/cart.type"
import { getMyToken } from "@/utils/getMyToken"

export async function addProductToCart(id: string) {
  const token = await getMyToken()
  if (!token) return { ok: false, message: "You must be logged in to add items to cart" }

  const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    method: "POST",
    body: JSON.stringify({ productId: id }),
    headers: { "Content-Type": "application/json", token: token as string },
  })

  const finalRes = await res.json()
  return { ok: res.ok, data: finalRes }
}

export async function getUserCart(): Promise<CartResType | null> {
  const token = await getMyToken()
  if (!token) return null

  const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    headers: { token: token as string },
  })

  return await res.json()
}

export async function updateCartItemQuantity(productId: string, count: number) {
  const token = await getMyToken()
  if (!token) return { ok: false, message: "Not logged in" }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
    method: "PUT",
    body: JSON.stringify({ count }),
    headers: { "Content-Type": "application/json", token: token as string },
  })

  const finalRes = await res.json()
  return { ok: res.ok, data: finalRes }
}

export async function removeCartItem(productId: string) {
  const token = await getMyToken()
  if (!token) return { ok: false, message: "Not logged in" }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
    method: "DELETE",
    headers: { token: token as string },
  })

  const finalRes = await res.json()
  return { ok: res.ok, data: finalRes }
}

export async function clearCart() {
  const token = await getMyToken()
  if (!token) return { ok: false, message: "Not logged in" }

  const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    method: "DELETE",
    headers: { token: token as string },
  })

  const finalRes = await res.json()
  return { ok: res.ok, data: finalRes }
}
