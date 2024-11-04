/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.hide-scrollbar::-webkit-scrollbar': {
          display: 'none', // For Chrome, Safari, and Opera
        },
        '.hide-scrollbar': {
          '-ms-overflow-style': 'none',  // For Internet Explorer and Edge
          'scrollbar-width': 'none',      // For Firefox
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
