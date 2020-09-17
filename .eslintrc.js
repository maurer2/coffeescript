module.exports = {
  'extends': [
    '@vue/typescript',
    'plugin:vue/recommended',
    'plugin:vue/base'
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
        // '**/__tests__/*.{j,t}s?(x)',
        '**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true
      }
    }
  ]
}
