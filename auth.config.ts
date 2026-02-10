import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"

// Notice: No Prisma Adapter here!
export const authConfig = {
  providers: [
    GitHub, 
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/projects'); // Protect specific routes
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
    session({ session, token }) {
        // If you are using a database strategy, the user ID typically comes 
        // from the user object, not the token. But for now, let's keep it simple.
        if (session.user && token.sub) {
            session.user.id = token.sub;
        }
        return session;
    }
  },
} satisfies NextAuthConfig