module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Adjust the paths according to your project structure
    './components/**/*.{js,ts,jsx,tsx}',
    // ...existing paths...
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // ...existing colors...
      },
    },
  },
  plugins: [],
};
