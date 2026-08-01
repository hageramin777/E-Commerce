import { DefaultSession } from "next-auth"
import "next-auth"

declare module "next-auth" {
  interface User {
    accessToken?: string
    role?: string
  }

  interface Session {
    accessToken?: string
    user: {
      id?: string
      role?: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    userId?: string
    role?: string
  }
}
