/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          50:  '#fdf2f2',
          100: '#fde8e8',
          200: '#fbd5d5',
          300: '#f8b4b4',
          400: '#f07070',
          500: '#8B0000',
          600: '#7a0000',
          700: '#6D0F0F',
          800: '#5a0000',
          900: '#4a0000',
          950: '#2d0000',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E8C84A',
          dark: '#B8941E',
        },
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'none': '0',
        'sm': '4px',
        DEFAULT: '4px',
        'md': '4px',
        'lg': '4px',
        'xl': '4px',
        '2xl': '4px',
        '3xl': '4px',
        'full': '9999px',
      },
      backgroundImage: {
        'maroon-gradient': 'linear-gradient(135deg, #6D0F0F 0%, #8B0000 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #E8C84A 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'slide-up': 'slideUp 0.8s ease forwards',
        'slide-down': 'slideDown 0.5s ease forwards',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-gold': 'pulseGold 2s infinite',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(60px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.4)' },
          '50%': { boxShadow: '0 0 0 15px rgba(212, 175, 55, 0)' },
        },
      },
      boxShadow: {
        'gold': '0 2px 10px rgba(212, 175, 55, 0.15)',
        'maroon': '0 2px 10px rgba(139, 0, 0, 0.15)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
