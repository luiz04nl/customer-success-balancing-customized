module.exports = {
  env: {
    es2021: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  rules: {}
}
