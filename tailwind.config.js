/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'luna-abyss': '#030712',
        'cyber-midnight': '#080a10',
        'artificial-cyan': '#00f5ff',
        'red-alert': '#ff0055',
        'luna-gold': '#ffe49e',
      },
      fontFamily: {
        noto: ['"Noto Sans JP"', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        scanline: 'scanline 8s linear infinite',
      },
    },
  },
  plugins: [],
}
