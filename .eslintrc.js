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
  ],
  rules: {
    semi: ['error', 'never', { beforeStatementContinuationChars: 'always' }],

    'import/extensions': ['error', 'ignorePackages', { js: 'never', ts: 'never' }], // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js#L139
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/order': ['error', {
      'newlines-between': 'always',
      groups: ['builtin', 'external', 'internal'],
      alphabetize: { order: 'asc', caseInsensitive: true },
      pathGroups: [
        { pattern: '{vue,vite,iles,pinia}', group: 'builtin' }, // base frameworks
        // TypeScript
        { pattern: '@/models/**', group: 'internal', position: 'after' },
        { pattern: '@/stores/**', group: 'internal', position: 'after' },
        { pattern: '@/composables/**', group: 'internal', position: 'after' },
        { pattern: '@/utils/**', group: 'internal', position: 'after' },
        // Vue components
        { pattern: '@/components/**', group: 'internal', position: 'after' },
        { pattern: '@/cells/**', group: 'internal', position: 'after' },
        { pattern: '@/cards/**', group: 'internal', position: 'after' },
        { pattern: '@/sections/**', group: 'internal', position: 'after' },
        // CSS
        { pattern: '@/styles/**', group: 'internal', position: 'after' },
        // Static assets
        { pattern: '@/assets/**', group: 'internal', position: 'after' },
        { pattern: '@/data/**', group: 'internal', position: 'after' },
      ],
      pathGroupsExcludedImportTypes: [],
    }],
    'import/prefer-default-export': 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'max-len': 'off',
        indent: 'off', // superseded by vue/script-indent

        'tailwindcss/no-custom-classname': 'off', // custom classes are useful

        'vue/block-lang': ['error', { script: { lang: 'ts' } }],
        'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'never' }],
        'vue/multi-word-component-names': 'off',
        'vue/script-indent': ['error', 2, { baseIndent: 1, switchCase: 1 }],
      },
    },
    {
      files: ['*.ts'],
      rules: {
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
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
    'import/resolver': { typescript: {} },

    tailwindcss: {
      officialSorting: true,
      cssFiles: ['**/*.pcss', '!**/node_modules', '!**/.*', '!**/dist', '!**/build'],
    },
  },
}
