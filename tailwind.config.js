/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Workday Coworker design system
        // A warmer, more confident neutral palette than today's Workday blue/grey
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
        // Tighter, more editorial scale than Workday's current
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
        // Subtle, paper-like elevation. Not Workday's hard square borders.
        'card': '0 1px 2px rgba(14,15,18,0.04), 0 1px 1px rgba(14,15,18,0.03)',
        'raised': '0 4px 12px rgba(14,15,18,0.06), 0 2px 4px rgba(14,15,18,0.04)',
        'overlay': '0 16px 40px rgba(14,15,18,0.12), 0 4px 8px rgba(14,15,18,0.06)',
        'agent': '0 1px 2px rgba(199,132,28,0.18), 0 0 0 1px rgba(199,132,28,0.20)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
