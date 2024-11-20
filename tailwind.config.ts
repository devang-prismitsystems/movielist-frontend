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
        backgroundColor: "var(--background)",
        foregroundColor: "var(--foreground)",
        primaryColor: "var(--primary)",
        errorColor: "var(--error)",
        inputColor: "var(--input)",
        cardColor: "var(--card)",
      },
    },
  },
  plugins: [],
};
export default config;
