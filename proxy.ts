import { auth } from "@/lib/auth/auth";
import { NextResponse, type NextRequest } from "next/server";

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Admin Route Protection: handled via NextAuth
  if (pathname.startsWith("/admin")) {
    return (auth as any)(req);
  }

  // 2. Skip API routes, Next.js internal files, and static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 3. Regional routing: redirect non-locale root or paths to default /en
  // (e.g. '/' -> '/en', '/about' -> '/en/about', '/collections' -> '/en/collections')
  // Public routes NEVER touch NextAuth logic or admin redirects.
  const hasLocale = /^\/[a-zA-Z]{2}(\/.*)?$/.test(pathname);

  if (!hasLocale) {
    const redirectUrl = new URL(`/en${pathname === "/" ? "" : pathname}`, req.url);
    redirectUrl.search = req.nextUrl.search;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
