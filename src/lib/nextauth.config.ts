import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
     async authorize(credentials) {
  console.log("=== AUTHORIZE CALLED ===")
  console.log("credentials received:", credentials)

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  })

  const finalRes = await res.json()
  console.log("API response:", finalRes)
  console.log("res.ok:", res.ok)

  if (res.ok && finalRes.token) {
    return {
      id: finalRes.user._id,
      name: finalRes.user.name,
      email: finalRes.user.email,
      realTokenFromBackEnd: finalRes.token,
    }
  }

  return null
},
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.realTokenFromBackEnd = user.realTokenFromBackEnd
      }
      return token
    },
    async session({ session, token }) {
      session.realTokenFromBackEnd = token.realTokenFromBackEnd as string
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
