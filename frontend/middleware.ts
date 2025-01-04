import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // Read the token from cookies
    const cookie = (await cookies()).get('access_token');
    const accessToken = cookie?.value;

    if (!accessToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/((?!login|register|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
}