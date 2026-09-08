export { auth as proxy, auth as default } from "@/lib/auth/auth";

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
