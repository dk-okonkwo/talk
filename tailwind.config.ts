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
      keyframes:{
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
