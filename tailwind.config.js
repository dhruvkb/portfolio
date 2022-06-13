// eslint-disable-next-line import/no-extraneous-dependencies
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{pcss,vue,js,ts}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      spacing: {
        ch: '1ch',
        indent: '2ch',
        ln: '2ex',
      },
      cursor: {
        help: 'help',
      },
      fontSize: {
        mono: ['0.875rem', '1.2'],
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
         - de-emphasised text:    500
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
        'Inter', // Inter
        'ui-sans-serif', // system
        'system-ui', '-apple-system', 'BlinkMacSystemFont', // macOS
        'sans-serif', // generic fallback
      ],
      mono: [
        '"JetBrains Mono"', // JetBrains Mono
        'ui-monospace', // system
        'monospace', // generic fallback
      ],
    },
  },
  plugins: [],
}
