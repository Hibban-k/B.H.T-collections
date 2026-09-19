"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";

export default function StoreLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main className="min-h-screen bg-[#F8F9FA]">{children}</main>;
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FAFAFC]">
      {/* Global Repeating Watermark Background on Every Page */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 select-none"
        style={{
          backgroundImage: "url('/watermark-bg.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "550px auto",
          opacity: 0.95,
        }}
      />

      {/* Main App Content on top of background */}
      <div className="relative z-10 flex flex-col min-h-screen flex-1">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
