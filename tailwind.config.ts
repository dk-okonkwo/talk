import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        prima: {
          50: "#fefae0",
          100: "#dda15e",
          200: "#bc6c25",
        },
        secondary: {
          100: "#606c38",
          200: "#283618",
        },
      },
    },
  },
  plugins: [],
};

export default config;
