/** @type {import("prettier").Config} */
module.exports = {
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
  ],
  proseWrap: 'always',
  tailwindConfig: './packages/website/tailwind.config.ts',
  tailwindFunctions: ['tw'],
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
}
