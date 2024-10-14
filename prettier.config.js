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
  ],
  proseWrap: 'always',
  tailwindConfig: './packages/website/tailwind.config.ts',
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
}
