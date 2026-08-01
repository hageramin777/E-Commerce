import { NextResponse } from "next/server"

import { auth } from "@/lib/nextauth.config"

const authRoutes = ["/login", "/login/signup"]

export default auth((request) => {
  const isAuthenticated = Boolean(request.auth?.user)
  const { pathname, search } = request.nextUrl
  const isAuthRoute = authRoutes.includes(pathname)

  if (!isAuthenticated && !isAuthRoute) {
    const loginUrl = new URL("/login", request.nextUrl)
    loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/cart/:path*",
    "/wishlist/:path*",
    "/checkout/:path*",
    "/payment/:path*",
    "/allorders/:path*",
    "/profile/:path*",
    "/change-password/:path*",
    "/login",
    "/login/signup",
  ],
}
