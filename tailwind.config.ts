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
        red: {
          DEFAULT: "#B62D35",
          hover: "#92232B",
          active: "#771C23",
        },
        green: {
          DEFAULT: "#188345",
        },
        forest: {
          DEFAULT: "#17452F",
        },
        blue: {
          DEFAULT: "#246783",
        },
        ivory: {
          DEFAULT: "#F8F6F1",
        },
        linen: {
          DEFAULT: "#EEE9E1",
        },
        ink: {
          DEFAULT: "#202723",
        },
        body: {
          DEFAULT: "#565B57",
        },
        "muted-light": {
          DEFAULT: "#D5E2D8",
        },
        border: {
          DEFAULT: "#D8D4CC",
        },
        control: {
          DEFAULT: "#7A817B",
        },
        selected: {
          DEFAULT: "#F5E7E5",
        },
        taupe: {
          DEFAULT: "#C9B79F",
        },
        surface: {
          DEFAULT: "#FFFFFF",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair-display)", "Georgia", "serif"],
        montserrat: ["var(--font-montserrat-var)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      borderRadius: {
        DEFAULT: "4px",
      },
    },
  },
  plugins: [],
};

export default config;
