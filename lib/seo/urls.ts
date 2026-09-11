export function getAbsoluteUrl(path: string = ""): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://bhtcollections.com";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}
