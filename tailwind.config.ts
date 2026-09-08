import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07100D",
        emerald: "#21D39A",
        aqua: "#28D8D0",
        danger: "#8D3036"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        fa: ["var(--font-vazirmatn)", "Tahoma", "sans-serif"]
      }
    }
  },
  plugins: []
};
export default config;