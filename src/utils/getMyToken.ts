import { auth } from "@/lib/nextauth.config"

export async function getMyToken() {
  const session = await auth()
  return session?.accessToken
}

export async function getUserId() {
  const session = await auth()
  return session?.user?.id ?? null
}
