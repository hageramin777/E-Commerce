"use server"

import { AuthError } from "next-auth"

import { signIn } from "@/lib/nextauth.config"
import { loginDataType } from "./login.schma"
import { loginSchema } from "./login.schma"

export interface LoginResult {
  ok: boolean
  message?: string
}

function getSafeRedirectPath(redirectTo?: string) {
  if (!redirectTo?.startsWith("/") || redirectTo.startsWith("//")) {
    return "/"
  }

  return redirectTo
}

export async function loginAction(
  values: loginDataType,
  redirectTo?: string
): Promise<LoginResult> {
  const parsedCredentials = loginSchema.safeParse(values)

  if (!parsedCredentials.success) {
    return { ok: false, message: "Please enter a valid email and password" }
  }

  try {
    const resultUrl = await signIn("credentials", {
      ...parsedCredentials.data,
      redirect: false,
      redirectTo: getSafeRedirectPath(redirectTo),
    })

    const result = new URL(resultUrl, "http://localhost")

    const authError = result.searchParams.get("error")

    if (authError) {
      return {
        ok: false,
        message:
          authError === "CredentialsSignin"
            ? "Invalid email or password"
            : "Unable to sign in right now",
      }
    }

    return { ok: true }
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        ok: false,
        message:
          error.type === "CredentialsSignin"
            ? "Invalid email or password"
            : "Unable to sign in right now",
      }
    }

    console.error("[loginAction] Sign in failed:", error)
    return { ok: false, message: "Unable to connect to the server" }
  }
}
