import { getCanonicalRedirect } from "@/lib/seo/urls";
import { auth } from "@/lib/auth/auth";
import { NextResponse, type NextRequest } from "next/server";

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const canonical = getCanonicalRedirect(req.url);
  if (canonical) return NextResponse.redirect(canonical, 308);

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

  // 3. Regional routing: redirect non-locale root or paths to /en or /ar based on cookie
  // (e.g. '/' -> '/en' or '/ar', '/about' -> '/en/about', '/collections' -> '/en/collections')
  // Public routes NEVER touch NextAuth logic or admin redirects.
  const hasLocale = /^\/[a-zA-Z]{2}(\/.*)?$/.test(pathname);

  if (!hasLocale) {
    const savedLocale = req.cookies.get("bht_language")?.value;
    const targetLocale = savedLocale === "ar" ? "ar" : "en";
    const redirectUrl = new URL(`/${targetLocale}${pathname === "/" ? "" : pathname}`, req.url);
    redirectUrl.search = req.nextUrl.search;
    return NextResponse.redirect(redirectUrl);
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-bht-locale", pathname.split("/")[1]);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
