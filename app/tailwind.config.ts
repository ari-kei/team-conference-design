import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#3758F9",
      secondary: "#13C296",
      danger: "#FF4B4B",
      stroke: "#DFE4EA",
      icon: "#70757A",
      "text-primary": "#637381",
      "text-secondary": "#8899A8",
      "text-forcus": "#6CBAFF",
      "text-link": "#6CBAFF",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
