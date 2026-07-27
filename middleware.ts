export { auth as middleware } from "@/lib/nextauth.config"

export const config = {
  matcher: ["/cart/:path*", "/wishlist/:path*", "/checkout/:path*", "/allorders/:path*"],
}