"use server"

import { getMyToken } from "@/utils/getMyToken"

interface ChangePasswordResponse {
  message?: string
  token?: string
}

export async function changePasswordAction(values: {
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
    const response = await fetch(
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

    const data = (await response.json()) as ChangePasswordResponse

    return {
      ok: response.ok,
      data,
      message: data.message,
    }
  } catch (error) {
    console.log(error)

    return {
      ok: false,
      message: "Something went wrong",
    }
  }
}
