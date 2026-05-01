import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from '@/lib/db';
import { authConfig } from "./auth.config"; // Import the edge-safe config

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" }, // Essential for this Edge compatibility pattern
  ...authConfig, // Spread the edge config here
});