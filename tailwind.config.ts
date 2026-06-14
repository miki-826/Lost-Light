import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#05060A",
        ink: "#0D1320",
        candle: "#F5F1E8",
        mist: "#A8B0BD",
        cyan: {
          quiet: "#67E8F9",
          pale: "#22D3EE",
        },
        violet: { dusk: "#8B5CF6" },
        gold: { dawn: "#F6D365" },
        line: "#20334D",
        teal: { deep: "#0E7490" },
        lost: "#1A1026",
        morning: "#FFF4C2",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "45%": { opacity: "0.82" },
          "55%": { opacity: "0.9" },
          "70%": { opacity: "0.78" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        dawn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        flicker: "flicker 4s ease-in-out infinite",
        rise: "rise 0.7s ease-out both",
        dawn: "dawn 2s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
