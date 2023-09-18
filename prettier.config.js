module.exports = {
  trailingComma: 'es5',
  semi: false,
  singleQuote: true,
  vueIndentScriptAndStyle: true,
  bracketSameLine: true,
  singleAttributePerLine: true,
  overrides: [
    {
      files: ['*.svg'], // `unplugin-icons` requires trailing space in `<svg `
      options: {
        singleAttributePerLine: false,
      },
    },
  ],
  tailwindConfig: './packages/website/tailwind.config.ts',
  plugins: ['prettier-plugin-tailwindcss', '@prettier/plugin-xml'],
}
