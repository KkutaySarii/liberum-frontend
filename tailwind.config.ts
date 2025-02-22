import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF7200',
        'secondary': '#FF9902',
        'light': '#FDC97E',
        'dark': '#000000',
        'light-white': '#FAFAFA',
      },
      fontFamily: {
        'satoshi': ['Satoshi-Regular', 'sans-serif'],
        'satoshi-bold': ['Satoshi-Bold', 'sans-serif'],
        'satoshi-medium': ['Satoshi-Medium', 'sans-serif'],
        'satoshi-light': ['Satoshi-Light', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
