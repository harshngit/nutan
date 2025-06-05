/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['PlayfairDisplay', 'serif'],
        alike: ['Alike'],
      },
      screens: {
        xxl: '1408px', // Custom screen at ~110% of 1280px
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marqueeTop: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        marqueeTop: "marqueeTop 10s linear infinite",
        marquee: "marquee 10s linear infinite",
      },
      backgroundImage: {
        "banner": "url('/asset/Home/bgimg.jpg')",
      },
      colors: {
        primary: "#565449",
        secondary: "#11120D",
      },
    },
  },
  plugins: [],
});
