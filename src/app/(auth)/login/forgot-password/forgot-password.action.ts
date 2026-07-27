"use server"

export async function forgotPasswordAction(email: string) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    )

    const data = await res.json()

    return {
      ok: res.ok,
      data,
    }

  } catch {
    return {
      ok: false,
      data: {
        message: "Something went wrong",
      },
    }
  }
}



export async function verifyResetCodeAction(resetCode: string) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resetCode }),
      }
    )

    const data = await res.json()

    return {
      ok: res.ok,
      data,
    }

  } catch {
    return {
      ok: false,
      data: {
        message: "Something went wrong",
      },
    }
  }
}




export async function resetPasswordAction(
  email: string,
  newPassword: string
) {
  try {

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      }
    )


    const data = await res.json()

    return {
      ok: res.ok,
      data,
    }


  } catch {

    return {
      ok:false,
      data:{
        message:"Something went wrong"
      }
    }

  }
}