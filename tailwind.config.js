/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--bg-elevated)',
        surface2: 'var(--bg-elevated-2)',
        ink: 'var(--text)',
        muted: 'var(--text-muted)',
        edge: 'var(--border)',
        edge2: 'var(--border-strong)',
        accent: 'var(--accent)',
        accentSoft: 'var(--accent-soft)',
        accent2: 'var(--accent-2)',
        accent2Soft: 'var(--accent-2-soft)',
        accent3: 'var(--accent-3)',
        accent4: 'var(--accent-4)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        editorial: ['"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-cell': '40px 40px',
      },
      keyframes: {
        draw: {
          '0%': { strokeDashoffset: '600' },
          '100%': { strokeDashoffset: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        draw: 'draw 1.8s ease-out forwards',
        fadeUp: 'fadeUp 0.7s ease-out forwards',
        blink: 'blink 1s step-end infinite',
        ripple: 'ripple 3s linear infinite',
        'spin-slow': 'spinSlow 8s linear infinite',
      },
    },
  },
  plugins: [],
}
