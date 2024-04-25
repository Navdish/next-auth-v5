import authConfig from '@/auth.config'
import NextAuth from 'next-auth';
const {auth} = NextAuth(authConfig);

export default auth((req)=> {
    const isLoggedIn = !!req.auth;
    console.log("Route : ", req.nextUrl.pathname);
    console.log("is logged in : ", isLoggedIn);
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/auth/register", "/auth/login"]
}