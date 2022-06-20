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
    'plugin:vuejs-accessibility/recommended',
    'plugin:tailwindcss/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: false,
    },
  },
  rules: {
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'max-classes-per-file': 'off', // allow more than one class in a file
    semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],
    'import/extensions': ['error', 'ignorePackages', { js: 'never', ts: 'never' }],
    'import/prefer-default-export': 'off',
    'import/order': ['error', {
      'newlines-between': 'always',
      groups: ['builtin', 'external', 'internal', 'type'],
      alphabetize: { order: 'asc', caseInsensitive: true },
      pathGroups: [
        { pattern: '{vue,pinia}', group: 'builtin' },
        { pattern: '@/components/**', group: 'internal', position: 'after' },
        { pattern: '@/cells/**', group: 'internal', position: 'after' },
        { pattern: '@/sections/**', group: 'internal', position: 'after' },
        { pattern: '@/assets/**', group: 'internal', position: 'after' },
        { pattern: '@/data/**', group: 'internal', position: 'after' },
        { pattern: '@/App.vue', group: 'internal', position: 'after' },
        { pattern: '@/**', group: 'internal' },
      ],
      pathGroupsExcludedImportTypes: [],
    }],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off', // superseded by vue/script-indent
        'max-len': 'off', // hard to write short lines when using Tailwind
        'tailwindcss/no-custom-classname': 'off', // custom classes are useful
        'vue/block-lang': ['error', { script: { lang: 'ts' } }],
        'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'never' }],
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
    tailwindcss: {
      officialSorting: true,
      cssFiles: ['**/*.pcss', '!**/node_modules', '!**/.*', '!**/dist', '!**/build'],
    },
  },
}
