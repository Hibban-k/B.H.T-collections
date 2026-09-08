import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import AuthProvider from "@/components/providers/AuthProvider";

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
  metadataBase: new URL("https://blankethouse.ae"),
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
          {/* Global Single Watermark Background with Subtle Opacity */}
          <div
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center select-none overflow-hidden"
          >
            <div
              className="w-[90vw] max-w-[700px] h-[500px] bg-contain bg-center bg-no-repeat opacity-[0.05]"
              style={{ backgroundImage: "url('/bht-logo.jpg')" }}
            />
          </div>
          <div className="relative z-10 flex flex-col min-h-screen">
            <AnnouncementBar />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
      </body>
    </html>
  );
}
