import type { ReactNode } from "react";

export function PageHeroIntro({ title, description, eyebrow = "BHT COLLECTIONS", overlappingCards = false }: {
  title: ReactNode; description: ReactNode; eyebrow?: string; overlappingCards?: boolean;
}) {
  return (
    <div className={`bht-page-intro ${overlappingCards ? "bht-page-intro--cards" : ""}`}>
      <div className="hero-copy max-w-[1440px] mx-auto px-5 sm:px-8 text-center">
        <p className="bht-eyebrow uppercase text-neutral-500 mb-5">{eyebrow}</p>
        <h1 className="max-w-4xl mx-auto mb-5">{title}</h1>
        <p className="bht-copy text-neutral-600 max-w-3xl mx-auto">{description}</p>
      </div>
    </div>
  );
}
