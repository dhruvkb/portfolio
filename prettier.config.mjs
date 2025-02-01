/** @type {import("prettier").Config} */
export default {
  trailingComma: 'es5',
  semi: false,
  singleQuote: true,
  astroAllowShorthand: true,
  bracketSameLine: true,
  singleAttributePerLine: true,
  overrides: [
    {
      files: ['*.astro'],
      options: {
        parser: 'astro',
      },
    },
    {
      files: ['*.svg'],
      options: {
        parser: 'html',
      },
    },
    {
      files: ['src/**/pdf.astro'],
      options: {
        tailwindStylesheet: './src/styles/print.css',
      },
    },
  ],
  proseWrap: 'always',
  tailwindFunctions: ['tw'],
  tailwindStylesheet: './src/styles/screen.css',
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
}
