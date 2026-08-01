import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode"
import { z } from "zod"

import { loginSchema } from "@/app/(auth)/login/login.schma"

const signInResponseSchema = z.object({
  token: z.string().min(1),
  user: z.object({
    _id: z.string().min(1).optional(),
    name: z.string().min(1),
    email: z.string().email(),
    role: z.string().optional(),
  }),
})

const accessTokenPayloadSchema = z.object({
  id: z.string().min(1),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials)

        if (!parsedCredentials.success) {
          return null
        }

        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsedCredentials.data),
            cache: "no-store",
          }
        )

        const responseBody: unknown = await response.json().catch(() => null)

        if (!response.ok) {
          return null
        }

        const parsedResponse = signInResponseSchema.safeParse(responseBody)

        if (!parsedResponse.success) {
          throw new Error("The authentication service returned an invalid response")
        }

        const { token: accessToken, user } = parsedResponse.data
        const parsedToken = accessTokenPayloadSchema.safeParse(
          jwtDecode<unknown>(accessToken)
        )
        const userId = user._id ?? (parsedToken.success ? parsedToken.data.id : undefined)

        if (!userId) {
          throw new Error("The authentication response does not contain a user id")
        }

        return {
          id: userId,
          name: user.name,
          email: user.email,
          role: user.role ?? "user",
          accessToken,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.userId = user.id
        token.role = user.role ?? "user"
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        if (typeof token.userId === "string") {
          session.user.id = token.userId
        }

        session.user.role = typeof token.role === "string" ? token.role : undefined
      }

      session.accessToken =
        typeof token.accessToken === "string" ? token.accessToken : undefined

      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
})
