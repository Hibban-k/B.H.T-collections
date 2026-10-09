"use client";
// app/admin/layout.tsx
import "../globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Layers,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  CheckCircle2,
  Tag,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Layers },
  { label: "Brands", href: "/admin/brands", icon: Tag },
  { label: "Regions", href: "/admin/regions", icon: ExternalLink },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // If on login page, render without sidebar shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut({ redirectTo: "/admin/login" });
    } catch {
      router.push("/admin/login");
    } finally {
      setLoggingOut(false);
    }
  };

  const isLinkActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <html lang="en">
      <body
        className="min-h-screen bg-[#F8F9FA] text-[#0B131F] flex flex-col md:flex-row"
        style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
      >
        <AuthProvider>
      {/* ── Sidebar Desktop ─────────────────────────────────── */}
      <aside className="hidden md:flex w-64 bg-black text-white flex-col justify-between border-r border-[#1E2B3E] shrink-0 sticky top-0 h-screen z-30">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-[#1E2B3E]">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/5 border border-white/10 shrink-0">
                <Image
                  src="/bht-logo.jpg"
                  alt="BHT Admin"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <div
                  className="text-base font-bold tracking-wide text-white"
                  style={{ fontFamily: "var(--font-playfair-display, Georgia, serif)" }}
                >
                  B.H.T. Admin
                </div>
                <div className="text-[10px] text-[#E6C687] font-semibold tracking-wider uppercase">
                  Management Portal
                </div>
              </div>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1.5" aria-label="Admin Navigation">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const active = isLinkActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    active
                      ? "bg-bht-red text-white shadow-md shadow-red-950/40"
                      : "text-[#A0AEC0] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={active ? 2.2 : 1.75} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#1E2B3E] space-y-2">
          {/* Live Store Link */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-semibold text-[#A0AEC0] hover:bg-white/5 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#E6C687]" />
              <span>Live Website</span>
            </span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded">
              SYNCED
            </span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-xs font-semibold text-[#FF8080] hover:bg-[#D92626]/10 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>{loggingOut ? "Signing out..." : "Logout"}</span>
          </button>
        </div>
      </aside>

      {/* ── Mobile Header & Drawer ─────────────────────────── */}
      <div className="md:hidden bg-black text-white p-4 flex items-center justify-between border-b border-[#1E2B3E] sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded overflow-hidden bg-white/5 border border-white/10 shrink-0">
            <Image src="/bht-logo.jpg" alt="BHT Admin" fill className="object-contain p-0.5" />
          </div>
          <span className="text-sm font-bold text-white">B.H.T. Admin</span>
        </Link>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 text-white hover:text-[#D4AF37]"
          aria-label="Toggle Menu"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-64 bg-black text-white p-5 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#1E2B3E]">
                <span className="font-bold text-sm">Navigation</span>
                <button onClick={() => setMobileSidebarOpen(false)} className="text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-2">
                {sidebarLinks.map((item) => {
                  const Icon = item.icon;
                  const active = isLinkActive(item.href, item.exact);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold ${
                        active ? "bg-bht-red text-white" : "text-[#A0AEC0] hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-[#1E2B3E] space-y-2">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2.5 text-xs text-[#A0AEC0]"
              >
                <ExternalLink className="w-4 h-4 text-[#E6C687]" />
                <span>Visit Storefront</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-xs text-[#FF8080]"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileSidebarOpen(false)} />
        </div>
      )}

      {/* ── Main Content Area ──────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar on desktop */}
        <header className="hidden md:flex bg-white border-b border-[#EAE3D2] px-8 py-4 items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-medium text-[#64748B]">
            <ShieldCheck className="w-4 h-4 text-[#1BA14B]" />
            <span>Single Admin Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Database Active</span>
            </div>
            <div className="text-xs font-bold text-bht-charcoal bg-[#FAF8F5] border border-[#E8DFC8] px-3.5 py-1.5 rounded-lg">
              admin@blankethouse.ae
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
        </AuthProvider>
      </body>
    </html>
  );
}
