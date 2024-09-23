module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'whitish-gray':' rgba(0, 0, 0, 0.3), 8px 8px 12px rgba(0, 0, 0, 0.2)', // Custom faded gray shadow
        'dark-gray-bottom-right': '4px 4px 6px rgba(0, 0, 0, 0.3), 8px 8px 12px rgba(0, 0, 0, 0.2)',
        'bottom-darkest': '0 6px 12px rgba(0, 0, 0, 0.8), 0 12px 24px rgba(0, 0, 0, 0.6)', // More intense dark gray shadow at the bottom
      },
    },
  },
  plugins: [],
};
