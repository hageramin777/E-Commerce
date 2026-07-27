"use server"

export async function signupAction(values: {
  name: string
  email: string
  password: string
  rePassword: string
  phone: string
}) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    )

    const finalRes = await res.json()

    return {
      ok: res.ok,
      data: finalRes,
    }

  } catch (error) {
    console.log(error)

    return {
      ok: false,
      data: {
        message: "Something went wrong",
      },
    }
  }
}