import { auth } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const locales = ["en", "ae"];

  // Admin Route Protection
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

  // Skip if it's an API route or static asset
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // Default to en or detect from headers
    const locale = "en";
    req.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(req.nextUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next).*)"],
};
