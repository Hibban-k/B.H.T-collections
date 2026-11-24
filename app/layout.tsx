/* eslint-disable @next/next/no-page-custom-font -- Global stylesheet in the App Router root, shared by every page. */
import { headers } from "next/headers";
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = (await headers()).get("x-bht-locale") === "ar" ? "ar" : "en";
  return <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" />
  </head><body>{children}</body></html>;
}
