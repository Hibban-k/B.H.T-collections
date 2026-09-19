"use client";
// components/layout/Header.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Search, User, ShoppingCart, ChevronDown } from "lucide-react";

type DropLink = { label: string; href: string };
type NavItem = { label: string; href: string; children?: DropLink[] };

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? "shadow-[0_2px_14px_rgba(0,0,0,0.05)] bg-white/95 backdrop-blur-md" : "bg-white"
      } border-b border-[#F0F0F0]`}
      style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between" style={{ height: "78px" }}>

          {/* ── Brand Logo & Text Lockup ──────────────────────── */}
          <Link
            href="/"
            aria-label="B.H.T. Collections Home"
            className="flex items-center shrink-0 group py-1 transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="relative h-[54px] w-[196px] sm:h-[58px] sm:w-[210px]">
              <Image
                src="/bht-navbar-brand.png"
                alt="B.H.T. Collections - بيت البطانيات مجموعات"
                fill
                className="object-contain object-left"
                priority
                sizes="(max-width: 640px) 196px, 210px"
              />
            </div>
          </Link>

          {/* ── Center Navigation Links ───────────────────────── */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setDropOpen(true)}
                  onMouseLeave={() => setDropOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1.5 text-[14px] font-medium tracking-wide py-2 transition-colors relative ${
                      isActive(item.href)
                        ? "text-[#E12620] font-semibold"
                        : "text-[#122936] hover:text-[#E12620]"
                    }`}
                    aria-expanded={dropOpen}
                    aria-haspopup="menu"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 text-[#56636A] ${
                        dropOpen ? "rotate-180 text-[#E12620]" : ""
                      }`}
                    />
                    {/* Active Underline */}
                    {isActive(item.href) && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E12620] rounded-full" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {dropOpen && (
                    <div
                      role="menu"
                      className="absolute top-full left-0 w-52 bg-white border border-[#EBEBEB] shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-b-lg py-1.5 z-50 animate-fade-in"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          className={`block px-5 py-2.5 text-[13px] font-medium transition-colors ${
                            pathname === child.href
                              ? "text-[#E12620] bg-[#FAFAFC] font-semibold border-l-2 border-[#E12620]"
                              : "text-[#122936] hover:text-[#E12620] hover:bg-[#FAFAFC]"
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
                  className={`relative text-[14px] tracking-wide py-2 transition-colors flex flex-col items-center group ${
                    isActive(item.href)
                      ? "text-[#E12620] font-semibold"
                      : "text-[#122936] font-medium hover:text-[#E12620]"
                  }`}
                >
                  {item.label}
                  {/* Active Home Red Bar underneath */}
                  {isActive(item.href) && (
                    <span className="w-6 h-[2px] bg-[#E12620] rounded-full mt-0.5" />
                  )}
                  {/* Hover line */}
                  {!isActive(item.href) && (
                    <span className="w-0 group-hover:w-6 h-[2px] bg-[#E12620] rounded-full transition-all duration-200 mt-0.5" />
                  )}
                </Link>
              )
            )}
          </nav>

          {/* ── Right Icons: Search, User, Cart ───────────────── */}
          <div className="hidden md:flex items-center gap-6 shrink-0">
            <button
              aria-label="Search"
              className="text-[#122936] hover:text-[#E12620] transition-colors p-1"
            >
              <Search className="w-5 h-5" strokeWidth={1.8} />
            </button>
            <button
              aria-label="Account"
              className="text-[#122936] hover:text-[#E12620] transition-colors p-1"
            >
              <User className="w-5 h-5" strokeWidth={1.8} />
            </button>
            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="relative text-[#122936] hover:text-[#E12620] transition-colors p-1"
            >
              <ShoppingCart className="w-5 h-5" strokeWidth={1.8} />
              {/* Solid red notification badge */}
              <span className="absolute -top-1.5 -right-2 min-w-[17px] h-[17px] bg-[#E12620] text-white text-[9.5px] font-bold rounded-full flex items-center justify-center px-[3px] leading-none">
                0
              </span>
            </Link>
          </div>

          {/* ── Mobile Burger ─────────────────────────────────── */}
          <button
            className="md:hidden p-2 -mr-2 text-[#122936] hover:text-[#E12620] transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────────── */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="md:hidden bg-white border-t border-[#EBEBEB] shadow-lg"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex flex-col">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => setMobileDropOpen((o) => !o)}
                    className="flex items-center justify-between w-full py-3.5 border-b border-[#EBEBEB] text-[13px] font-semibold text-[#122936] hover:text-[#E12620] transition-colors"
                    aria-expanded={mobileDropOpen}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${mobileDropOpen ? "rotate-180 text-[#E12620]" : ""}`}
                    />
                  </button>
                  {mobileDropOpen && (
                    <div className="pl-4 py-1 border-b border-[#EBEBEB] flex flex-col gap-0.5 bg-[#FAFAFC]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2.5 text-[13px] text-[#56636A] hover:text-[#E12620] font-medium transition-colors"
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
                  className={`block py-3.5 border-b border-[#EBEBEB] text-[13px] font-semibold transition-colors ${
                    isActive(item.href) ? "text-[#E12620]" : "text-[#122936] hover:text-[#E12620]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
            {/* Mobile icons row */}
            <div className="pt-4 pb-2 flex items-center justify-center gap-7">
              <button aria-label="Search" className="text-[#122936] hover:text-[#E12620] transition-colors">
                <Search className="w-5 h-5" strokeWidth={1.8} />
              </button>
              <button aria-label="Account" className="text-[#122936] hover:text-[#E12620] transition-colors">
                <User className="w-5 h-5" strokeWidth={1.8} />
              </button>
              <Link
                href="/cart"
                aria-label="Cart"
                className="relative text-[#122936] hover:text-[#E12620] transition-colors"
              >
                <ShoppingCart className="w-5 h-5" strokeWidth={1.8} />
                <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-[#E12620] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-[3px]">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
