"use client";

import React, { useState } from "react";
import { PrimaryNav } from "./PrimaryNav";
import { SecondaryNav } from "./SecondaryNav";
import { MobileNav } from "./MobileNav";

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Sticky Main White Navbar (Primary Nav) - permanently sticky throughout scroll */}
      <header className="sticky top-0 z-40 w-full bg-white shadow-xs">
        <PrimaryNav onToggleMobileMenu={() => setIsMobileMenuOpen(true)} />

        {/* Mobile Navigation Drawer */}
        <MobileNav
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </header>

      {/* Non-Sticky Secondary Navigation Bar (scrolls away naturally) */}
      <SecondaryNav />
    </>
  );
};
