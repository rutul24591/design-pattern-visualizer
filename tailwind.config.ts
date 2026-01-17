import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          light: "#FAFAF9",
          dark: "#0F0F12",
        },
        foreground: {
          light: "#18181B",
          dark: "#F5F5F6",
        },
        primary: {
          light: "#0D9488",
          dark: "#14B8A6",
          DEFAULT: "#0D9488",
        },
        secondary: {
          light: "#F59E0B",
          dark: "#FCD34D",
          DEFAULT: "#F59E0B",
        },
        accent: {
          light: "#7C3AED",
          dark: "#A78BFA",
          DEFAULT: "#7C3AED",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "8px",
      },
      transitionDuration: {
        DEFAULT: "150ms",
      },
    },
  },
  plugins: [],
};

export default config;
