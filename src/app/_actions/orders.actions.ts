"use server"

import { shippingAddressType } from "@/types/order.type"
import { getMyToken, getUserId } from "@/utils/getMyToken"

export async function createCashOrder(cartId: string, shippingAddress: shippingAddressType) {
  const token = await getMyToken()

  const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`, {
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(shippingAddress),
  })

  const finalRes = await res.json()
  return finalRes
}

export async function createVisaOrder(cartId: string, shippingAddress: shippingAddressType) {
  const token = await getMyToken()

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    {
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(shippingAddress),
    }
  )

  const finalRes = await res.json()
  return finalRes
}

export async function getUserOrders() {
  const userId = await getUserId()

  if (!userId) return []

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
  const finalRes = await res.json()

  return finalRes
}