"use server"

import { cookies } from "next/headers"
import { loginDataType } from "./login.schma"

export async function loginUpAction(values: loginDataType) {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
    body: JSON.stringify(values),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const finalRes = await res.json()
  console.log("finalRes", finalRes)

  if (res.ok) {
    const myCookies = await cookies()

    myCookies.set("token", finalRes.token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      secure: true,
      sameSite: "strict",
    })
  }

  return {
    ok: res.ok,
    data: finalRes,
  }
}
