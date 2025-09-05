/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: "#EFD0CA",    
        sand: "#C1BCAC",     
        olive: "#979B8D",   
        sage: "#5C7457",    
        forest: "#214E34",   
      },
    },
  },
  plugins: [],
}
