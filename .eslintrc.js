require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base', // includes plugin:import
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    'plugin:import/typescript',
    'plugin:vuejs-accessibility/recommended',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  rules: {
    'no-param-reassign': ['error', { props: false }],

    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', ts: 'never' },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-unresolved': ['error', { ignore: ['^virtual:'] }],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          { pattern: '{iles,pinia,vue,vue-router}', group: 'builtin' }, // base frameworks

          { pattern: '@islands/**', group: 'external', position: 'before' },
          { pattern: 'virtual:icons/**', group: 'external', position: 'after' },

          { pattern: '@/**/*.vue', group: 'internal', position: 'after' },
          { pattern: '@/**/*.pcss', group: 'internal', position: 'after' },
          { pattern: '@/data/**', group: 'internal', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: [],
      },
    ],
    'import/prefer-default-export': 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'tailwindcss/no-custom-classname': 'off', // custom classes are useful

        'vue/block-lang': ['error', { script: { lang: 'ts' } }],
        'vue/multi-word-component-names': 'off',
      },
    },
    {
      files: ['*.ts'],
      rules: {
        'lines-between-class-members': [
          'error',
          'always',
          { exceptAfterSingleLine: true },
        ],
        'max-classes-per-file': ['error', 2],
      },
    },
    {
      files: ['components.d.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  settings: {
    'import/internal-regex': '^@/',
    'import/resolver': { typescript: {} },

    tailwindcss: {
      officialSorting: true,
      cssFiles: [
        '**/*.pcss',
        '!**/node_modules',
        '!**/.*',
        '!**/dist',
        '!**/build',
      ],
    },
  },
}
