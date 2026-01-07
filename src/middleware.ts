import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    // const isLoggedIn = !!req.auth;
    // const { pathname } = req.nextUrl;

    // if (pathname.startsWith("/admin") && !isLoggedIn) {
    //     return NextResponse.redirect(new URL("/login", req.url));
    // }

    // if (pathname.startsWith("/login") && isLoggedIn) {
    //     return NextResponse.redirect(new URL("/admin", req.url));
    // }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
