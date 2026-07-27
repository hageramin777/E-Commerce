import "next-auth"

declare module "next-auth" {
  interface User {
    realTokenFromBackEnd?: string
  }

  interface Session {
    realTokenFromBackEnd?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    realTokenFromBackEnd?: string
  }
}
