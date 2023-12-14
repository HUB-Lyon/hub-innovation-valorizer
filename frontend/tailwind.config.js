/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        epitechBlue: {
          DEFAULT: "#0c52a4",
          800: "#2271cd",
        }
      },
      backgroundImage: {
        "login": "url('/public/login.png')"
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}

