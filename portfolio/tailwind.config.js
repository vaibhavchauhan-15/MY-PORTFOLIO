/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#8b5cf6",
        dark: "#121212",
        light: "#f8fafc",
        textDark: "#1e293b",
        textLight: "#f1f5f9",
        bgDark: "#111827",
        bgLight: "#ffffff",
        cardLight: "#ffffff",
        cardDark: "#1e293b",
        borderLight: "#e5e7eb",
        borderDark: "#4b5563",
        accent1: "#8b5cf6",
        accent2: "#f472b6",
        accent3: "#10b981",
        gradient1: "#3b82f6",
        gradient2: "#8b5cf6",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
        display: ['Poppins', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'typewriter': 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite',
        'data-flow': 'dataFlow 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' }
        },
        'blink-caret': {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' }
        },
        dataFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' }
        }
      },
      boxShadow: {
        'custom-light': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'custom-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.18)',
        'glow': '0 0 15px rgba(37, 99, 235, 0.5)',
        'glow-purple': '0 0 15px rgba(139, 92, 246, 0.5)',
        'inner-glow': 'inset 0 2px 10px 0 rgba(37, 99, 235, 0.3)',
        'neural': '0 0 30px rgba(139, 92, 246, 0.3), 0 0 10px rgba(37, 99, 235, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(to right, #2563eb, #8b5cf6)',
        'gradient-data': 'linear-gradient(90deg, #2563eb, #8b5cf6, #f472b6)',
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
        'circuit-pattern': 'url("/images/circuit-pattern.svg")',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'large': '2rem',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            code: {
              fontFamily: theme('fontFamily.mono'),
              backgroundColor: theme('colors.gray.100'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: 'normal',
            }
          }
        }
      }),
    },
  },
  plugins: [
    function({ addBase }) {
      addBase({
        ':root': {
          '--primary-rgb': '37, 99, 235',
          '--accent1-rgb': '139, 92, 246',
          '--accent2-rgb': '244, 114, 182',
          '--accent3-rgb': '16, 185, 129',
        },
      });
    },
  ],
}; 