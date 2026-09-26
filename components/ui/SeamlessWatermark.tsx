"use client";

export default function SeamlessWatermark() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 select-none overflow-hidden"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <pattern
            id="seamlessBhtWatermark"
            width="260"
            height="260"
            patternUnits="userSpaceOnUse"
          >
            {/* Center Logo: Rotated -10deg */}
            <g transform="translate(130, 130)">
              <g transform="rotate(-10)">
                <image
                  href="/bht-flower-icon.png"
                  x="-36"
                  y="-36"
                  width="72"
                  height="72"
                  opacity="0.075"
                />
              </g>
            </g>

            {/* Corner Logos: Staggered at 10deg, mathematically seamless across tile borders */}
            {/* Top-Left */}
            <g transform="translate(0, 0)">
              <g transform="rotate(10)">
                <image
                  href="/bht-flower-icon.png"
                  x="-36"
                  y="-36"
                  width="72"
                  height="72"
                  opacity="0.075"
                />
              </g>
            </g>

            {/* Top-Right */}
            <g transform="translate(260, 0)">
              <g transform="rotate(10)">
                <image
                  href="/bht-flower-icon.png"
                  x="-36"
                  y="-36"
                  width="72"
                  height="72"
                  opacity="0.075"
                />
              </g>
            </g>

            {/* Bottom-Left */}
            <g transform="translate(0, 260)">
              <g transform="rotate(10)">
                <image
                  href="/bht-flower-icon.png"
                  x="-36"
                  y="-36"
                  width="72"
                  height="72"
                  opacity="0.075"
                />
              </g>
            </g>

            {/* Bottom-Right */}
            <g transform="translate(260, 260)">
              <g transform="rotate(10)">
                <image
                  href="/bht-flower-icon.png"
                  x="-36"
                  y="-36"
                  width="72"
                  height="72"
                  opacity="0.075"
                />
              </g>
            </g>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#seamlessBhtWatermark)" />
      </svg>
    </div>
  );
}
