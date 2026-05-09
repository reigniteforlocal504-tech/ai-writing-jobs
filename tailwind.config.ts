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
        background: "#0A0A0A",
        card: "#111111",
        accent: "#00E5A0",
        border: "#1F1F1F",
        "text-primary": "#FFFFFF",
        "text-secondary": "#9CA3AF",
        "badge-himalayas": "#6366F1",
        "badge-indeed": "#003A9B",
        "badge-google": "#EA4335",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
