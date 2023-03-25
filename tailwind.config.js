/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // ## Screen sizes
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        lx: "1440px",
      },
      // ## Colors
      colors: {
        // ### Primary
        cl_Moderateblue: " hsl(238, 40%, 52%)",
        cl_SoftRed: "hsl(358, 79%, 66%)",
        cl_Lightgrayishblue: "hsl(239, 57%, 85%)",
        cl_Palered: "hsl(357, 100%, 86%)",
        // ### Neutral
        cl_Darkblue: "hsl(212, 24%, 26%)",
        cl_GrayishBlue: "hsl(211, 10%, 45%)",
        cl_Lightgray: "hsl(223, 19%, 93%)",
        cl_Verylightgray: "hsl(228, 33%, 97%)",
        cl_White: "hsl(0, 0%, 100%)",
      },
    },
  },
  plugins: [],
}
