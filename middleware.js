// middleware.js (in root directory)
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  // Check if the request is for the portal page
  if (request.nextUrl.pathname.startsWith('/portal')) {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.USER_JWT_SECRET || 'your-user-secret-key');
      await jwtVerify(token, secret);
      
      // Token is valid, allow access
      return NextResponse.next();
    } catch (error) {
      // Token is invalid, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/portal/:path*']
};