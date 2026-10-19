"use client";

import React, { useState, useEffect } from "react";
import { PrimaryNav } from "./PrimaryNav";
import { SecondaryNav } from "./SecondaryNav";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

export const Navbar: React.FC = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMegaMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs">
      <PrimaryNav
        onOpenMegaMenu={handleOpenMegaMenu}
        onCloseMegaMenu={handleCloseMegaMenu}
        isMegaMenuOpen={isMegaMenuOpen}
        activeMegaCategory={activeCategory}
        onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      <SecondaryNav />

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
