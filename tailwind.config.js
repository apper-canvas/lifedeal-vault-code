/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e6efff',
          200: '#cfe0ff',
          300: '#a8c8ff',
          400: '#4d9eff',
          500: '#1a1a2e',
          600: '#16213e',
          700: '#141b3a',
          800: '#101630',
          900: '#0c1227',
        },
        gold: {
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffcc02',
          400: '#ffa726',
          500: '#ff9800',
          600: '#ff8f00',
          700: '#ff6f00',
          800: '#e65100',
          900: '#bf360c',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 8px rgba(0, 0, 0, 0.08)',
        'elevated': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}