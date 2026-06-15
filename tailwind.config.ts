// tailwind.config.ts
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
        primary: "#2c5282",
        secondary: "#4299e1",
        accent: "#3182ce",
        "accent-light": "#63b3ed",
      },
      fontFamily: {
        sans: ["Titillium Web", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;