import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Only protect /admin routes
  if (pathname.startsWith('/admin')) {
    // Check for NextAuth session cookie (works for both HTTP and HTTPS)
    const sessionCookie = 
      request.cookies.get('next-auth.session-token') || 
      request.cookies.get('__Secure-next-auth.session-token');
      
    // If not logged in and trying to access admin dashboard
    if (!sessionCookie && pathname !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // If logged in and trying to access login page
    if (sessionCookie && pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
