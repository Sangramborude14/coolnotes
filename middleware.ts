import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
    // 1. Check if the user has a session
    const { data: session } = await betterFetch("/api/auth/get-session", {
        baseURL: request.nextUrl.origin,
        headers: {
            cookie: request.headers.get("cookie") || "",
        },
    });

    // 2. If no session and trying to access a protected page, redirect to Login
    if (!session && !request.nextUrl.pathname.startsWith("/login") && !request.nextUrl.pathname.startsWith("/signup")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

// 3. Tell Next.js which paths to protect
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
