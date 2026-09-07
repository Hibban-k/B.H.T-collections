import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B131F",
          50: "#EAEFF5",
          100: "#C7D4E5",
          200: "#92A9C9",
          300: "#5E7FAD",
          400: "#2B5491",
          500: "#0B131F",
          600: "#080F19",
          700: "#060B12",
          800: "#04070C",
          900: "#020306",
        },
        brandRed: {
          DEFAULT: "#D92626",
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#D92626",
          600: "#B91C1C",
          700: "#991B1B",
          800: "#7F1D1D",
          900: "#450A0A",
        },
        brandBlue: {
          DEFAULT: "#1C75BC",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#1C75BC",
          600: "#155E96",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        brandGreen: {
          DEFAULT: "#1BA14B",
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#1BA14B",
          600: "#15803D",
          700: "#166534",
          800: "#14532D",
          900: "#052E16",
        },
        ivory: {
          DEFAULT: "#FAF8F3",
          50: "#FFFFFF",
          100: "#FAF8F3",
          200: "#F5F0E6",
          300: "#EFE8D9",
          400: "#E4D7BE",
          500: "#D6C3A0",
        },
        cream: "#FAF8F3",
        beige: "#F2EBDC",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        montserrat: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.4s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
