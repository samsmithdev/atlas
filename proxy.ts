import NextAuth from "next-auth"
import { authConfig } from "./auth.config"

// Initialize NextAuth with ONLY the config (no adapter)
export default NextAuth(authConfig).auth

export const config = {
  // logic to match all routes except static files
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}