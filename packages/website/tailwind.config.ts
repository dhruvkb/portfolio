import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./src/**/*.{pcss,vue,js,ts,astro}'],
  darkMode: 'media',
  theme: {
    // same breakpoints as Tailwind but with an additional `screen` condition
    screens: {
      sm: { raw: 'screen and (min-width: 640px)' },
      md: { raw: 'screen and (min-width: 768px)' },
      lg: { raw: 'screen and (min-width: 1024px)' },
    },
    fontSize: {
      base: '1rem',
      lg: '1.25em',
      xl: '1.5em',
      resume: '12px',
    },
    extend: {
      spacing: {
        ch: '1ch',
        indent: '2ch',
        ln: '2ex',
        para: '4ex',
        ex: '1ex',
      },
      cursor: {
        help: 'help',
      },
      maxWidth: {
        text: '88ch', // line length prescribed by Black
        'screen-lg': '1024px', // not generated automatically because of raw media-query
      },
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(' +
          'var(--gradient-shape, ellipse) ' +
          'var(--gradient-size, farthest-corner) ' +
          'at var(--gradient-pos, center), ' +
          'var(--tw-gradient-stops)' +
          ')',
      },
      colors: {
        in: colors.inherit,
        curr: colors.current,
        tx: colors.transparent,

        bg: 'var(--color-bg)', // background
        hl: 'var(--color-hl)', // emphasised background

        low: 'var(--color-low)', // de-emphasised text
        reg: 'var(--color-reg)', // regular text
        imp: 'var(--color-imp)', // emphasised text

        sol: {
          base: {
            '03': '#002b36',
            '02': '#073642',
            '01': '#586e75',
            '00': '#657b83',
            0: '#839496',
            1: '#93a1a1',
            2: '#eee8d5',
            3: '#fdf6e3',
          },
          yellow: '#b58900',
          orange: '#cb4b16',
          red: '#dc322f',
          magenta: '#d33682',
          violet: '#6c71c4',
          blue: '#268bd2',
          cyan: '#2aa198',
          green: '#859900',
        },
      },
    },
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
      mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        Object.fromEntries(
          ['top', 'right', 'bottom', 'left'].map((dir) => [
            `p${dir[0]}s`,
            (val) => ({
              [`padding-${dir}`]: `max(${val}, env(safe-area-inset-${dir}))`,
            }),
          ])
        ),
        {
          values: theme('spacing'),
        }
      )
    }),
    plugin(({ addVariant }) => {
      addVariant('printing', '.print &')
      addVariant('not-printing', '&:not(.print *)')
    }),
  ],
} satisfies Config
