import { parseStoreLocale } from "@/lib/seo/locales";
import { getCanonicalRedirect } from "@/lib/seo/urls";
import { auth } from "@/lib/auth/auth";
import { NextResponse, type NextMiddleware, type NextFetchEvent, type NextRequest } from "next/server";

export default async function proxy(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;
  const canonical = getCanonicalRedirect(req.url);
  if (canonical) return NextResponse.redirect(canonical, 308);

  // 1. Admin Route Protection: handled via NextAuth
  if (pathname.startsWith("/admin")) {
    const continueAdmin: NextMiddleware = () => NextResponse.next();
    const adminMiddleware: NextMiddleware = auth(continueAdmin);
    return adminMiddleware(req, event);
  }

  // 2. Skip API routes, Next.js internal files, and static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Unscoped requests default to the international market; language never selects a country.
  // Public routes NEVER touch NextAuth logic or admin redirects.
  const segment = pathname.split("/")[1];
  const parsedLocale = parseStoreLocale(segment);
  const hasLocale = /^[a-z]{2}$/i.test(segment);
  // Preserve country URLs; only the old language-only Arabic URL migrates.
  if (segment === "ar") {
    const target = new URL(req.url);
    target.pathname = "/en" + pathname.slice(3);
    const response = NextResponse.redirect(target, 307);
    response.cookies.set("bht_language", "ar", { path: "/", maxAge: 31536000, sameSite: "lax" });
    return response;
  }
  if (parsedLocale && parsedLocale.locale !== segment) {
    const target = new URL(req.url);
    target.pathname = "/" + parsedLocale.locale + pathname.slice(segment.length + 1);
    return NextResponse.redirect(target, 308);
  }

  if (!hasLocale) {
    const targetLocale = "en";
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
