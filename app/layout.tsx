import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import StoreLayoutShell from "@/components/layout/StoreLayoutShell";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat-var",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "BHTCOLLECTIONS | Premium Bedding & Blankets in UAE",
    template: "%s | BHTCOLLECTIONS",
  },
  description:
    "Shop premium blankets, bed linen, comforters and bedspreads from BHTCOLLECTIONS. Elevate your comfort with quality home textiles delivered across the UAE.",
  keywords: [
    "premium bedding UAE",
    "blankets Dubai",
    "bed linen UAE",
    "comforters Dubai",
    "bedspreads UAE",
    "SMARTEX blanket",
    "luxury bedding",
    "home textiles UAE",
  ],
  openGraph: {
    type: "website",
    siteName: "BHTCOLLECTIONS",
    title: "BHTCOLLECTIONS | Premium Bedding & Blankets in UAE",
    description:
      "Elevate your comfort with premium blankets, bed linen, comforters and bedspreads. Delivered across the UAE.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="relative bg-[#FAFAF7] text-[#0D1B2A] antialiased min-h-screen" style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}>
        <AuthProvider>
          <StoreLayoutShell>{children}</StoreLayoutShell>
        </AuthProvider>
      </body>
    </html>
  );
}
