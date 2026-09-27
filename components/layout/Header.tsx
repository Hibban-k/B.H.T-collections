"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Search, User, ShoppingCart } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b border-[#EAEAEA] h-[80px] lg:h-[100px] ${scrolled ? "bg-white/95 backdrop-blur-md shadow-[0_2px_14px_rgba(0,0,0,0.04)]" : "bg-white/90 backdrop-blur-sm"
        }`}
    >
      <div className="max-w-[1680px] mx-auto h-full px-5 sm:px-8 flex items-center justify-between">

        {/* Left: Logo + Brand Name with Red Arabic Text */}
        <Link
          href="/"
          className="flex items-center gap-3.5 group shrink-0"
          aria-label="B.H.T. Collections Home"
        >
          <div className="relative w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] shrink-0 transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/bht-flower-icon.png"
              alt="B.H.T. Collections Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="hidden md:flex flex-col leading-tight">
            <span className="text-[20px] sm:text-[25px] font-extrabold tracking-[0.01em] text-[#0C1220] uppercase font-sans">
              B.H.T. COLLECTIONS
            </span>
            <span className="text-[20.5px] sm:text-[23.5px] font-bold text-[#DE2628] tracking-normal" dir="rtl">
              بيت البطانيات مجموعات
            </span>
          </div>
        </Link>

        {/* Right Section: Navigation Links + Action Icons + Red ENQUIRE */}
        <div className="flex items-center gap-6 sm:gap-7">

          {/* Navigation Links with Red Active Indicator */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Primary Navigation">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[20px] font-medium tracking-wide transition-colors relative py-1.5 ${active ? "text-[#DE2628] font-bold" : "text-[#1E293B] hover:text-[#DE2628]"
                    }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#DE2628] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Red ENQUIRE Pill Button */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center justify-center bg-[#DE2628] hover:bg-[#B71C1E] text-white text-[15px] font-bold tracking-[0.06em] uppercase px-5 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(222,38,40,0.28)]"
          >
            ENQUIRE
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 text-[#0C1220] hover:text-[#DE2628] focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-[#EAEAEA] shadow-xl animate-fadeIn">
          <div className="max-w-[1280px] mx-auto px-6 py-5 flex flex-col gap-3.5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`py-2 text-[14px] font-medium tracking-wide border-b border-gray-100 flex items-center justify-between ${isActive(item.href) ? "text-[#DE2628] font-bold" : "text-[#1E293B]"
                  }`}
              >
                <span>{item.label}</span>
                {isActive(item.href) && <span className="w-2 h-2 rounded-full bg-[#DE2628]" />}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 w-full text-center bg-[#DE2628] hover:bg-[#B71C1E] text-white text-[12px] font-bold tracking-wider uppercase py-3 rounded-full shadow-[0_4px_14px_rgba(222,38,40,0.25)]"
            >
              ENQUIRE NOW
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
