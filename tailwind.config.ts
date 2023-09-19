import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-black": { DEFAULT: "#141414", popup: "#181818" },
        "secondary-grey": { DEFAULT: "#808080", 100: "#6D6D6E" },
        "tertiary-white": { DEFAULT: "#fff", heading: "#e5e5e5" },
        "netflix-green": "#46d369",
      },
    },
  },
  plugins: [],
};
export default config;
