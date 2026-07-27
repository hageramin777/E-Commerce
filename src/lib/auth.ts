import { jwtDecode } from "jwt-decode"
import { auth } from "./nextauth.config"

interface TokenPayload {
  id: string
  name?: string
  role?: string
}

export interface CurrentUser {
  id: string
  name: string
  email?: string | null
  role: string
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await auth()
  const token = session?.realTokenFromBackEnd

  if (!session?.user || !token) {
    return null
  }

  try {
    const payload = jwtDecode<TokenPayload>(token)

    return {
      id: payload.id,
      name: payload.name ?? session.user.name ?? "User",
      email: session.user.email,
      role: payload.role ?? "user",
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
