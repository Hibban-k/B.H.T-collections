import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // 1. Admin Route Protection ONLY
  if (pathname.startsWith("/admin")) {
    const isLoggedIn = !!req.auth;
    
    if (!isLoggedIn && pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
    }
    if (isLoggedIn && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }
    return NextResponse.next();
  }

  // 2. Skip API routes, Next.js internals, and static assets
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 3. Regional routing: redirect non-locale root or paths to default /en
  // (e.g. '/' -> '/en', '/about' -> '/en/about', '/collections' -> '/en/collections')
  // Public routes NEVER redirect to admin.
  const hasLocale = /^\/[a-zA-Z]{2}(\/.*)?$/.test(pathname);

  if (!hasLocale) {
    const redirectUrl = new URL(`/en${pathname === "/" ? "" : pathname}`, req.nextUrl);
    redirectUrl.search = req.nextUrl.search;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
