"use client";
// components/layout/AnnouncementBar.tsx
import { MapPin } from "lucide-react";

// Inline SVG icons for social media
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function AnnouncementBar() {
  return (
    <div
      className="bg-white border-b border-[#EBEBEB] relative z-20"
      style={{ fontFamily: "var(--font-montserrat-var, system-ui, sans-serif)", height: "38px" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-full">
        {/* Left: Brand tagline */}
        <div className="flex items-center gap-3 text-[10.5px] font-medium text-[#56636A]">
          <span className="flex items-center gap-1.5">
            <span className="text-[#E12620] text-xs leading-none">✣</span>
            <span className="font-semibold text-[#122936] tracking-wide">Premium Bedding &amp; Home Textiles</span>
          </span>
          <span className="hidden sm:inline text-[#D0D0D0] select-none">|</span>
          <span className="hidden sm:inline text-[#56636A] tracking-wide">Comfort for Every Home</span>
        </div>

        {/* Right: Social + Location */}
        <div className="flex items-center gap-4 text-[10.5px] text-[#56636A] font-medium">
          <span className="hidden sm:inline tracking-wide text-[#56636A]">Follow Us</span>
          <div className="flex items-center gap-2.5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className="text-[#56636A] hover:text-[#E12620] transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
              className="text-[#56636A] hover:text-[#1598D0] transition-colors"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Subscribe on YouTube"
              className="text-[#56636A] hover:text-[#E12620] transition-colors"
            >
              <YoutubeIcon className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <MapPin className="w-[11px] h-[11px] text-[#E12620]" strokeWidth={2} />
            <span className="text-[10.5px] font-semibold text-[#122936]">UAE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
