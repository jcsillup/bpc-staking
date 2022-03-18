module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C2EFEB",
        secondary: "#032725",
        body: "#14011C",
        dark: "#17181C",
        light: "#393939"
      }
    },
    container: {
      screens: {
         lg: "100%",
         xl: "1240px"
      }
    }
  }
}