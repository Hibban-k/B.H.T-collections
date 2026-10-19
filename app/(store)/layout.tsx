import type { Metadata } from "next";
import "../globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Blanket House Trading LLC | بيت البطانيات للتجارة ذ.م.م — BHT Collections",
  description:
    "Premium bilingual UAE home and lifestyle retail brand. Discover luxury bedding, comforters, travel luggage, trolleys, and high-performance footwear.",
  icons: {
    icon: "/logo/logo.png",
  },
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white text-bht-charcoal antialiased">
        <LanguageProvider>
          {children}
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}
