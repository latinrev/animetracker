/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#261839",
        primary: "#ff69b4",
        contrast: "#0F3D3E",
        secondary: "#E2DCC8",
        ongoing: "#53BF9D",
        finished: "#F94C66",
        hiatus: "#4F709C",
      },
    },
  },
  plugins: [],
};
