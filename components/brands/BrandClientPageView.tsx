"use client";

import React from "react";
import { Navbar } from "@/components/header/Navbar";
import { Footer } from "@/components/footer/Footer";
import { BrandClientHero } from "./BrandClientHero";
import { BrandClientGrid } from "./BrandClientGrid";

export const BrandClientPageView: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1">
        <BrandClientHero />
        <BrandClientGrid />
      </main>

      <Footer />
    </div>
  );
};
