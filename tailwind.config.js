const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{pcss,vue,js,ts,astro}'],
  darkMode: 'media',
  theme: {
    // same breakpoints as Tailwind but with an additional `screen` condition
    screens: Object.fromEntries(
      Object.entries(defaultTheme.screens).map(([name, size]) => [
        name,
        { raw: `screen and (min-width: ${size})` },
      ])
    ),
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
        text: '88ch', // Line length prescribed by Black
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

        /*
         Theme guide
         ===========

         Light theme:
         - background:            white
         - emphasised background: 200
         - de-emphasised text:    400
         - regular text:          700
         - emphasised text:       900

         Dark theme:
         - background:            black
         - emphasised background: 900
         - de-emphasised text:    600
         - regular text:          400
         - emphasised text:       200
         */
      },
    },
    fontFamily: {
      sans: [
        'Inter var',
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'system-ui',
        'ui-sans-serif',
        '"Segoe UI"',
        'Roboto',
        'Oxygen-Sans',
        'Ubuntu',
        'Cantarell',
        '"Helvetica Neue"',
        'sans-serif',
      ],
      mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          pls: (value) => ({
            paddingLeft: `max(${value}, env(safe-area-inset-left))`,
          }),
          prs: (value) => ({
            paddingRight: `max(${value}, env(safe-area-inset-right))`,
          }),
          pts: (value) => ({
            paddingTop: `max(${value}, env(safe-area-inset-top))`,
          }),
          pbs: (value) => ({
            paddingBottom: `max(${value}, env(safe-area-inset-bottom))`,
          }),
        },
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
