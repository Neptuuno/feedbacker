// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

// This function can be marked `async` if using `await` inside
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(request: NextRequest) {
    // return NextResponse.redirect(new URL('/', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/((?!login|register|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
}