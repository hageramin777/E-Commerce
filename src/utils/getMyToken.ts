import { auth } from "@/lib/nextauth.config"
import { jwtDecode } from "jwt-decode"


export async function getMyToken() {
  const session = await auth()
  return session?.realTokenFromBackEnd
}

interface DecodedToken {
  id: string
  name: string
  role: string
}

export async function getUserId() {
  const token = await getMyToken()

  if (!token) return null

  const decoded = jwtDecode<DecodedToken>(token)
  return decoded.id
}
