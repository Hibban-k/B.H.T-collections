/**
 * Sanitizes image URLs to prevent Next.js Image component crashes when users paste
 * Google image search links, malformed URLs, or local/external combinations.
 */
export function cleanImageUrl(inputUrl?: string | null): string {
  const fallback = "/collections/korean-super-soft-blanket.png";
  if (!inputUrl || typeof inputUrl !== "string") return fallback;

  let url = inputUrl.trim();

  // If user pasted /collections/https://... or similar concatenated string
  if (url.includes("http://") || url.includes("https://")) {
    const httpIdx = url.indexOf("http://");
    const httpsIdx = url.indexOf("https://");
    const actualStart = httpsIdx !== -1 && (httpIdx === -1 || httpsIdx < httpIdx) ? httpsIdx : httpIdx;
    if (actualStart > 0) {
      url = url.slice(actualStart);
    }
  }

  // If it's a Google Search imgres URL, extract the actual imgurl parameter
  if (url.includes("google.com/imgres") || url.includes("imgurl=")) {
    try {
      const parsed = new URL(url);
      const extracted = parsed.searchParams.get("imgurl");
      if (extracted) {
        return decodeURIComponent(extracted);
      }
    } catch {
      // ignore parsing error and continue
    }
  }

  // If it's a valid remote http(s) URL
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // If it's a local path, ensure it starts with '/' and remove any dangerous query chars
  if (!url.startsWith("/")) {
    url = "/" + url;
  }

  // If local path contains unencoded query parameters or invalid chars, sanitize or fallback
  if (url.includes("?") || url.includes("&")) {
    const cleanPath = url.split("?")[0];
    return cleanPath || fallback;
  }

  return url;
}
