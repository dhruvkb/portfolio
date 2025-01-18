import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'
import type { Config } from 'tailwindcss'
import tailwindcssSafeArea from 'tailwindcss-safe-area'

export default {
  content: ['./src/**/*.{astro,html,css,js,md,mdx,ts,vue}'],
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
      serif: ['Spectral', ...defaultTheme.fontFamily.serif],
      mono: 'monospace',
    },
    colors: {
      rosewater: 'var(--color-rosewater)',
      flamingo: 'var(--color-flamingo)',
      pink: 'var(--color-pink)',
      mauve: 'var(--color-mauve)',
      red: 'var(--color-red)',
      maroon: 'var(--color-maroon)',
      peach: 'var(--color-peach)',
      yellow: 'var(--color-yellow)',
      green: 'var(--color-green)',
      teal: 'var(--color-teal)',
      sky: 'var(--color-sky)',
      sapphire: 'var(--color-sapphire)',
      blue: 'var(--color-blue)',
      lavender: 'var(--color-lavender)',

      curr: 'currentColor',
      trans: 'transparent',
    },
    extend: {
      textColor: {
        default: 'var(--color-text)',
        // sub headlines, labels
        // subtext0: 'var(--color-subtext0)',
        // subtext1: 'var(--color-subtext1)',
        // subtle
        subtle: 'var(--color-overlay1)',
      },
      backgroundColor: {
        default: 'var(--color-base)',
        // surface elements
        surface0: 'var(--color-surface0)',
        surface1: 'var(--color-surface1)',
        // surface2: 'var(--color-surface2)',
        // overlays
        // overlay0: 'var(--color-overlay0)',
        // overlay1: 'var(--color-overlay1)',
        // overlay2: 'var(--color-overlay2)',
      },
      borderColor: {
        DEFAULT: 'var(--color-surface1)',
      },
      listStyleType: {
        'lower-roman': 'lower-roman',
      },
      // Make line height `tight` for font sizes `5xl` through `9xl`.
      fontSize: {
        '5xl': [
          defaultTheme.fontSize['5xl'][0],
          { lineHeight: defaultTheme.lineHeight.tight },
        ],
        '6xl': [
          defaultTheme.fontSize['6xl'][0],
          { lineHeight: defaultTheme.lineHeight.tight },
        ],
        '7xl': [
          defaultTheme.fontSize['7xl'][0],
          { lineHeight: defaultTheme.lineHeight.tight },
        ],
        '8xl': [
          defaultTheme.fontSize['8xl'][0],
          { lineHeight: defaultTheme.lineHeight.tight },
        ],
        '9xl': [
          defaultTheme.fontSize['9xl'][0],
          { lineHeight: defaultTheme.lineHeight.tight },
        ],
      },
      spacing: {
        curr: '1em',
        e1: defaultTheme.spacing[1].replace('rem', 'em'),
      },
      animation: {
        wave: 'wave 1s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': {
            transform: 'rotate(0deg)',
          },
          '50%': {
            transform: 'rotate(15deg)',
          },
        },
      },
    },
  },
  plugins: [
    // variants for targeting task lists in GFM
    plugin(function ({ addVariant }) {
      addVariant('gfm-done', '&:has(input[checked])')
      addVariant('gfm-todo', '&:has(input:not([checked]))')
      addVariant('pdf', '&:where(.pdf &)')
    }),
    tailwindcssSafeArea,
  ],
} satisfies Config
