/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Tableau Coworker design system
        // Warmer canvas + aubergine accent (plan/03) — distinct from default “enterprise blue” BI chrome
        ink: {
          900: '#0E0F12', // primary text
          800: '#1A1C22',
          700: '#2A2D36',
          600: '#3D414C',
          500: '#5B6070',
          400: '#858B9C',
          300: '#B4B9C6',
          200: '#DDE0E8',
          100: '#EEF0F4',
          50:  '#F7F8FB',
        },
        canvas: {
          DEFAULT: '#FAFAF7', // warm off-white, distinct from typical blue-greys
          raised:  '#FFFFFF',
          sunken:  '#F2F2EE',
        },
        accent: {
          // Aubergine — distinct from Workday's blue. Confident, premium.
          DEFAULT: '#5B2E91',
          soft: '#EFE6F8',
          ink: '#3A1B5E',
        },
        signal: {
          // Used by the agent / AI surfaces. A warm gold to signal "machine, but trustworthy."
          DEFAULT: '#C7841C',
          soft: '#FBF1DE',
          ink: '#7A4D08',
        },
        success: { DEFAULT: '#1F7A4D', soft: '#E2F2EA' },
        warning: { DEFAULT: '#A85B00', soft: '#FBEED9' },
        danger:  { DEFAULT: '#B0263A', soft: '#FAE2E5' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['"Source Serif 4"', '"Source Serif Pro"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Tighter, more editorial scale than typical dashboard UI
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        'xs':  ['0.75rem',   { lineHeight: '1.1rem' }],
        'sm':  ['0.8125rem', { lineHeight: '1.25rem' }],
        'base':['0.9375rem', { lineHeight: '1.5rem' }],
        'lg':  ['1.0625rem', { lineHeight: '1.65rem' }],
        'xl':  ['1.25rem',   { lineHeight: '1.8rem' }],
        '2xl': ['1.5625rem', { lineHeight: '2rem' }],
        '3xl': ['2rem',      { lineHeight: '2.4rem' }],
        '4xl': ['2.625rem',  { lineHeight: '3rem' }],
        '5xl': ['3.5rem',    { lineHeight: '3.8rem' }],
      },
      borderRadius: {
        'sm': '4px',
        DEFAULT: '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
      },
      boxShadow: {
        /* Default cards stay flat; use lift-* sparingly for focal surfaces (hero, demos). */
        card: 'none',
        raised: 'none',
        overlay: 'none',
        agent: 'none',
        /** Hairline + soft ambient — reads “product,” not sticker shadow */
        edge: '0 1px 0 rgba(14, 15, 18, 0.06)',
        'lift-sm': '0 1px 0 rgba(14, 15, 18, 0.05), 0 12px 32px -12px rgba(14, 15, 18, 0.1)',
        lift: '0 1px 0 rgba(14, 15, 18, 0.06), 0 24px 56px -20px rgba(14, 15, 18, 0.14)',
        glow: '0 0 0 1px rgba(91, 46, 145, 0.12), 0 20px 50px -24px rgba(91, 46, 145, 0.18)',
      },
      backgroundImage: {
        'mesh-warm':
          'radial-gradient(ellipse 100% 85% at 0% -15%, rgba(91, 46, 145, 0.11), transparent 52%), radial-gradient(ellipse 70% 55% at 100% 0%, rgba(199, 132, 28, 0.07), transparent 48%)',
        noise:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'mesh-breathe': {
          '0%, 100%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.04) translate(1%, -1%)' },
        },
        'fade-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer-border': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'pulse-ring': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(199, 132, 28, 0.25)' },
          '50%': { boxShadow: '0 0 0 8px rgba(199, 132, 28, 0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.12)' },
        },
        'flow-step-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'mesh-breathe': 'mesh-breathe 14s ease-in-out infinite',
        'fade-slide-up': 'fade-slide-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'shimmer-border': 'shimmer-border 4s linear infinite',
        'pulse-ring': 'pulse-ring 2.2s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2.8s ease-in-out infinite',
        'flow-step-in': 'flow-step-in 0.22s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}
