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
        fers: {
          navy: "#0f2744",
          blue: "#1d4ed8",
          sky: "#e0f2fe",
        },
      },
    },
  },
  plugins: [],
};

export default config;
