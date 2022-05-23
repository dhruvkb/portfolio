module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: false,
    },
  },
  rules: {
    semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
    'import/extensions': ['error', 'ignorePackages', { js: 'never', ts: 'never' }],
    'import/prefer-default-export': 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off', // superseded by vue/script-indent
        'max-len': 'off', // hard to write short lines when using Tailwind
        'vue/block-lang': ['error', { script: { lang: 'ts' } }],
        'vue/multi-word-component-names': 'off',
        'vue/script-indent': ['error', 2, { baseIndent: 1, switchCase: 1 }],
      },
    },
  ],
  settings: {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: { '@': './src' },
        extensions: ['.ts', '.js'],
      },
    },
  },
}
