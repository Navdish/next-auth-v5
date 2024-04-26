import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas"
import {
    DEFAULT_LOGIN_REDIRECT,
} from "@/routes"

// export default auth((req)=> {
//     const isLoggedIn = !!req.auth;
//     console.log("Route : ", req.nextUrl.pathname);
//     console.log("is logged in : ", isLoggedIn);

//     const {nextUrl} = req;
//     const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//     const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//     const isAuthRoute = authRoutes.includes(nextUrl.pathname);
//     console.log("api route",isApiAuthRoute,  "auth routes ", isAuthRoute);
//     if(isApiAuthRoute) {
//         return ;
//     }
//     if(isAuthRoute) {
//         if(isLoggedIn) {
//             console.log("redirected path", DEFAULT_LOGIN_REDIRECT)
//             return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//         }
//         return;
//     }
//     if(!isLoggedIn && !isPublicRoute) {
//         return NextResponse.redirect(new URL("/auth/login", nextUrl))
//     }
//     return;
// })
export default { 
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
          const isLoggedIn = !!auth?.user;
        const isOnDashboard = nextUrl.pathname.startsWith(DEFAULT_LOGIN_REDIRECT);
          if (isOnDashboard) {
            if (isLoggedIn) return true;
            return false; 
          } else if (isLoggedIn) {
            return Response.redirect(new URL('/settings', nextUrl));
          }
          return true;
        },
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);
                if(validatedFields.success) {
                    const user = validatedFields.data;
                    return user;
                }
                return null;
            }
        })
    ] 
} satisfies NextAuthConfig