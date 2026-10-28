"use client";

import React, { useState } from "react";
import { PrimaryNav } from "./PrimaryNav";
import { SecondaryNav } from "./SecondaryNav";
import { MobileNav } from "./MobileNav";

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Sticky Main Header (Primary Nav) */}
      <header className="sticky top-0 z-40 w-full bg-white shadow-xs">
        <PrimaryNav onToggleMobileMenu={() => setIsMobileMenuOpen(true)} />

        {/* Mobile Navigation Drawer */}
        <MobileNav
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </header>

      {/* Non-Sticky Secondary Navigation Bar (naturally scrolls away with page) */}
      <SecondaryNav />
    </div>
  );
};
