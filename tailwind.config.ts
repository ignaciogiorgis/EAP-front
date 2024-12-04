import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "fade-move": "fadeMove 10s ease-out forwards infinite",
      },
      keyframes: {
        fadeMove: {
          "0%": { opacity: "0", transform: "translateX(20px)" }, // Usa valores en string
          "100%": { opacity: "1", transform: "translateX(0)" }, // Usa valores en string
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
