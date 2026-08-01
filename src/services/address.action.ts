"use server"

import { auth } from "@/lib/nextauth.config"
import { revalidatePath } from "next/cache"

export interface Address {
  _id: string
  name: string
  details: string
  city: string
  phone: string
}

export interface AddressValues {
  name: string
  details: string
  city: string
  phone: string
}

interface ApiResponse {
  data?: Address[]
  message?: string
}

interface AddressResult {
  ok: boolean
  data: Address[]
  message?: string
}

async function getToken() {
  const session = await auth()
  return session?.accessToken
}

export async function getAddresses(): Promise<AddressResult> {
  const token = await getToken()

  if (!token) {
    return {
      ok: false,
      data: [],
      message: "You must be logged in",
    }
  }

  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/addresses",
      {
        headers: {
          token,
        },
        cache: "no-store",
      }
    )

    const responseData = (await res.json().catch(
      () => ({})
    )) as ApiResponse

    return {
      ok: res.ok,
      data: Array.isArray(responseData.data)
        ? responseData.data
        : [],
      message: responseData.message,
    }
  } catch (error) {
    console.error("[getAddresses] Request failed:", error)

    return {
      ok: false,
      data: [],
      message: "Unable to load addresses",
    }
  }
}

export async function deleteAddress(id: string) {
  const token = await getToken()

  if (!token) {
    return {
      ok: false,
      message: "You must be logged in",
    }
  }

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
      {
        method: "DELETE",
        headers: {
          token,
        },
      }
    )

    const data = (await res.json().catch(
      () => ({})
    )) as ApiResponse

    if (res.ok) {
      revalidatePath("/profile")
      revalidatePath("/profile/addresses")
    }

    return {
      ok: res.ok,
      message:
        data.message ??
        (res.ok
          ? "Address deleted successfully"
          : "Unable to delete address"),
    }
  } catch (error) {
    console.error("[deleteAddress] Request failed:", error)

    return {
      ok: false,
      message: "Unable to delete address",
    }
  }
}

export async function addAddress(values: AddressValues) {
  const token = await getToken()

  if (!token) {
    return {
      ok: false,
      message: "You must be logged in",
    }
  }

  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/addresses",
      {
        method: "POST",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    )

    const data = (await res.json().catch(
      () => ({})
    )) as ApiResponse

    if (res.ok) {
      revalidatePath("/profile")
      revalidatePath("/profile/addresses")
    }

    return {
      ok: res.ok,
      message:
        data.message ??
        (res.ok
          ? "Address added successfully"
          : "Unable to add address"),
    }
  } catch (error) {
    console.error("[addAddress] Request failed:", error)

    return {
      ok: false,
      message: "Unable to add address",
    }
  }
}
