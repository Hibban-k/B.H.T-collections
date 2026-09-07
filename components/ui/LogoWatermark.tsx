"use client";

import Image from "next/image";

interface LogoWatermarkProps {
  opacity?: number; // 0.02 to 0.15
  position?: "center" | "right" | "left" | "top-right" | "bottom-right";
  size?: number; // width in pixels
  className?: string;
  isDarkBg?: boolean;
  isLightBg?: boolean;
}

export default function LogoWatermark({
  opacity = 0.05,
  position = "center",
  size = 500,
  className = "",
  isDarkBg = false,
}: LogoWatermarkProps) {
  const getPosClasses = () => {
    switch (position) {
      case "right":
        return "right-[-5%] top-1/2 -translate-y-1/2";
      case "left":
        return "left-[-5%] top-1/2 -translate-y-1/2";
      case "top-right":
        return "right-4 top-4";
      case "bottom-right":
        return "right-6 bottom-6";
      case "center":
      default:
        return "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2";
    }
  };

  return (
    <div
      className={`absolute pointer-events-none select-none z-0 overflow-hidden ${getPosClasses()} ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <div
        className="relative"
        style={{
          width: `${size}px`,
          height: `${size * 0.75}px`,
          filter: isDarkBg
            ? "brightness(1.4) contrast(1.2)"
            : "none",
        }}
      >
        <Image
          src="/bht-logo.jpg"
          alt=""
          fill
          className="object-contain"
          priority={false}
          sizes={`${size}px`}
        />
      </div>
    </div>
  );
}
