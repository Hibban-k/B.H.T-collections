"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { PrimaryNav } from "./PrimaryNav";
import { SecondaryNav } from "./SecondaryNav";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track scroll position: visible naturally at rest, hidden when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMegaMenuOpen(false);
        setIsMobileMenuOpen(false);
        setIsHovered(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Close hover dropdown on route change
  useEffect(() => {
    setIsHovered(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 200);
  };

  const handleOpenMegaMenu = (categoryId?: string) => {
    setIsMegaMenuOpen(true);
    if (categoryId) {
      setActiveCategory(categoryId);
    }
  };

  const handleCloseMegaMenu = () => {
    setIsMegaMenuOpen(false);
    setActiveCategory(null);
  };

  return (
    <div className="w-full relative">
      {/* Sticky Main Header Container */}
      <header
        className="sticky top-0 z-40 w-full bg-white shadow-xs"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocusCapture={handleMouseEnter}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) handleMouseLeave();
        }}
      >
        <PrimaryNav
          onOpenMegaMenu={handleOpenMegaMenu}
          onCloseMegaMenu={handleCloseMegaMenu}
          isMegaMenuOpen={isMegaMenuOpen}
          activeMegaCategory={activeCategory}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Floating Secondary Nav: appears under sticky header ONLY when scrolled down AND hovered */}
        <div
          className={`hidden md:block absolute top-full inset-x-0 z-30 transition-[opacity,transform,visibility] duration-200 ease-out ${
            isScrolled && (isHovered || isMegaMenuOpen)
              ? "opacity-100 translate-y-0 pointer-events-auto visible shadow-xl"
              : "opacity-0 -translate-y-1 pointer-events-none invisible"
          }`}
        >
          <SecondaryNav variant="floating" />
        </div>

        {/* Mega Menu overlay */}
        <MegaMenu
          isOpen={isMegaMenuOpen}
          onClose={handleCloseMegaMenu}
          activeCategory={activeCategory}
        />

        {/* Mobile Drawer */}
        <MobileNav
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </header>

      {/* Static Secondary Nav: naturally visible at top of page when NOT scrolled, scrolls away with page */}
      <div className="hidden md:block w-full">
        <SecondaryNav variant="static" />
      </div>
    </div>
  );
};
