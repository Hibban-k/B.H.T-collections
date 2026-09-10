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
    <>
      {/* Global Single Watermark Background with Subtle Opacity for Store Pages */}
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
    </>
  );
}
