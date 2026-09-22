"use client";
// components/layout/Header.tsx — design-patch revision
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

type DropLink = { label: string; href: string };
type NavItem = { label: string; href: string; children?: DropLink[] };

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Collections",
    href: "/collections",
    children: [
      { label: "All Collections", href: "/collections" },
      { label: "Blankets", href: "/collections/blankets" },
      { label: "Bed Linen", href: "/collections/bed-linen" },
      { label: "Comforters", href: "/collections/comforters" },
      { label: "Bedspreads", href: "/collections/bedspreads" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileDropOpen, setMobileDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ── Utility bar (midnight navy) ───────────────────────── */}
      <div className="bg-[#13233A] text-white/85 py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-medium tracking-wide">
          <span>UAE Delivery &nbsp;·&nbsp; Established 2009 &nbsp;·&nbsp; 500+ GCC Clients</span>
          <a
            href="https://wa.me/971558879237"
            className="flex items-center gap-1.5 text-white/85 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3" />
            Wholesale Enquiries: +971 55 887 9237
          </a>
        </div>
      </div>

      {/* ── Main header ──────────────────────────────────────────── */}
      <div
        className={`w-full transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/97 backdrop-blur-md border-[#D8DCE2] shadow-[0_1px_6px_rgba(0,0,0,0.06)]"
            : "bg-white border-[#D8DCE2]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center" aria-label="B.H.T. Collections — Home">
            <div className="relative" style={{ width: 160, height: 54 }}>
              <Image
                src="/bht-navbar-brand.png"
                alt="B.H.T. Collections"
                fill
                className="object-contain object-left"
                priority
                sizes="160px"
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="relative" ref={dropRef}>
                  <button
                    onClick={() => setDropOpen((o) => !o)}
                    aria-expanded={dropOpen}
                    className={`flex items-center gap-1 text-[13.5px] font-medium py-1.5 transition-colors relative ${
                      isActive(item.href)
                        ? "text-[#D02E30]"
                        : "text-[#25262C] hover:text-[#D02E30]"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        dropOpen ? "rotate-180 text-[#D02E30]" : ""
                      }`}
                    />
                    {isActive(item.href) && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D02E30] rounded-full" />
                    )}
                  </button>

                  {dropOpen && (
                    <div
                      role="menu"
                      className="absolute top-full left-0 mt-1 w-52 bg-white border border-[#D8DCE2] shadow-lg rounded-lg py-2 z-50"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          className={`block px-5 py-2.5 text-[13px] font-medium transition-colors ${
                            pathname === child.href
                              ? "text-[#D02E30] bg-[#FFF5F5]"
                              : "text-[#25262C] hover:text-[#D02E30] hover:bg-[#FAFAF4]"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative text-[13.5px] font-medium py-1.5 transition-colors flex flex-col items-center ${
                    isActive(item.href)
                      ? "text-[#D02E30]"
                      : "text-[#25262C] hover:text-[#D02E30]"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D02E30] rounded-full" />
                  )}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/971558879237"
              className="btn-red !py-2 !px-4 !text-xs"
            >
              Enquire Now
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 -mr-2 text-[#25262C] hover:text-[#D02E30] transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile full-screen menu ───────────────────────────────── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 top-[calc(72px+36px)] bg-white z-40 overflow-y-auto"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="max-w-7xl mx-auto px-5 py-4 flex flex-col">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => setMobileDropOpen((o) => !o)}
                    className="flex items-center justify-between w-full py-4 border-b border-[#D8DCE2] text-[15px] font-semibold text-[#25262C] hover:text-[#D02E30] transition-colors"
                    aria-expanded={mobileDropOpen}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${mobileDropOpen ? "rotate-180 text-[#D02E30]" : ""}`}
                    />
                  </button>
                  {mobileDropOpen && (
                    <div className="pl-4 py-1 border-b border-[#D8DCE2] bg-[#F8F7F4]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-3 text-[14px] text-[#25262C] hover:text-[#D02E30] font-medium transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block py-4 border-b border-[#D8DCE2] text-[15px] font-semibold transition-colors ${
                    isActive(item.href) ? "text-[#D02E30]" : "text-[#25262C] hover:text-[#D02E30]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="pt-6 pb-4 flex flex-col gap-3">
              <a href="https://wa.me/971558879237" className="btn-red text-center">
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
