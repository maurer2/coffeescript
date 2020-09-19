module.exports = {
  'extends': [
    'eslint:recommended',
    'plugin:vue/base',
    'plugin:vue/essential',
    'plugin:vue/recommended',
    'plugin:vue/strongly-recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    '@vue/airbnb',
    '@vue/typescript',
    '@vue/typescript/recommended',
    'prettier/@typescript-eslint',
    'prettier/babel',
    'prettier/vue',
    'eslint-config-prettier', // disabled conflicting eslint rules for prettier
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: [
    'vue',
    'jest',
  ],
  overrides: [
    {
      files: [
        '**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true
      }
    }
  ]
}
