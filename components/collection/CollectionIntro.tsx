"use client";

import React from "react";

interface CollectionIntroProps {
  description?: string;
}

export const CollectionIntro: React.FC<CollectionIntroProps> = ({
  description,
}) => {
  if (!description || !description.trim()) {
    return null;
  }

  return (
    <div className="w-full bg-white py-3.5 sm:py-4.5 border-b border-[#F0F0F0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-4xl font-normal">
          {description}
        </p>
      </div>
    </div>
  );
};
