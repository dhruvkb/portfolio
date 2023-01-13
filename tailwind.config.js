const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{pcss,vue,js,ts,astro}'],
  darkMode: 'media',
  theme: {
    // same breakpoints as Tailwind but with an additional `screen` condition
    screens: {
      sm: { raw: 'screen and (min-width: 640px)' },
      md: { raw: 'screen and (min-width: 768px)' },
      lg: { raw: 'screen and (min-width: 1024px)' },
    },
    extend: {
      spacing: {
        ch: '1ch',
        indent: '2ch',
        ln: '2ex',
        para: '4ex',
        ex: 'ex',
      },
      cursor: {
        help: 'help',
      },
      // same font sizes as Tailwind but with `em` instead of `rem` (and a copy of `sm` in `rem`s)
      fontSize: Object.fromEntries([
        ...Object.entries(defaultTheme.fontSize).map(
          ([name, [size, options]]) => [
            name,
            [size.replace('rem', 'em'), options],
          ]
        ),
        ['cite', defaultTheme.fontSize.sm],
      ]),
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
}
