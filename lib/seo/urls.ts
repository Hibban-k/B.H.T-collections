/** One explicit production origin; preview hosts never become canonicals. */
export function getBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL;
  const url = new URL(configured || "https://www.blankethouse.ae");
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Invalid site URL protocol");
  if (url.hostname !== "localhost" && url.hostname !== "127.0.0.1") {
    url.protocol = "https:";
    if (!url.hostname.endsWith(".vercel.app") && !url.hostname.startsWith("www.")) url.hostname = "www." + url.hostname;
  }
  return url.origin;
}
export function getAbsoluteUrl(path = ""): string {
  if (/^https?:\/\//i.test(path)) return new URL(path).href;
  return new URL("/" + path.replace(/^\/+/, ""), getBaseUrl() + "/").href;
}
export function getProductPath(product: { categorySlug?: string; category?: string; slug: string }, locale = "en") {
  const category = (product.categorySlug || product.category || "bedding").toLowerCase();
  return "/" + locale + "/c=" + encodeURIComponent(category) + "/" + encodeURIComponent(product.slug);
}
export function localizePath(path: string, locale: string): string {
  if (!path.startsWith("/") || path.startsWith("//") || /^\/(api|admin)(\/|$)/.test(path)) return path;
  if (/^\/[a-z]{2}(\/|$|\?)/.test(path)) return path;
  const canonicalPath = path.replace(/^\/collections(?=$|\?)/, "/bedding").replace(/^\/collections\//, "/");
  return `/${locale}${canonicalPath === "/" ? "" : canonicalPath}`;
}
/** Only redirect the configured apex, never previews, APIs or auth callbacks. */
export function getCanonicalRedirect(requestUrl: string): string | null {
  const url = new URL(requestUrl);
  const canonical = new URL(getBaseUrl());
  if (!canonical.hostname.startsWith("www.") || /^\/(api|admin)(\/|$)/.test(url.pathname)) return null;
  if (url.hostname !== canonical.hostname.slice(4) && url.hostname !== canonical.hostname) return null;
  if (url.origin === canonical.origin) return null;
  url.host = canonical.host;
  url.protocol = canonical.protocol;
  return url.href;
}
