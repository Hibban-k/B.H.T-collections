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
  const [isSecondaryVisible, setIsSecondaryVisible] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMegaMenuOpen(false);
        setIsMobileMenuOpen(false);
        setIsSecondaryVisible(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Close secondary nav on route change
  useEffect(() => {
    setIsSecondaryVisible(false);
  }, [pathname]);

  const handleHeaderMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsSecondaryVisible(true);
  };

  const handleHeaderMouseLeave = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      setIsSecondaryVisible(false);
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
    <header
      className="sticky top-0 z-40 w-full bg-white shadow-xs"
      onMouseEnter={handleHeaderMouseEnter}
      onMouseLeave={handleHeaderMouseLeave}
      onFocusCapture={handleHeaderMouseEnter}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) handleHeaderMouseLeave();
      }}
    >
      <PrimaryNav
        onOpenMegaMenu={handleOpenMegaMenu}
        onCloseMegaMenu={handleCloseMegaMenu}
        isMegaMenuOpen={isMegaMenuOpen}
        activeMegaCategory={activeCategory}
        onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Floating Secondary Navigation revealed on Main Header Hover */}
      <div
        className={`hidden md:block absolute top-full inset-x-0 z-30 transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isSecondaryVisible
            ? "opacity-100 translate-y-0 pointer-events-auto visible shadow-xl"
            : "opacity-0 -translate-y-1 pointer-events-none invisible"
        }`}
      >
        <SecondaryNav />
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
  );
};
