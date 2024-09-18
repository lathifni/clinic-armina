import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container:{
      center: true,
      padding: '8rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },  
      fontFamily: {
        'irish-grover': ['Irish Grover', 'sans-serif'],
        'sans': ['Racing Sans One', 'sans-serif'],
        racing: ['Racing Sans One', 'sans-serif'],
      },
      colors:{
        blueCustom:'#0766AD',
        blueLigth:"#F0F4FC",
        lightGreen: '#A9E5E5'
      },
      boxShadow:{
        custom : "0 4px 4px rgba(0, 0, 0, 0.25)"
      }
      
    },
  
  },
  plugins: [],
};
export default config;
