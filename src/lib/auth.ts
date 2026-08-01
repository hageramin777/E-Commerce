import { auth } from "./nextauth.config"

export interface CurrentUser {
  id: string
  name: string
  email?: string | null
  role: string
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  return {
    id: session.user.id,
    name: session.user.name ?? "User",
    email: session.user.email,
    role: session.user.role ?? "user",
  }
}
