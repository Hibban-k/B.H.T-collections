"use client";
// components/layout/Header.tsx
import { useState, useEffect } from "react";
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
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileDropOpen, setMobileDropOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "shadow-md bg-white/95 backdrop-blur-md" : "bg-white"
        } border-b border-[#F2EBDC]`}
      style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[80px]">

          {/* ── Official Logo ─────────────────────────────── */}
          <Link
            href="/"
            aria-label="B.H.T. Collections Home"
            className="flex items-center gap-3 shrink-0 group py-1"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/bht-logo.jpg"
                alt="B.H.T. Collections Official Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-[18px] sm:text-[20px] font-bold tracking-[0.08em] text-[#0B131F] group-hover:text-[#1C75BC] transition-colors leading-none"
                style={{ fontFamily: "var(--font-playfair-display, Georgia, serif)" }}
              >
                B.H.T. COLLECTIONS
              </span>
              <span className="text-[10px] text-[#D92626] font-semibold leading-tight mt-1">
                بيت البطانيات مجموعات
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ───────────────────────────────── */}
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
                    className={`flex items-center gap-1.5 text-[13px] font-semibold tracking-wide py-2 transition-colors ${isActive(item.href) ? "text-[#D92626]" : "text-[#0B131F] hover:text-[#1C75BC]"
                      }`}
                    aria-expanded={dropOpen}
                    aria-haspopup="menu"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${dropOpen ? "rotate-180 text-[#D92626]" : ""}`}
                    />
                  </button>

                  {/* Dropdown */}
                  {dropOpen && (
                    <div
                      role="menu"
                      className="absolute top-full left-0 w-56 bg-white border border-[#F2EBDC] shadow-xl rounded-b-md py-2 z-50 animate-fade-in"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          className={`block px-5 py-2.5 text-[13px] font-medium transition-colors ${pathname === child.href
                              ? "text-[#D92626] bg-[#FAF8F3] font-semibold border-l-2 border-[#D92626]"
                              : "text-[#0B131F] hover:text-[#1C75BC] hover:bg-[#FAF8F3]"
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
                  className={`text-[13px] font-semibold tracking-wide transition-colors ${isActive(item.href) ? "text-[#D92626]" : "text-[#0B131F] hover:text-[#1C75BC]"
                    }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* ── Desktop CTA ───────────────────────────────── */}
          <div className="hidden md:block shrink-0">
            <Link
              href="/contact"
              className="btn-primary"
            >
              Get In Touch
            </Link>
          </div>

          {/* ── Mobile Burger ─────────────────────────────── */}
          <button
            className="md:hidden p-2 -mr-2 text-[#0B131F] hover:text-[#D92626] transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ─────────────────────────────────── */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="md:hidden bg-white border-t border-[#F2EBDC] shadow-lg"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => setMobileDropOpen((o) => !o)}
                    className="flex items-center justify-between w-full py-3.5 border-b border-[#F2EBDC] text-[13px] font-semibold text-[#0B131F] hover:text-[#1C75BC] transition-colors"
                    aria-expanded={mobileDropOpen}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${mobileDropOpen ? "rotate-180 text-[#D92626]" : ""}`}
                    />
                  </button>
                  {mobileDropOpen && (
                    <div className="pl-4 py-1 border-b border-[#F2EBDC] flex flex-col gap-0.5 bg-[#FAF8F3]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2.5 text-[13px] text-[#64748B] hover:text-[#D92626] font-medium transition-colors"
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
                  className="block py-3.5 border-b border-[#F2EBDC] text-[13px] font-semibold text-[#0B131F] hover:text-[#1C75BC] transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="pt-4 pb-2 space-y-3">
              <a
                href="tel:+97142266095"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-[#0B131F] text-white rounded text-xs font-bold tracking-wide shadow-sm"
                style={{ color: "#FFFFFF" }}
              >
                <Phone className="w-4 h-4 text-[#D92626]" />
                <span>+971 4 2266 095 / +971 55 887 9237</span>
              </a>
              <Link
                href="/contact"
                className="btn-primary w-full text-center"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

