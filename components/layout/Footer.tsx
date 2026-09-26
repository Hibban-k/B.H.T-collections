"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageSquare, ArrowUp, MapPin as UAEPin } from "lucide-react";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0C1220] text-white pt-16 pb-8 border-t border-white/10 relative overflow-hidden font-sans">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        
        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* Column 1: Company Identity (4 cols) */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative w-11 h-11 shrink-0">
                <Image
                  src="/bht-flower-icon.png"
                  alt="B.H.T. Emblem"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[14px] font-extrabold tracking-[0.06em] text-white uppercase font-sans">
                  B.H.T. COLLECTIONS
                </span>
                <span className="text-[12px] font-bold text-[#DE2628]" dir="rtl">
                  بيت البطانيات مجموعات
                </span>
                <span className="text-[8.5px] font-semibold tracking-[0.14em] text-[#94A3B8] uppercase mt-0.5">
                  BLANKET HOUSE TRADING L.L.C.
                </span>
              </div>
            </Link>

            <p className="text-[13px] leading-[1.7] text-[#94A3B8] max-w-[320px] mb-6 font-sans">
              Premium textiles, bedding, travel accessories and footwear, serving global markets with quality, reliability and excellence.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-[#DE2628] hover:bg-[#DE2628] transition-all"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-[#298DCB] hover:bg-[#298DCB] transition-all"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-all"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: COMPANY (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[11.5px] font-bold tracking-[0.16em] text-white uppercase mb-4 font-sans flex items-center gap-2">
              <span>COMPANY</span>
              <span className="w-3 h-[2px] bg-[#DE2628] rounded-full" />
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#94A3B8]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#strengths" className="hover:text-white transition-colors">
                  Why Choose Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: COLLECTIONS (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[11.5px] font-bold tracking-[0.16em] text-white uppercase mb-4 font-sans flex items-center gap-2">
              <span>COLLECTIONS</span>
              <span className="w-3 h-[2px] bg-[#298DCB] rounded-full" />
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#94A3B8]">
              <li>
                <Link href="/collections/bed-linen" className="hover:text-white transition-colors">
                  Bedsheets
                </Link>
              </li>
              <li>
                <Link href="/collections/comforters" className="hover:text-white transition-colors">
                  Comforters
                </Link>
              </li>
              <li>
                <Link href="/collections/blankets" className="hover:text-white transition-colors">
                  Blankets
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white transition-colors">
                  Pillows &amp; Cushions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: BUSINESS (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[11.5px] font-bold tracking-[0.16em] text-white uppercase mb-4 font-sans flex items-center gap-2">
              <span>PORTFOLIO</span>
              <span className="w-3 h-[2px] bg-[#149344] rounded-full" />
            </h4>
            <ul className="space-y-2.5 text-[13px] text-[#94A3B8]">
              <li>
                <Link href="/collections" className="hover:text-white transition-colors">
                  Travel Suitcases
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white transition-colors">
                  Comfort Footwear
                </Link>
              </li>
              <li>
                <Link href="#brands" className="hover:text-white transition-colors">
                  Brands We Represent
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Regional Offices
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: CONTACT (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-[11.5px] font-bold tracking-[0.16em] text-white uppercase mb-4 font-sans flex items-center gap-2">
              <span>CONTACT</span>
              <span className="w-3 h-[2px] bg-[#DE2628] rounded-full" />
            </h4>
            <ul className="space-y-3 text-[12.5px] text-[#94A3B8]">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#DE2628] shrink-0" />
                <a href="tel:+97142214567" className="hover:text-white transition-colors">
                  +971 4 221 4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#298DCB] shrink-0" />
                <a href="mailto:info@bhtcollections.com" className="hover:text-white transition-colors break-all">
                  info@bhtcollections.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#149344] shrink-0 mt-0.5" />
                <span>Dubai, United Arab Emirates</span>
              </li>
              <li className="pt-1">
                <a
                  href="https://wa.me/971500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#149344] hover:bg-[#117C39] text-white text-[10.5px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-full transition-colors shadow-[0_2px_8px_rgba(20,147,68,0.3)]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Sub-Footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#64748B]">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-semibold text-white">
              <UAEPin className="w-3.5 h-3.5 text-[#DE2628]" />
              UAE
            </span>
            <span>•</span>
            <p>© 2026 B.H.T. Collections. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
