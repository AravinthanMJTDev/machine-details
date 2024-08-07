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
      scale: {
        "200": "2",
        "300": "3",
        "400": "4",
        "500": "5",
        "600": "6",
        "1000": "5",
      },
      width: {
        "800": "800px",
        "683": "800px",
      },
      screens: {
        sm: "300px",
        md: "800px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      zIndex: {
        "100": "1000px",
      },
    },
  },
  plugins: [],
};

export default config;
