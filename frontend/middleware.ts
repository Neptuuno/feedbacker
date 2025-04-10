import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // Read the token from cookies
    const authCookie = (await cookies()).get('access_token');
    const accessToken = authCookie?.value;

    const response = NextResponse.next()
    response.cookies.set('last_pathname', request.nextUrl.pathname + request.nextUrl.search,{
        maxAge: 60 * 60 * 24 * 7,
        secure: true,
        httpOnly: true
    });

    if (!accessToken) {
        const redirectUrl = new URL('/login', request.url);
        redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }

    return response;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/((?!login|register|forms/render/.*|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
}