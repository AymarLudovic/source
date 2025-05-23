/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-black': '#0A0A0A',
        'off-white': '#F0F0F0',
        'neon-cyan': '#00FFFF',
        'neon-magenta': '#FF00FF',
        'neon-green': '#00FF00',
        'dark-gray': '#1A1A1A',
        'light-gray': '#333333',
        'accent-yellow': '#FFD700', // Un jaune doré pour un accent plus "quantum"
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'hero-xl': '12rem', // 192px pour le desktop
        'hero-lg': '8rem', // 128px pour les écrans plus petits
        'hero-md': '5rem', // 80px pour les tablettes
        'hero-sm': '3.5rem', // 56px pour les mobiles
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '1/20': '5%',
        '1/10': '10%',
        '1/5': '20%',
        '4/5': '80%',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'text-reveal': 'text-reveal 1s cubic-bezier(0.76, 0, 0.24, 1) forwards',
        'pulse-neon': 'pulse-neon 1.5s infinite alternate',
      },
      keyframes: {
        'text-reveal': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        'pulse-neon': {
          '0%, 100%': { textShadow: '0 0 5px rgba(0,255,255,0.2), 0 0 10px rgba(0,255,255,0.2), 0 0 15px rgba(0,255,255,0.2)' },
          '50%': { textShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF, 0 0 40px #00FFFF' },
        },
      },
      boxShadow: {
        'neon': '0 0 15px rgba(0,255,255,0.5), 0 0 30px rgba(0,255,255,0.3)',
        'subtle-neumorphic': '5px 5px 10px rgba(0,0,0,0.5), -5px -5px 10px rgba(50,50,50,0.1)',
      },
      transitionProperty: {
        'all': 'all',
        'colors': 'background-color, border-color, color, fill, stroke',
        'transform': 'transform',
      },
      transitionTimingFunction: {
        'custom-bezier': 'cubic-bezier(0.76, 0, 0.24, 1)',
      }
    },
  },
  plugins: [],
}