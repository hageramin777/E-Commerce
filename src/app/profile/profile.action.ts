"use server"

import { getMyToken } from "@/utils/getMyToken"

export async function changePassword(values: {
  currentPassword: string
  password: string
  rePassword: string
}) {
  const token = await getMyToken()

  if (!token) {
    return {
      ok: false,
      message: "You must be logged in",
    }
  }

  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        method: "PUT",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    )

    const data = await res.json()

    return {
      ok: res.ok,
      data,
    }
  } catch (error) {
    console.log(error)

    return {
      ok: false,
      message: "Something went wrong",
    }
  }
}
