import React from "react";

interface CircularFlagProps {
  country: "uae" | "ksa" | "qatar" | "bahrain" | "kuwait" | "oman";
  size?: number;
  className?: string;
}

export const CircularFlag: React.FC<CircularFlagProps> = ({
  country,
  size = 56,
  className = "",
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-full overflow-hidden border border-[#E8E8E8] shadow-sm flex items-center justify-center shrink-0 relative ${className}`}
    >
      {country === "uae" && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* UAE 3 horizontal stripes */}
          <rect x="25" y="0" width="75" height="33.3" fill="#00732F" />
          <rect x="25" y="33.3" width="75" height="33.4" fill="#FFFFFF" />
          <rect x="25" y="66.7" width="75" height="33.3" fill="#000000" />
          {/* Red vertical bar on left */}
          <rect x="0" y="0" width="28" height="100" fill="#FF0000" />
        </svg>
      )}

      {country === "ksa" && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#006C35" />
          {/* Arabic Shahada & Sword representation */}
          <path
            d="M20 62 L80 62 L75 66 L25 66 Z"
            fill="#FFFFFF"
          />
          <text
            x="50"
            y="48"
            fill="#FFFFFF"
            fontSize="14"
            fontFamily="sans-serif"
            fontWeight="bold"
            textAnchor="middle"
          >
            لا إله إلا الله
          </text>
        </svg>
      )}

      {country === "qatar" && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#8D1B3D" />
          {/* Qatar serrated white section */}
          <polygon
            points="0,0 32,0 40,5.5 32,11.1 40,16.6 32,22.2 40,27.7 32,33.3 40,38.8 32,44.4 40,50 32,55.5 40,61.1 32,66.6 40,72.2 32,77.7 40,83.3 32,88.8 40,94.4 32,100 0,100"
            fill="#FFFFFF"
          />
        </svg>
      )}

      {country === "bahrain" && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#DA291C" />
          {/* Bahrain 5 white serrations */}
          <polygon
            points="0,0 28,0 38,10 28,20 38,30 28,40 38,50 28,60 38,70 28,80 38,90 28,100 0,100"
            fill="#FFFFFF"
          />
        </svg>
      )}

      {country === "kuwait" && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* 3 horizontal stripes */}
          <rect x="0" y="0" width="100" height="33.3" fill="#007A3D" />
          <rect x="0" y="33.3" width="100" height="33.4" fill="#FFFFFF" />
          <rect x="0" y="66.7" width="100" height="33.3" fill="#CE1126" />
          {/* Black trapezoid */}
          <polygon points="0,0 30,30 30,70 0,100" fill="#000000" />
        </svg>
      )}

      {country === "oman" && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Oman stripes */}
          <rect x="25" y="0" width="75" height="33.3" fill="#FFFFFF" />
          <rect x="25" y="33.3" width="75" height="33.4" fill="#DB161B" />
          <rect x="25" y="66.7" width="75" height="33.3" fill="#008000" />
          {/* Red vertical bar */}
          <rect x="0" y="0" width="28" height="100" fill="#DB161B" />
          {/* Khanjar emblem indicator */}
          <circle cx="14" cy="18" r="7" fill="#FFFFFF" />
        </svg>
      )}
    </div>
  );
};
