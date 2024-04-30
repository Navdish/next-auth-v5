import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { NextResponse } from "next/server";
import GitHub from "next-auth/providers/github"

export default {
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  // events: {
  //   linkAccount() {
  //     console.log("email verified")
  //   }
  // },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith(DEFAULT_LOGIN_REDIRECT);
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return NextResponse.redirect(new URL("/settings", nextUrl));
      }
      return true;
    },
    async jwt({token}) {
      // console.log("token",token)
      return token;
    },
    async session({token, session}) {
      // console.log("session token",token)
      return session;
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const user = validatedFields.data;
          return user;
        }
        return null;
      },
    }),
    GitHub
  ],
} satisfies NextAuthConfig;