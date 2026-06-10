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
        brand: {
          black: "#0A0A0A",
          coal: "#121212",
          smoke: "#1A1A1A",
          white: "#FFFFFF",
          offwhite: "#F7F3EE",
          gray: "#7A7A7A",
          chalk: "#E5E0DA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-fraunces)", "serif"],
      },
      boxShadow: {
        "luxe-sm": "0 2px 12px rgba(0,0,0,0.35)",
        luxe: "0 12px 40px -8px rgba(0,0,0,0.55)",
        "luxe-lg": "0 24px 80px -12px rgba(0,0,0,0.7)",
        "luxe-light": "0 16px 48px -16px rgba(10,10,10,0.22)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.8s ease forwards",
        marquee: "marquee 38s linear infinite",
        shimmer: "shimmer 2.6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
